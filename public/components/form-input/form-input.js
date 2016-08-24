import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './form-input.less!';
import template from './form-input.stache!';

/**
 * @module {Module} job-tracker/components/form-input <form-input>
 * @parent job-tracker.components
 *
 * @description <input> wrapper with a unique identifier
 *
 * @signature `<form-input {(value)}="val">Label:</form-input> />`
 *
 * @demo public/components/form-input/form-input.html
 *
 **/
export const ViewModel = Map.extend({
  /** @prototype */
  define: {
    /**
     * @property {String} uniqueId
     *
     * unique id to append to the element
     */
    uniqueId: {
      get: function(){
        return this.attr('type') + '-input-' +
            this.attr('randomId');
      }
    },
    /**
     * @property {Number} randomId
     *
     * random number generator
     */
    randomId: {
      value: function() {
        return Math.trunc(Math.random()*100000000);
      }
    },
    /**
     * @property {String} type
     *
     * type of input element
     */
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
