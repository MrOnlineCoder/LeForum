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
  BAN: 'ban',
  ACCESS_ADMIN: 'admin'
};

const ActionHints = {
  READ_POSTS: 'Read posts in any topic',
  POST: 'Post messages in topics',
  RATE_OTHERS: 'Rate others\' posts',
  SET_AVATAR: 'Have custom avatar',
  SET_SIGNATURE: 'Set custom signature',
  MODIFY_OTHERS: 'Modify others\' posts.',
  MODIFY_SELF: 'Modify own posts',
  DELETE_POSTS: 'Delete any post',
  DELETE_THREADS: 'Delete topics',
  CLOSE_THREADS: 'Close or reopen topics',
  BAN: 'Ban other users',
  ACCESS_ADMIN: 'Access this Admin panel'
}

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
  ActionHints,
  getAll,
  isStaff,
  getStaffGroups
};
