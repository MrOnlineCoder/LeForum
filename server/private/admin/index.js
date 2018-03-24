/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const express = require('express');
const AuthAPI = require('../../auth');
const UserService = require('../../user');
const Permissions = require('../../permissions');
const Config = require('../../config');

let router = express.Router();

function adminMiddleware(req,res,next) {
  if (!Permissions.hasPermission(req.user, Permissions.Actions.ACCESS_ADMIN)) {
    res.json({
      success: false,
      message: 'Access denied!'
    });
    return;
  }

  next();
}

router.get('/canAccess', AuthAPI.privateAPI, adminMiddleware, (req,res) => {
  res.json({
    success: true
  });
});

router.post('/setPermissions', AuthAPI.privateAPI, adminMiddleware, (req,res) => {
  Config.setConfig({
    userGroups: req.body.groups
  });
  Config.saveConfig();
  res.json({
    success: true
  });
});

module.exports = router;
