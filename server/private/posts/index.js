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
const NotificationService = require('../../notifications');
const UserService = require('../../user');

const _ = require('lodash');

let router = express.Router();

router.post('/delete', AuthAPI.privateAPI, (req,res) => {

  if (!Permissions.hasPermission(req.user, Permissions.Actions.DELETE_POSTS)) {
    res.json({
      success: false,
      message: 'Access denied.'
    });
    return;
  }

  PostService.get(req.body.id, (ok, post) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'Failed to find post with given ID.'
      });
      return;
    }

    UserService.decreasePostCount(post.author);
    NotificationService.notify(post.author, req.user.username, 'delete', _.truncate(post.content, {length: 100}), {});

    PostService.remove(req.body.id, (ok2) => {
      if (!ok2) {
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
});


module.exports = router;
