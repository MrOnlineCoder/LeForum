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

module.exports = router;
