/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const express = require('express');
const AuthAPI = require('../../auth');
const PostService = require('../../posts');
const Permissions = require('../../permissions');

let router = express.Router();

router.post('/delete', AuthAPI.privateAPI, (req,res) => {

  if (!Permissions.hasPermission(req.user, Permissions.Actions.DELETE_POSTS)) {
    res.json({
      success: false,
      message: 'Access denied.'
    });
    return;
  }

  PostService.remove(req.body.id, (ok) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'Cannot remove post.'
      });
      return;
    }

    res.json({
      success: true
    });
  });
});


module.exports = router;
