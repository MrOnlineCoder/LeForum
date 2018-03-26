/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const UserService = require('../user');
const express = require('express');
const jwt = require('jsonwebtoken');
const Config = require('../config');
const winston = require('winston');
const Utils = require('../utils');

let router = express.Router();

function generateToken(user) {
  let token = jwt.sign({
    id: user._id
  }, Config.getSecurityToken());

  return token;
}

function decodeToken(token, cb) {
  jwt.verify(token, Config.getSecurityToken(), function(err, decoded) {
    if (err) {
      winston.error('[Auth] Failed to decode token '+token);
      cb(null);
      return;
    }

    cb(decoded.id);
  });
}

function getUserFromToken(token, cb) {
  decodeToken(token, (user) => {
    if (!user) {
      cb(false, null);
      return;
    }

    UserService.existsId(user, (ok, doc) => {
      if (!ok) {
        cb(true, null);
        return;
      }

      cb(true, doc);
    });
  });
}

function privateAPI(req,res,next) {
  if (!req.query.token && !req.body.token) {
    res.json({
      success: false,
      message: 'Access denied.'
    });
    return;
  }

  var token = req.query.token || req.body.token;

  getUserFromToken(token, (ok, user) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'Cannot decode token.'
      });
      return;
    }

    if (!user) {
      res.json({
        success: false,
        message: 'Failed to check user existance.'
      });
      return;
    }

    req.user = user;
    next();
  });
}

router.post('/register', (req,res) => {
  let data = req.body.data;

  //Reset user data to default

  data.registered = new Date();
  data.posts = 0;
  data.reputation = 0;
  data.group = 'user';
  data.lastSeen = new Date();

  data.password = Utils.toSHA256(data.password);

  UserService.exists(data.username, data.email, (ok, err) => {
    if (ok) {
      res.json({
        success: false,
        message: 'User with same username/email already exists!'
      });
      return;
    }

    if (err !== null) {
      res.json({
        success: false,
        message: 'Error while searching for user on registration: '+err
      });
      winston.error('[AuthAPI] Register failed, cannot check user existance: '+err);
      return;
    }

    UserService.register(data, (ok, err) => {
      if (!ok) {
        res.json({
          success: false,
          message: 'Error saving user document: '+err
        });
        winston.error('[AuthAPI] Register failed, cannot save new document: '+err);
        return;
      }

      res.json({
        success: true
      });
    });
  });
});

router.post('/login', (req,res) => {
  let email = req.body.email;
  let password = req.body.password;

  UserService.getLoginUser(email, password, (ok, doc) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'Wrong email or password!'
      });
      return;
    }

    winston.info('[AuthAPI] User '+email+' logged in.');

    let token = generateToken(doc);
    res.json({
      success: true,
      token: token
    });
  });
});


module.exports = {
  router,
  privateAPI,
  getUserFromToken
}
