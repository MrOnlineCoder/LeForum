/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const express = require('express');
const Config = require('../config');
const Permissions = require('../permissions');

let router = express.Router();

router.get('/general', (req, res) => {
  res.json(Config.get());
});

router.get('/userGroups', (req,res) => {
  res.json(Permissions.getAll());
});

router.get('/permissions', (req,res) => {
  res.json({
    actions: Permissions.Actions,
    hints: Permissions.ActionHints
  });
});

module.exports = router;
