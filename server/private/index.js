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

router.use('/user', PrivUserAPI);
router.use('/admin', PrivAdminAPI);

module.exports = router;
