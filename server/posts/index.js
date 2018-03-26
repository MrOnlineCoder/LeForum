/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */
const Post = require('../db').Post;
const winston = require('winston');

function addPost(user, topicID, content, cb) {
  let data = {};
  data.author = user;
  data.topic = topicID;
  data.likes = [];
  data.content = content;
  data.date = new Date();

  let post = new Post(data);
  post.save((err, doc) => {
    if (err || !doc) {
      winston.error('[PostService] Failed to create new post by '+user+': '+JSON.stringify(err));
      cb(false, null);
      return;
    }

    cb(true, doc._id);
  });
}

function getPostsForTopic(topic, cb) {
  Post.find({
    topic: topic
  }).sort({
    date: -1
  }).exec((err, docs) => {
    if (err) {
      winston.error('[PostService] Failed to find posts for topic '+topic+': '+JSON.stringify(err));
      cb(false, null);
      return;
    }

    cb(true, docs);
  });
}

module.exports = {
  addPost,
  getPostsForTopic
};