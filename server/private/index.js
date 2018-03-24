/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */
const express = require('express');
let router = express.Router();

const PrivUserAPI = require('./user');

router.use('/user', PrivUserAPI);

module.exports = router;
