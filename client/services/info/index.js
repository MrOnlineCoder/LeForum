/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

import Vue  from 'vue'

let groups = {};
let info = {};

function init(cb) {
  Vue.http.get('/api/info/general').then(response => {
    info = response.body;

    console.log('General info loaded.');
    Vue.http.get('/api/info/userGroups').then(response => {
      groups = response.body;

      console.log('User groups loaded.');
      console.log('InfoService created. Present: '+info.present);
      cb.call();
    });
  });
}

function isPresent() {
  return !!info.present;
}

function get() {
  return info;
}

function getGroups() {
  return groups;
}

function getGroupColor(name) {
  return groups[name].color;
}

function getGroupTitle(name) {
  return groups[name].title;
}

export default {
  get,
  init,
  isPresent,
  groups,
  getGroupColor,
  getGroups,
  getGroupTitle
};
