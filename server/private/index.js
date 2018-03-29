/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */
const express = require('express');
let router = express.Router();

const PrivUserAPI = require('./user');
const PrivAdminAPI = require('./admin');
const PrivPostAPI = require('./posts');
const PrivTopicAPI = require('./topics');

router.use('/user', PrivUserAPI);
router.use('/admin', PrivAdminAPI);
router.use('/topics', PrivTopicAPI);
router.use('/posts', PrivPostAPI);

module.exports = router;
