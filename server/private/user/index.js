/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const express = require('express');
const AuthAPI = require('../../auth');
const UserService = require('../../user');
const Notifications = require('../../notifications');

let router = express.Router();

router.get('/get', AuthAPI.privateAPI, (req,res) => {
  UserService.existsId(req.query.id, (ok, doc) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'User does not exist.'
      });
      return;
    }

    res.json({
      success: true,
      data: doc
    });
  });
});

router.get('/notifications', AuthAPI.privateAPI, (req,res) => {
  Notifications.get(req.user.username, (ok, docs) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'Couldn\' fetch all notifications'
      });
      return;
    }

    res.json({
      success: true,
      docs: docs
    });
  });
});

router.post('/notifications/clear', AuthAPI.privateAPI, (req,res) => {
  Notifications.clear(req.user.username, (ok) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'Couldn\' clear all notifications'
      });
      return;
    }

    res.json({
      success: true
    });
  });
});

router.post('/edit', AuthAPI.privateAPI, (req,res) => {
  UserService.updateProfile(req.user.username, req.body.data, (ok) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'Failed to update profile.'
      });
      return;
    }

    res.json({
      success: true
    });
  })
});

router.get('/whoami', AuthAPI.privateAPI, (req,res) => {
  res.json({
    success: true,
    data: req.user
  });
});

module.exports = router;
