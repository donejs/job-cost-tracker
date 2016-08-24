import can from 'can';
import superMap from 'job-tracker/models/superMap';
import tag from 'can-connect/can/tag/';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import Lot from 'job-tracker/models/lot/';

const Job = DefineMap.extend('Job', {
  name: { type: 'string' },
  lots: {
  	Type: Lot.List,
  	value: []
  }
});

const JobList = DefineList.extend('JobList', {
  '*': { Type: Job }
});

const jobConnection = superMap({
  url: {
    getListData: function(req = {}){
      var data = '';
      if(req && req.search){
        req['$search'] = {
          'name': req.search
        };
      }
      if(!req['$sort']){
        req["$sort"] = {
          name: 1
        }
      }

      delete req['search'];

      return can.ajax({
        url: "/api/jobs?$populate[]=lots",
        method: "GET",
        data: req,
        dataType: "json"
      });
    },
    getData: "GET /api/jobs/{id}?$populate[]=lots",
    createData: function(job){
      return can.ajax({
        processData: false,
        url: "/api/jobs",
        method: "POST",
        data: JSON.stringify(job),
        contentType: 'application/json'
      });
    },
    updateData: function(job){
      return can.ajax({
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
export { JobList, jobConnection };
