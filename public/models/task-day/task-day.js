import $ from 'jquery';
import tag from 'can-connect/can/tag/';
import superMap from 'job-tracker/models/superMap';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import isNumber from 'lodash/isNumber';
import { TaskList } from 'job-tracker/models/task/';
import moment from 'moment';

function diffValue(val1, val2) {
  const v1 = Number(val1 || 0);
  const v2 = Number(val2 || 0);
  if (isNumber(v1) && isNumber(v2)) {
    return v2 - v1;
  }
  return null;
}

const TaskDay = DefineMap.extend('TaskDay', {
  job: { type: undefined },
  notes: { type: 'string', value: '' },
  completed: {
    type(val) {
      return moment(val, moment.ISO_8601);
    },
    serialize(currentVal) {
      if (moment.isMoment(currentVal)) {
        return currentVal.format();
      }
      return currentVal;
    }
  },
  foreman: { type: undefined },
  completedTasks: TaskList,
  hours: 'number',
  allocatedHours: {
    get(){
      return this.totals.hours;
    }
  },
  hoursDiff: {
    get() {
      return diffValue(this.hours, this.allocatedHours);
    }
  },

  cubicYards: 'number',
  allocatedCubicYards: {
    get(){
      return this.totals.cubicYards;
    }
  },
  cubicYardsDiff: {
    get() {
      return diffValue(this.cubicYards, this.allocatedCubicYards);
    }
  },

  tons: 'number',
  allocatedTons: {
    get(){
      return this.totals.tons;
    }
  },
  tonsDiff: {
    get() {
      return diffValue(this.tons, this.allocatedTons);
    }
  },
  totals: {
    get() {
      const completed = this.completedTasks;
      const totals = {
        hours: 0,
        cubicYards: 0,
        tons: 0
      };

      completed.each(val => {
        totals.hours += val.hours;
        totals.cubicYards += val.cubicYards;
        totals.tons += val.tons;
      });

      return totals;
    }
  }
});

const TaskDayList = DefineList.extend('TaskDayList', {
  '*': TaskDay
});

const taskDayConnection = superMap({
  parseListData(data) {
    data.current = Math.floor(data.skip / data.limit) + 1;
    data.pages = Math.ceil(data.total / data.limit);
    return data;
  },
  url: {
    getListData: "GET /api/task-days?$populate[]=completedTasks&$populate[]=lot&$populate[]=foreman&$populate[]=job",
    getData: "GET /api/task-days/{id}/?$populate[]=completedTasks&$populate[]=lot&$populate[]=foreman&$populate[]=job",
    createData: "POST /api/task-days",
    updateData(taskDay) {
      //extract ids
      taskDay.foreman = taskDay.foreman.id || taskDay.foreman;
      taskDay.job = taskDay.job.id || taskDay.job;
      taskDay.completedTasks = taskDay.completedTasks.map(td => td.id);

      // force can-connect to re-fetch a whole instance
      // so they are properly hydrated
      return $.ajax({
        processData: false,
        url: '/api/task-days/' + taskDay.id,
        method: 'PUT',
        data: JSON.stringify(taskDay),
        contentType: 'application/json'
      }).then(result => {
        return TaskDay.get({id: result.id});
      });
    },
    destroyData(taskDay) {
      return $.ajax({
        url: "/api/task-days/" + taskDay.id,
        method: "DELETE"
      });
    }
  },
  Map: TaskDay,
  List: TaskDayList,
  name: 'taskDay'
});

tag('task-day-model', taskDayConnection);

export default TaskDay;
export { TaskDay, TaskDayList, taskDayConnection };
