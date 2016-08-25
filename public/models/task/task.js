import $ from 'jquery';
import superMap from 'job-tracker/models/superMap';
import tag from 'can-connect/can/tag/';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import Job from 'job-tracker/models/job/';
import Lot from 'job-tracker/models/lot/';

const Task = DefineMap.extend('Task', {
  name: 'string',
  hours: 'number',
  cubicYards: 'number',
  tons: 'number',
  notes: 'string',
  completed: 'date',
  Job,
  Lot
});

const TaskList = DefineList.extend('TaskList', {
  '*': Task,
  totals() {
    const totals = {
      cubicYards: 0,
      tons: 0,
      hours: 0
    };

    this.each(task => {
      totals.cubicYards += task.cubicYards;
      totals.tons += task.tons;
      totals.hours += task.hours;
    });

    return totals;
  }
});

const taskConnection = superMap({
  parseListData(data) {
    data.current = Math.floor(data.skip / data.limit) + 1;
    data.pages = Math.ceil(data.total / data.limit);
    return data;
  },
  url: {
    getListData(data = {}) {
      return $.ajax({
        url: "/api/tasks?$populate[]=job&$populate[]=lot",
        method: "GET",
        dataType: "json",
        data
      });
    },
    getData(data = {}) {
      const id = data.id;

      delete data.id;

      return $.ajax({
        url: "/api/tasks/" + id + "?$populate[]=job&$populate[]=lot",
        method: "GET",
        data
      });
    },

    createData(tasks)  {
      return $.ajax({
        url: "/api/tasks",
        method: "POST",
        data: tasks
      }).then(result => {
        // fix #101
        return Task.get({id: result.id});
      });
    },
    updateData(task) {
      //extract ids
      task.lot = task.lot.id || task.lot;
      task.job = task.job.id || task.job;

      // force $.connect to re-fetch a whole instance
      // so they are properly hydrated
      return $.ajax({
        url: '/api/tasks/' + task.id,
        method: 'PUT',
        data: task
      }).then(result => {
        return Task.get({id: result.id});
      });
    },
    destroyData(task) {
      return $.ajax({
        url: "/api/tasks/" + task.id,
        method: "DELETE"
      });
    }
  },
  Map: Task,
  List: TaskList,
  name: 'task'
});

tag('task-model', taskConnection);

export default Task;
export { Task, TaskList, taskConnection };
