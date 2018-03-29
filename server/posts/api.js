/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const express = require('express');
const AuthAPI = require('../auth');

const UserService = require('../user');
const InfoService = require('../info');
const Permissions = require('../permissions');

const PostService = require('./index.js');
const TopicService = require('../topics');

let router = express.Router();

router.get('/forTopic/:id', (req,res) => {
  TopicService.getById(req.params.id, (ok, topicDoc) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'Failed to find topic with that ID!'
      });
      return;
    }

    PostService.getPostsForTopic(req.params.id, (ok, postsDocs) => {
      if (!ok) {
        res.json({
          success: false,
          message: 'Failed to find topic posts with that ID!'
        });
        return;
      }

      res.json({
        success: true,
        topic: topicDoc,
        posts: postsDocs
      });
    });
  });
});

router.post('/add', AuthAPI.privateAPI, (req,res) => {
  TopicService.getById(req.body.topic, (ok, topicDoc) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'Failed to find topic with that ID!'
      });
      return;
    }

    if (!Permissions.canPostToCategory(req.user, topicDoc.category)) {
      res.json({
        success: false,
        message: 'Access denied, you do not have enough permissions to post to that topic!'
      });
      return;
    }

    if (!topicDoc.open) {
      res.json({
        success: false,
        message: 'Topic is locked.'
      });
      return;
    }

    PostService.addPost(req.user.username, req.body.topic, req.body.content, (ok, postsDocs) => {
      if (!ok) {
        res.json({
          success: false,
          message: 'Failed to create new post!'
        });
        return;
      }

      UserService.addPostCount(req.user.username);

      res.json({
        success: true
      });
    });
  });
});

module.exports = router;
