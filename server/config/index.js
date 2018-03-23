/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const fs = require('fs');
const winston = require('winston');

let config = {};

function isConfigPresent() {
  return (fs.existsSync('config.json'));
}

function saveConfig() {
  fs.writeFile('config.json', JSON.stringify(config, null, 4), function(err) {
    if(err) {
      winston.error('[Config] Failed to write config: '+err);
      return;
    }

    winston.info("[Config] Saved new config.");
  });
}

function resetConfig() {
  config = {
    name: "LeForum",
    description: "None"
  };

  winston.info('[Config] Setting default config!');
}

function setConfig(cfg) {
  config = cfg;
  config.present = true;
}

function getSecurityToken() {
  return config.tokenSecret;
}

function load() {
  fs.readFile('config.json', 'utf8', function(err, contents) {
      if (err) {
        winson.error('[Config Fatal] Failed to load config: '+err);
        process.exit(1);
      }

      config = JSON.parse(contents);
  });
}

function get() {
  let res = config;

  //Make sure token secret is not exposed somewhere
  delete res.tokenSecret;

  return res;
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
