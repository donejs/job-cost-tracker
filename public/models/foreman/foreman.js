import $ from 'jquery';
import superMap from 'job-tracker/models/superMap';
import tag from 'can-connect/can/tag/';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';

const Foreman = DefineMap.extend('Foreman', {
	name: {
		type: 'string'
	}
});

const ForemanList = DefineList.extend({
  '*': { Type: Foreman }
});

const foremanConnection = superMap({
  url: {
    getListData: function(req = {}){
      var data = '';
      if(req.search){
        req['$search'] = {
          'name': req.search
        };
      }

      delete req.search;

      return $.ajax({
        url: '/api/foremen',
        method: 'GET',
        data: req,
        dataType: "json"
      });
    },
    getData: 'GET /api/foremen/{id}',
    createData: 'POST /api/foremen',
    updateData: 'PUT /api/foremen/{id}',
    destroyData: 'DELETE /api/foremen/{id}'
  },
  idProp: 'id',
  Map: Foreman,
  List: ForemanList,
  name: 'foreman'
});

tag('foreman-model', foremanConnection);

export default Foreman;
export { ForemanList, foremanConnection };
