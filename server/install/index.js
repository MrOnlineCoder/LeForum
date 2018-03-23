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

let router = express.Router();

router.post('/', (req,res) => {
  if (Config.isConfigPresent()) {
    res.json({
      success: false,
      message: 'Forum is already configured.'
    });
    return;
  }


  Config.resetConfig();
  Config.setConfig(req.body.config);
  Config.saveConfig();

  res.json({
    success: true
  });
});

module.exports = router;
