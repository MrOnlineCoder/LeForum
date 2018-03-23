/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const shajs = require('sha.js');

 function toSHA256(data) {
   return shajs('sha256').update(data).digest('hex');
 }

module.exports = {
  toSHA256
};
