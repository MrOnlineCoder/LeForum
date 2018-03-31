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
const TopicService = require('./index.js');
const PostService = require('../posts');

let router = express.Router();

router.get('/category/:c', (req,res) => {
  if (!req.query.token) {
    if (!Permissions.canViewCategory(null, req.params.c)) {
      res.json({
        success: false,
        message: 'You do not have enough permission to view that category!'
      });
      return;
    }

    TopicService.fetchCategoryTopics(req.params.c, (ok, docs) => {
      if (!ok || !docs) {
        res.json({
          success: false,
          message: 'Failed to fetch topics.'
        });
        return;
      }

      res.json({
        success: true,
        topics: docs
      });
    });
  } else {
      AuthAPI.getUserFromToken(req.query.token, (ok, user) => {
        if (!ok || !user) {
          res.json({
            success: false,
            message: 'Invalid token.'
          });
          return;
        }

        if (!Permissions.canViewCategory(user, req.params.c)) {
          res.json({
            success: false,
            message: 'You do not have enough permission to view that category!'
          });
          return;
        }

        TopicService.fetchCategoryTopics(req.params.c, (ok, docs) => {
          if (!ok || !docs) {
            res.json({
              success: false,
              message: 'Failed to fetch topics.'
            });
            return;
          }

          res.json({
            success: true,
            topics: docs
          });
        });
      });
  }
});

router.post('/new', AuthAPI.privateAPI, (req,res) => {
  let cat = req.body.category;
  if (!Permissions.canPostToCategory(req.user, cat)) {
    res.json({
      success: false,
      message: 'You do not have enough permission to create topics in that category!'
    });
    return;
  }

  TopicService.createTopic({
    author: req.user.username,
    title: req.body.title,
    category: req.body.category
  }, (ok, id) => {
    if (!ok || !id) {
      res.json({
        success: false,
        message: 'Failed to create new topic!'
      });
      return;
    }

    PostService.addPost(req.user.username, id, req.body.content, (ok, postID) => {
        if (!ok){
          res.json({
            success: false,
            message: 'Failed to create topic first post!'
          });
          return;
        }
        UserService.addPostCount(req.user.username);

        res.json({
          success: true,
          topicID: id
        });
    });
  });
});

router.get('/forUser/:user', (req,res) => {
  TopicService.getTopicsForUser(req.params.user, (ok, docs) => {
    if (!ok) {
      res.json({
        success: false,
        message: 'Failed to fetch topics for user!'
      });
      return;
    }

    res.json({
      success: true,
      topics: docs
    });
  });
});

module.exports = router;
