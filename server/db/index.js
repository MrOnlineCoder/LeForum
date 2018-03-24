/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

const mongoose = require("mongoose");

function connect(cb) {
  mongoose.connect(process.env.MONGODB_URI  || 'mongodb://localhost/leforum', function(err) {
    if (err) {
        cb(false, err);
    } else {
        cb(true, null);
    }
  });
}

const UserSchema = new mongoose.Schema({
 username: {
  type: String
 },
 email: {
 	type: String
 },
 password: {
 	type: String
 },
 birth: {
 	type: Date
 },
 country: {
   type: String
 },
 registered: {
  type: Date
 },
 lastSeen: {
   type: Date
 },
 posts: Number,
 reputation: Number,
 group: String
});

var User = mongoose.model("users", UserSchema);

module.exports = {
  connect,
  User
}
