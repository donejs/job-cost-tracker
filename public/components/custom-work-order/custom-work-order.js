import Map from 'can/map/';
import Component from 'can/component/';
import Job from 'job-tracker/models/job/';
import Task from 'job-tracker/models/task/';
import template from './custom-work-order.stache!';

import 'can/map/define/';

/**
 * @module {Module} job-tracker/components/custom-work-order <custom-work-order>
 * @parent job-tracker.components
 *
 * @signature `<custom-work-order />`
 * @demo public/components/custom-work-order/custom-work-order.html
 *
 * Form used to create custom tasks
 **/
export const ViewModel = Map.extend({
  define: {
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
        return Job.getList({});
      }
    },
    jobs: {
      get(lastVal, setVal) {
        this.attr('jobsPromise').then(setVal);
      }
    },
    selectedJob: {
      get() {
        const jobId = this.attr('selectedJobId');

        return this.attr('jobs')
          .filter(job => job.attr('id') === jobId)
          .attr(0);
      }
    },
    selectedJobLots: {
      get() {
        const selectedJob = this.attr('selectedJob');

        return selectedJob ? selectedJob.attr('lots') : [];
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
    }
  },
  submitOrder() {
    this.attr('task').attr({
      lot: this.attr('lotId'),
      job: this.attr('jobId')
    });

    this.attr({
      saving: this.attr('task').save(),
      task: new Task({}),
      selectedJobId: '',
      selectedLotId: ''
    });

    return false;
  }
});

export default Component.extend({
  tag: 'custom-work-order',
  viewModel: ViewModel,
  template
});
