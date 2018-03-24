/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

import * as Cookies from "js-cookie";
import Vue  from 'vue'
let token = '';
let user = {};

let subscriberCallback = null;

function getToken() {
  return token;
}

function setToken(arg) {
  token = arg;
  Cookies.set('lf_token', token, { expires: 30 });

  init(() => {});
}

function isLoggedIn() {
  return !!token;
}

function getUser()  {
  return user;
}

function setCallback(arg) {
  subscriberCallback = arg;
}

function logout() {
  console.log('[Session] Session cleared.');
  token = '';
  Cookies.remove('lf_token');

  if (subscriberCallback) subscriberCallback();
}

function init(cb) {
  token = Cookies.get('lf_token');

  if (isLoggedIn()) {
    Vue.http.get('/api/private/user/whoami?token='+token).then(resp => {
      var data = resp.body;
      if (!data.success) {
        logout();
        return;
      }

      user = data.data;
      console.log('Session created, with user id: '+user._id);
      cb.call();
      if (subscriberCallback) subscriberCallback();
    });
  } else {
    console.log('Empty session created.');
    cb.call();
  }
}

export default {
  init,
  isLoggedIn,
  getToken,
  setToken,
  getUser,
  logout,
  setCallback
}
