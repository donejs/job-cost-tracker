import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './data-cleanup.less';
import template from './data-cleanup.stache';
import moment from 'moment';

export const ViewModel = DefineMap.extend({});

export default Component.extend({
  tag: 'data-cleanup',
  viewModel: ViewModel,
  template,
  helpers: {
  	formatDate(date) {
  		return moment(date()).format('MM/DD/YYYY');
  	}
  }
});