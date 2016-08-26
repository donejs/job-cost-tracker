import Component from 'can-component';
import DefineMap from 'can-define/map/';
import Job from 'job-tracker/models/job/';
import Task from 'job-tracker/models/task/';
import template from './custom-work-order.stache';

/**
 * @module {Module} job-tracker/components/custom-work-order <custom-work-order>
 * @parent job-tracker.components
 *
 * @signature `<custom-work-order />`
 * @demo public/components/custom-work-order/custom-work-order.html
 *
 * Form used to create custom tasks
 **/
export const ViewModel = DefineMap.extend({
  saving: {
    value: false
  },
  selectedJobId: {
    value: ''
  },
  selectedLotId: {
    value: ''
  },
  jobsPromise: {
    get() {
      return Job.getList()
        .then(jobs => {
          console.log('Jobs: ', jobs);
          return jobs;
        }, err => {
          console.log('did if fail? ', err);
        });
    }
  },
  jobs: {
    get(lastVal, setVal) {
      this.jobsPromise.then(setVal);
    }
  },
  selectedJob: {
    get() {
      const jobId = this.selectedJobId;

      return {};
      // return this.jobs.filter(job => job.id === jobId)[0];
    }
  },
  selectedJobLots: {
    get() {
      const selectedJob = this.selectedJob;

      return selectedJob ? selectedJob.lots : [];
    }
  },
  task: {
    Type: Task,

    value() {
      // prevent weird bug where it re-renders component
      // when values are initially changed
      return {
        name: '',
        hours: 0,
        cubicYards: 0,
        tons: 0,
        notes: ''
      };
    }
  },
  submitOrder() {
    this.task.set({
      lot: this.lotId,
      job: this.jobId
    });

    this.set({
      saving: this.task.save(),
      task: new Task({}),
      selectedJobId: '',
      selectedLotId: ''
    });

    return false;
  }
});

export default Component.extend({
  tag: 'custom-work-order',
  ViewModel: ViewModel,
  template
});
