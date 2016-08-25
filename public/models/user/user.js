import $ from 'jquery';
import superMap from 'job-tracker/models/superMap';
import tag from 'can-connect/can/tag/';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';

class TokenStore {
  constructor({ key="id_token" } = {}) {
    this.key = key;
  }
  fetchToken() {
    return Promise.resolve(localStorage && localStorage.getItem(this.key));
  }
  setToken(token) {
    return Promise.resolve(localStorage && localStorage.setItem(this.key, token));
  }
  deleteToken() {
    return Promise.resolve(localStorage && localStorage.removeItem(this.key));
  }
}

//TODO: is this the right place to do all this...?
function beforeSend(xhr) {
  let id_token = localStorage && localStorage.getItem('id_token');
  if (id_token) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + id_token);
  }
}
$.ajaxSetup({ beforeSend });

const User = DefineMap.extend('User', {
  tokenStore: new TokenStore(),
  authenticateUserWithtoken(id_token) {
    if (!id_token) {
      return Promise.reject(new Error('No token provided to authenticate user'));
    }
    return this.setIdToken(id_token)
      .then(() => {
        return $.ajax({
          type: "GET",
          url: '/api/users/current-user'
        });
      })
      .then(ajaxResult => new User(ajaxResult))
      .catch(err => { console.error(err); throw err; }); // eslint-disable-line no-console
  },
  getIdToken(token) {
    return this.tokenStore.fetchToken();
  },
  setIdToken(token) {
    return this.tokenStore.setToken(token);
  },
  deleteIdToken() {
    return this.tokenStore.deleteToken();
  },
  getCurrentUser() {
    return userConnection.getData({ user_id: 'current-user' })
  }
}, {
  isAdmin: {
    get() {
      let roles = this.roles;
      return roles && roles.filter(role => role.toLowerCase() === 'admin').length > 0;
    },
    set(newVal) {
      let roles = this.roles;
      if (!roles) {
        roles = new DefineList();
      }
      if (newVal) {
        if (roles.indexOf('admin') === -1) {
          roles.push('admin');
        }
      } else {
        if (roles.indexOf('admin') !== -1) {
          roles = roles.filter(role => role !== 'admin');
        }
      }
      this.roles = roles;
      this.save();
    }
  },
  provider: {
    get() {
      let user_id = this.user_id;
      let provider = user_id.substring(0, user_id.indexOf('|'));
      return provider;
    }
  }
});

const UserList = DefineList.extend('UserList', {
  '*': User
});

export const userConnection = superMap({
  url: {
    getListData: "GET /api/users",
    getData: "GET /api/users/{user_id}",
    createData: "POST /api/users",
    updateData(user) {
      // only allow updating roles
      let { roles, user_id } = user;
      return $.ajax({
        processData: false,
        url: "/api/users/" + user_id,
        method: "PATCH",
        data: JSON.stringify({ roles }),
        contentType: 'application/json'
      });
    },
    destroyData: "DELETE /api/users/{user_id}"
  },
  idProp: 'user_id',
  Map: User,
  List: UserList,
  name: 'user'
});

tag('user-model', userConnection);

export default User;
export { User, UserList, userConnection };
