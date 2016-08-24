import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './header.less!';
import template from './header.stache!';

export const ViewModel = Map.extend({
  define: {
  },
});

export default Component.extend({
  tag: 'header',
  viewModel: ViewModel,
  template
});
