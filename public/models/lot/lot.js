import superMap from 'job-tracker/models/superMap';
import tag from 'can-connect/can/tag/';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import ajax from 'can-util/dom/ajax/ajax';
import { TaskList } from 'job-tracker/models/lot/';

const Lot = DefineMap.extend('Lot', {
  lotNumber: 'string',
  jobId: 'number',
  name: 'string',
  tasks: TaskList
});

const LotList = DefineList.extend('LotList', {
  '*': Lot
});

const lotConnection = superMap({
  url: {
    getListData(req = {}) {
      if(req.search){
        req['$search'] = {
          'lotNumber': req.search
        };
      }
      if(!req['$sort']){
        req["$sort"] = {
          lotNumber: 1
        };
      }

      delete req.search;

      return ajax({
        url: "/api/lots?$populate[]=tasks",
        method: "GET",
        dataType: "json",
        data: req
      });
    },
    getData: "GET /api/lots/{id}",
    createData: "POST /api/lots",
    updateData: "PUT /api/lots/{id}",
    destroyData: "DELETE /api/lots/{id}"
  },
  Map: Lot,
  List: LotList,
  name: 'lot'
});

tag('lot-model', lotConnection);

export default Lot;
export { Lot, LotList, lotConnection };
