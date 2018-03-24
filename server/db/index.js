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
 username: String,
 email: String,
 password: String,
 birth: Date,
 country: String,
 registered: Date,
 lastSeen: Date,
 posts: Number,
 reputation: Number,
 group: String,
 avatarURL: String
});

var User = mongoose.model("users", UserSchema);

module.exports = {
  connect,
  User
}
