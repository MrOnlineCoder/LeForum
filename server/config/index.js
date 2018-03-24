/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const fs = require('fs');
const winston = require('winston');
const Permissions = require('../permissions');

let config = {};
let securityToken = '';

const configPath = 'forum_config.json';

function isConfigPresent() {
  return (fs.existsSync(configPath));
}

function saveConfig() {
  fs.writeFile(configPath, JSON.stringify(config, null, 4), function(err) {
    if(err) {
      winston.error('[Config] Failed to write config: '+err);
      return;
    }

    winston.info('[Config] Saved new config.');
  });
}

function resetConfig() {
  config = {
    name: 'LeForum',
    description: 'None',
    userGroups: {
      superadmin: {
        title: 'Super Admin',
        color: '#F44336',
        permission: ['*'],
        staff: true
      },
      admin: {
        title: 'Administrator',
        color: '#E65100',
        staff: true,
        permission: ['read', 'post', 'rate', 'avatar', 'signature', 'modify_others', 'delete_posts', 'close_threads', 'delete_threads', 'ban']
      },
      moderator: {
        title: 'Moderator',
        color: '#9C27B0',
        staff: true,
        permission: ['read', 'post', 'rate', 'avatar', 'signature', 'modify_others', 'delete_posts', 'close_threads']
      },
      user: {
        title: 'User',
        color: '#000000',
        staff: true,
        permission: ['read', 'post', 'rate', 'avatar', 'signature', 'modify']
      }
    }
  };

  winston.info('[Config] Setting default config!');
}

function setConfig(cfg) {
  Object.assign(config, cfg);
  if (securityToken) config.tokenSecret = securityToken;
  config.present = true;
}

function getSecurityToken() {
  return securityToken;
}

function load() {
  fs.readFile(configPath, 'utf8', function(err, contents) {
      if (err) {
        winston.error('[Config Fatal] Failed to load config: '+err);
        process.exit(1);
      }

      config = JSON.parse(contents);

      securityToken = config.tokenSecret;

      //Remove token secret from config object, which is exposed to public
      delete config.tokenSecret;

      Permissions.init(config.userGroups);
  });
}

function get() {
  return config;
}

module.exports = {
  isConfigPresent,
  resetConfig,
  saveConfig,
  setConfig,
  get,
  load,
  getSecurityToken
};
