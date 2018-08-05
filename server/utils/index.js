/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const crypto = require('crypto');

 function hashPassword(data) {
   return crypto.createHash('sha512').update(data).digest('hex');
 }

module.exports = {
  hashPassword
};
