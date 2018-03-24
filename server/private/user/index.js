/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const express = require('express');
const AuthAPI = require('../../auth');
const UserService = require('../../user');

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

router.get('/whoami', AuthAPI.privateAPI, (req,res) => {
  res.json({
    success: true,
    data: req.user
  });
});

module.exports = router;
