/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const User = require('../db').User;
const winston = require('winston');
const Utils = require('../utils');
const Permissions = require('../permissions');

function register(data, cb) {
  let user = new User(data);
  user.save((err) => {
    if (err) {
      cb(false, err);
      return;
    }

    cb(true, null);
  });
}

function getStaff(cb)  {
  let staffGroups = Permissions.getStaffGroups();
  User.find({
    group: {
      $in: staffGroups
    }
  }, {
    email: false,
    password: false
  }, (err, docs) => {
    if (err) {
      winston.error('[UserService] Failed to get staff users: '+err);
      cb(false, null);
      return;
    }

    cb(true, docs);
  });
}

function existsId(id, cb) {
  User.findById(id, (err, doc) => {
    if (err) {
      winston.error('[UserService] Failed to find user by ID '+id+': '+err);
      cb(false, null);
      return;
    }

    if (!doc) {
      cb(false, null);
      return;
    }

    cb(true, doc);
  });
}

function exists(username, email, cb) {
  User.find({$or: [
    {
      username: username
    },
    {
      email: email
    }
  ]}, (err, docs) => {
    if (err) {
      winston.error('[UserService] Failed to find user '+username+' / '+email+': '+err);
      cb(false, err);
      return;
    }

    if (docs.length == 0) {
      cb(false, null);
      return;
    }

    cb(true, null);
  });
}

function getLoginUser(email, password, cb) {
  User.find({
    email: email,
    password: Utils.toSHA256(password)
  }, (err, docs) => {
    if (err) {
      winston.error('[UserService] Failed to find user login '+username+' / '+email+': '+err);
      cb(false, null);
      return;
    }

    if (docs.length == 0) {
      cb(false, null);
      return;
    }

    cb(true, docs[0]);
  });
}

module.exports = {
  register,
  exists,
  existsId,
  getLoginUser,
  getStaff
};
