import route from "can/route/";
import AppMap from "can-ssr/app-map";

import 'can/map/define/';

const AppViewModel = AppMap.extend({
  define: {
    title: {
      value: 'job-tracker',
      serialize: false
    },
    loadedComponents: {
      value: {},
      serialize: false
    },
    currentUser: {
      value: null,
      serialize: false
    }
  },
  userLogout() {
    localStorage.clear();
    route.attr({ page: 'home' });
  }
});

export default AppViewModel;
