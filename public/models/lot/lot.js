import superMap from 'job-tracker/models/superMap';
import tag from 'can-connect/can/tag/';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import ajax from 'can-util/dom/ajax/ajax';

const Lot = DefineMap.extend('Lot', {
  lotNumber: { type: 'string' },
  jobId: { type: 'number' },
  name: { type: 'string' }
});

const LotList = DefineList.extend('LotList', {
  '*': { Type: Lot }
});

const lotConnection = superMap({
  url: {
    getListData: function(req = {}){
      var data = '';
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
export { LotList, lotConnection };
