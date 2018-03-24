/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const express = require('express');
const winston = require('winston');
const moment = require('moment');
const Config = require('../config');
const uuidv4 = require('uuid/v4');
const UserService = require('../user');
const Utils = require('../utils');

let router = express.Router();

router.post('/', (req,res) => {
  if (Config.isConfigPresent()) {
    res.json({
      success: false,
      message: 'Forum is already configured.'
    });
    return;
  }

  let admin = {};
  let data = req.body;

  //Reset user data to default
  admin.username = data.adminName;
  admin.email = data.adminEmail;

  admin.registered = new Date();
  admin.posts = 0;
  admin.reputation = 0;
  admin.group = 'superadmin';
  admin.lastSeen = new Date();

  admin.password = Utils.toSHA256(data.adminPass);

  Config.resetConfig();
  Config.setConfig(req.body.config);
  Config.saveConfig();

  UserService.register(admin, (ok, err) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'Couldn\'t register admin account!'
      });
      winston.error('[Install] Cannot register admin acccount!');
      winston.error('[Install] Admin data: '+JSON.stringify(admin, null, 2));
      winston.error('[Install] User service error: '+err);
      return;
    }

    res.json({
      success: true
    });
  });
});

module.exports = router;
