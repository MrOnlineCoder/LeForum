/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */
const Topic = require('../db').Topic;
const winston = require('winston');

function fetchCategoryTopics(cat, cb) {
  Topic.find({
    category: cat
  }).sort({
    date: -1
  }).exec((err, docs) => {
    if (err || !docs) {
      cb(false, null);
      return;
    }

    cb(true, docs);
  });
}

function createTopic(topic, cb) {
  let data = topic;
  data.date = new Date();
  data.open = true;

  delete data.content;

  let doc = new Topic(data);
  doc.save((err, doc) => {
    if (err || !doc) {
      winston.error('[TopicService] Failed to create new topic by '+data.author+': '+JSON.stringify(err));
      cb(false, null);
      return;
    }

    cb(true, doc._id);
  });
}

function getById(id, cb) {
  Topic.findById(id, (err, doc) => {
    if (err || !doc) {
      winston.error('[TopicService] Failed to find topic by ID:'+id+': '+JSON.stringify(err));
      cb(false, null);
      return;
    }

    cb(true, doc);
  });
}

function remove(id, cb) {
  Topic.remove({_id: id}, (err, doc) => {
    if (err || !doc) {
      winston.error('[TopicService] Failed to remove topic by ID:'+id+': '+JSON.stringify(err));
      cb(false);
      return;
    }

    cb(true);
  });
}


function toggleLock(id, mode, cb) {
  Topic.update({_id: id}, {$set: {open: mode}}, (err, doc) => {
    if (err || !doc) {
      winston.error('[TopicService] Failed to update topic mode by ID:'+id+': '+JSON.stringify(err));
      cb(false);
      return;
    }

    cb(true);
  });
}

function getTopicsForUser(user, cb) {
  Topic.find({
    author: user
  }).sort({
    date: -1
  }).exec((err, docs) => {
    if (err) {
      winston.error('[TopicService] Failed to fetch topics for user '+user+': '+JSON.stringify(err));
      cb(false, null);
      return;
    }

    cb(true, docs);
  });
}


module.exports = {
  fetchCategoryTopics,
  createTopic,
  getById,
  remove,
  toggleLock,
  getTopicsForUser
};
