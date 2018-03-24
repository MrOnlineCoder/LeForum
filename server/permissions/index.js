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

module.exports = {
  init,
  hasPermission,
  Actions,
  getAll
};
