import $ from 'jquery';
import AppViewModel from './app';
import appTemplate from './app.stache';

import route from "can-route";
import 'can-route-pushstate/';
// needed for the route stache helpers
import 'can-stache/helpers/route'

import 'es6-math';

route(':page', { page: 'home' });

const vm = new AppViewModel({page: 'home' });
route.map(vm);

System.import('fixturesOn').then(() => {
  route.ready();
  $('#app').html(appTemplate(vm));
});
