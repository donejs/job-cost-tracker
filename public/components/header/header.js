import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './header.less!';
import template from './header.stache!';

/**
 * @module {Module} job-tracker/components/header <header>
 * @parent job-tracker.components
 *
 * @description The application static header
 *
 * @signature `<header />`
 *
 * @demo public/components/header/header.html
 *
 **/
export const ViewModel = Map.extend({
  define: {
  }
});

export default Component.extend({
  tag: 'header',
  viewModel: ViewModel,
  template
});
