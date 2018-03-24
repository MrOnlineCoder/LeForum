/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */
const winston = require('winston');

let groups = [];

const Actions = {
  READ_POSTS: 'read',
  POST: 'post',
  RATE_OTHERS: 'rate',
  SET_AVATAR: 'avatar',
  SET_SIGNATURE: 'signature',
  MODIFY_OTHERS: 'modify_others',
  MODIFY_SELF: 'modify',
  DELETE_POSTS: 'delete_posts',
  DELETE_THREADS: 'delete_threads',
  CLOSE_THREADS: 'close_threads',
  BAN: 'ban'
};

function init(_groups) {
  groups = _groups;
  winston.info('[Permissions] Loaded '+Object.keys(groups).length+' user groups.');
}

function getAll() {
  return groups;
}

function hasPermission(user, perm) {
  let perms = groups[user.group].permission;

  if (perms.includes('*')) {
    return true;
  }

  return perms.includes(perm);
}

function isStaff(user) {
  return !!groups[user.group].staff;
}

function getStaffGroups() {
  let sgroups = [];

  for (var k in groups) {
    if (groups.hasOwnProperty(k)) {
        if (groups[k].staff) {
          sgroups.push(k);
        }
    }
  }

  return sgroups;
}

module.exports = {
  init,
  hasPermission,
  Actions,
  getAll,
  isStaff,
  getStaffGroups
};
