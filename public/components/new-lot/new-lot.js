/**
 * @module {{}} new-lot
 * The new-lot page
 */

import Component from 'can-component';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/'
import Job from 'job-tracker/models/job/';
import Lot from 'job-tracker/models/lot/';
import Task, {TaskList} from 'job-tracker/models/task/';
import './new-lot.less';
import template from './new-lot.stache';


/**
 * @constructor {{}} new-lot.ViewModel new-lot ViewModel
 */
export const ViewModel = DefineMap.extend({
  /**
   * @param {DefineList} columns The columns to pass to the dynamic table
   */
  columns: {
    Type: DefineList,
    value: [{
      key: 'name',
      label: 'Tasks'
    },{
      key: 'hours',
      label: 'Hours'
    },{
      key: 'cubicYards',
      label: 'Cubic Yards'
    },{
      key: 'tons',
      label: 'Tons'
    }]
  },
  tasks: {
    Type: TaskList
  },
  lotNumber: {
    value: '',
    type: 'string'
  },
  /**
   * @param {String} clipBoard The string contents pasted into the text box for import
   */
  clipBoard: {
    value: ''
  },
  jobName: {
    value: ''
  },
  /**
   * @param {String} The id of the selected job, or ___new___ for a new job
   */
  job: {
    type: 'string',
    value: ''
  },
  /**
   * @param {boolean} jobIsNew Whether the currently selected job is a new one
   */
  jobIsNew: {
    get() {
      return this.get('job') === "___new___";
    }
  },
  /**
   * @function saveLot
   * Saves the new lot. Creates a new job if necessary.
   */
  saveLot() {
    var jobId = this.get('job'),
        newLot = new Lot({lotNumber: this.get('lotNumber')}),
        tasks = this.get('tasks');

    newLot.get('tasks', tasks);

    if(this.get('jobIsNew')){
      var jobName = this.get('jobName');
      new Job({
        name: jobName,
        lots: [newLot]
      }).save();
    }else {
      Job.findOne({id: jobId}).then((job) => {
        job.get('lots').push(newLot);
        job.save();
      });
    }

    this.set({
      job: '',
      lotNumber: '',
      clipBoard: ''
    })
  },
  /**
   * @function importData
   * Processes the data from the clipboard
   */
  importData() {
    var clipBoard = this.clipBoard,
        //split by newLine
        lines = clipBoard.split('\n'),
        table = [];

    //split rows by tabs
    for(let i = 0, len = lines.length; i < len; i++){
      if(i !== 0) {
        lines[i] = lines[i].trim();
      }
      table.push(lines[i].split('\t'));
    }

    //remove header row
    var keys = table.shift();
    keys[0] = "name";

    //alias header rows
    var alias = {
      'cy':'cubicYards',
      'hours': 'hours',
      'ton': 'tons'
    };

    for(let i = 1; i < keys.length; i++){
      keys[i] = alias[keys[i].toLowerCase()];
    }

    //convert row arrays into tasks by key
    table = table.map(function(row){
      debugger;
      var hashMap = {};

      for(var i = 0; i < row.length; i++){
        hashMap[keys[i]] = row[i];
      }

      return new Task(hashMap);
    });

    this.tasks = table;
  }
});

export default Component.extend({
  tag: 'new-lot',
  viewModel: ViewModel,
  template,
  events: {
    'form submit': function(el, ev){
      ev.preventDefault();
      this.viewModel.importData();
    }
  }
});
