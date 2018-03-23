/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

import Vue  from 'vue'

let info = {};

function init(cb) {
  Vue.http.get('/api/info/general').then(response => {
    info = response.body;

    cb.call();
  });
}

function isPresent() {
  return !!info.present;
}

function get() {
  return info;
}

export default {
  get,
  init,
  isPresent
};
