import DefineMap from "can-define/map/";
import route from "can-route/";
import 'can-route-pushstate/';

const AppViewModel = DefineMap.extend("AppViewModel",{
  seal: true
}, {
  route: "string",
  page: {
    type: "string"
  },

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
  },
  userLogout() {
    localStorage.clear();
    route.attr({ page: 'home' });
  }
});

export default AppViewModel;
