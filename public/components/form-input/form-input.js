import Component from 'can-component/';
import DefineMap from 'can-define/map/';
import template from './form-input.stache';

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
export const ViewModel = DefineMap.extend({
  /**
   * @property {String} type
   *
   * the input's value
   */
  value: '',
  /**
   * @property {String} type
   *
   * type of input element
   */
  type: {
    value: 'text'
  },
  /**
   * @property {String} uniqueId
   *
   * unique id to append to the element
   */
  uniqueId: {
    get() {
      const { type, randomId } = this;
      return `${type}-input-${randomId}`;
    }
  },
  /**
   * @property {Number} randomId
   *
   * random number generator
   */
  randomId: {
    value() {
      return Math.trunc(Math.random()*100000000);
    }
  }
});

export default Component.extend({
  tag: 'form-input',
  viewModel: ViewModel,
  template,
});
