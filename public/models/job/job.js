import $ from 'jquery';
import superMap from 'job-tracker/models/superMap';
import tag from 'can-connect/can/tag/';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import { LotList } from 'job-tracker/models/lot/';

const Job = DefineMap.extend('Job', {
  name: 'string',
  lots: LotList
});

const JobList = DefineList.extend('JobList', {
  '*': Job
});

const jobConnection = superMap({
  url: {
    getListData(req = {}) {
      if(req && req.search){
        req['$search'] = {
          'name': req.search
        };
      }
      if(!req['$sort']){
        req["$sort"] = {
          name: 1
        };
      }

      delete req['search'];

      return $.ajax({
        url: "/api/jobs?$populate[]=lots",
        method: "GET",
        data: req,
        dataType: "json"
      });
    },
    getData: "GET /api/jobs/{id}?$populate[]=lots",
    createData(job) {
      return $.ajax({
        processData: false,
        url: "/api/jobs",
        method: "POST",
        data: JSON.stringify(job),
        contentType: 'application/json'
      });
    },
    updateData(job) {
      return $.ajax({
        processData: false,
        url: "/api/jobs/" + job.id,
        method: "PUT",
        data: JSON.stringify(job),
        contentType: 'application/json'
      });
    },
    destroyData: "DELETE /api/jobs/{id}"
  },
  Map: Job,
  List: JobList,
  name: 'job'
});

tag('job-model', jobConnection);

export default Job;
export { Job, JobList, jobConnection };
