import $ from 'jquery';
import AppViewModel from './app';
import appTemplate from './app.stache';
import route from "can-route";

import 'es6-math';

const vm = new AppViewModel({page: 'home' });
route.map(vm);

System.import('fixturesOn').then(() => {
  route.ready();
  $('#app').html(appTemplate(vm));
});
