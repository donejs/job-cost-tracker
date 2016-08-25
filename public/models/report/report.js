import $ from 'jquery';
import superMap from 'job-tracker/models/superMap';
import tag from 'can-connect/can/tag/';
import DefineList from 'can-define/list/';
import TaskDay from 'job-tracker/models/task-day/';

const Report = TaskDay.extend('Report', {});

const ReportList = DefineList.extend('ReportList', {
  '*': { Type: Report }
});

export const reportConnection = superMap({
  url: {
  	getListData: 'GET /api/reports'
  },
  idProp: 'id',
  Map: Report,
  List: ReportList,
  name: 'report'
});

tag('report-model', reportConnection);

export default Report;
export { ReportList, reportConnection };
