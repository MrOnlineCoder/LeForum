/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const express = require('express');
const Config = require('../config');

let router = express.Router();

router.get('/general', (req, res) => {
  res.json(Config.get());
});

module.exports = router;
