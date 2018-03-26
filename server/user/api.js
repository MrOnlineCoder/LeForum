/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const express = require('express');
const UserService = require('./index.js');
let router = express.Router();

router.get('/staff', (req,res) => {
  UserService.getStaff((ok, docs) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'UserService error.'
      });
      return;
    }

    res.json({
      success: true,
      users: docs
    });
  });
});

router.post('/fromList', (req,res) => {
  UserService.usersFromList(req.body.list, (ok, docs) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'Failed to get users list.'
      });
      return;
    }

    res.json({
      success: true,
      users: docs
    });
  });
});

router.get('/profile/:id', (req,res) => {
  UserService.getByName(req.params.id, (ok, doc) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'UserService error.'
      });
      return;
    }

    res.json({
      success: true,
      user: doc
    });
  });
});

module.exports = router;
