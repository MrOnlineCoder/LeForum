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
const winston = require('winston');

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
  winston.info('[AdminAPI] Updated permisions configuration ('+req.user.username+')');
  res.json({
    success: true
  });
});

router.post('/setGeneral', AuthAPI.privateAPI, adminMiddleware, (req,res) => {
  Config.setConfig(
    req.body.general
  );
  Config.saveConfig();
  winston.info('[AdminAPI] Updated general configuration ('+req.user.username+')');
  res.json({
    success: true
  });
});

router.post('/setCategories', AuthAPI.privateAPI, adminMiddleware, (req,res) => {
  Config.setConfig({
    categories: req.body.categories
  });
  Config.saveConfig();
  winston.info('[AdminAPI] Updated categories ('+req.user.username+')');
  res.json({
    success: true
  });
});


router.post('/setRules', AuthAPI.privateAPI, adminMiddleware, (req,res) => {
  Config.setConfig({
    rules: req.body.rules
  });
  Config.saveConfig();
  winston.info('[AdminAPI] Updated rules ('+req.user.username+')');
  res.json({
    success: true
  });
});

module.exports = router;
