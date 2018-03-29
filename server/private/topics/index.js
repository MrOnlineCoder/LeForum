/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const express = require('express');
const AuthAPI = require('../../auth');
const TopicService = require('../../topics');
const PostService = require('../../posts');
const Permissions = require('../../permissions');

let router = express.Router();

router.post('/delete', AuthAPI.privateAPI, (req,res) => {

  if (!Permissions.hasPermission(req.user, Permissions.Actions.DELETE_THREADS)) {
    res.json({
      success: false,
      message: 'Access denied.'
    });
    return;
  }

  TopicService.remove(req.body.id, (ok, doc) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'Cannot remove topic.'
      });
      return;
    }

    PostService.removeTopicPosts(req.body.id, (ok) => {
      res.json({
        success: true
      });
    })
  });
});

router.post('/lock', AuthAPI.privateAPI, (req,res) => {

  if (!Permissions.hasPermission(req.user, Permissions.Actions.CLOSE_THREADS)) {
    res.json({
      success: false,
      message: 'Access denied.'
    });
    return;
  }

  TopicService.toggleLock(req.body.id, req.body.mode, (ok, doc) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'Cannot toggle lock of topic.'
      });
      return;
    }

    res.json({
      success: true
    });
  });
});

module.exports = router;
