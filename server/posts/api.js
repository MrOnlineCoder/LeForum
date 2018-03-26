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

module.exports = router;
