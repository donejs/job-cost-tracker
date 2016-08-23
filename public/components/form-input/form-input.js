import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './form-input.less!';
import template from './form-input.stache!';

export const ViewModel = Map.extend({
  define: {
    uniqueId: {
      get: function(){
        return this.attr('type') + '-input-' +
            this.attr('randomId');
      }
    },
    randomId: {
      value: function(){
        return Math.trunc(Math.random()*100000000);
      }
    },
    type: {
      value: 'text'
    }
  }
});

export default Component.extend({
  tag: 'form-input',
  viewModel: ViewModel,
  template,
});
