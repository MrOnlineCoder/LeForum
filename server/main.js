/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const express = require('express');
const winston = require('winston');
const moment = require('moment');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require("body-parser");

const Config = require('./config');
const DB = require('./db');

const InstallAPI = require('./install');
const InfoAPI = require('./info');
const AuthAPI = require('./auth');

const PrivateAPI = require('./private');

const UserAPI = require('./user/api.js');

let app = null;

function logFormatter(args) {
    var date = moment().format("DD.MM.YYYY hh:mm:ss");
    var msg = date + ' - ' + args.level + ' - ' + args.message;
    return msg;
}

function listenHTTP() {
  let port = process.env.PORT || 3000;
  app.listen(port, () => {
    winston.info('[Main] Started Express server on port '+port);
  });
}

function setupServer() {
  app = express();
  app.use(express.static(path.resolve(__dirname, '../dist')));

  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/api/install', InstallAPI);
  app.use('/api/info', InfoAPI);
  app.use('/api/auth', AuthAPI.router);
  app.use('/api/users', UserAPI);
  app.use('/api/private', PrivateAPI);

  winston.info('[Main] Created Express application');
}

function loadServer() {
  setupServer();
  listenHTTP();
}

function run() {
  winston.add(winston.transports.File, { filename: 'leforum.log', formatter: logFormatter, json: false });
  winston.info('=== LeForum Session Start ===');

  if (Config.isConfigPresent()) {
    Config.load();
  }

  DB.connect((ok, err) => {
    if (!ok) {
      winston.error('[Main Fatal] mongoose connect failed: '+err);
      process.exit(1);
      return;
    }

    winston.info('[Main] Connected to MongoDB');
    loadServer();
  });
}


module.exports.run = run;
