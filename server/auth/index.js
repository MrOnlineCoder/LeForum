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

function verifyToken(token) {

}

function privateAPI(req,res,next) {

}

router.post('/register', (req,res) => {
  let data = req.body.data;

  //Reset user data to default

  data.registered = new Date();
  data.posts = 0;
  data.reputation = 0;
  data.accessLevel = 0;
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
      return;
    }

    UserService.register(data, (ok, err) => {
      if (!ok) {
        res.json({
          success: false,
          message: 'Error saving user document: '+err
        });
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

    let token = generateToken(doc);
    res.json({
      success: true,
      token: token
    });
  });
});

module.exports = {
  router,
  privateAPI
}
