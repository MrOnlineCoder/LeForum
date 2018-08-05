/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */
const Notification = require('../db').Notification;
const winston = require('winston');

function notify(user, issuer, type, data, topic, cb) {
  let obj = new Notification({
    target: user,
    type: type,
    data: data,
    issuer: issuer,
    topic: topic,
    date: new Date()
  });

  obj.save(err => {
    if (err) {
      winston.error('[Notifications] Failed to add new notification '+JSON.stringify(err));
      if (cb) cb(false);
      return;
    }

    if (cb) cb(true);
  });
}

function get(user, cb) {
  Notification.find({
    target: user
  }, (err, docs) => {
    if (err) {
      winston.error('[Notifications] Failed to fetch notifications '+JSON.stringify(err));
      cb(false, null);
      return;
    }

    cb(true, docs);
  });
}

function clear(user, cb) {
  Notification.remove({
    target: user
  }, (err, docs) => {
    if (err) {
      winston.error('[Notifications] Failed to clear notifications '+JSON.stringify(err));
      cb(false);
      return;
    }

    cb(true);
  });
}


module.exports = {
  notify,
  get,
  clear
};
