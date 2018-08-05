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
 bio: String,
 signature: String,
 registered: Date,
 lastSeen: Date,
 posts: Number,
 reputation: Number,
 group: String,
 avatarURL: String
});

const TopicSchema = new mongoose.Schema({
 title: String,
 author: String,
 date: Date,
 open: Boolean,
 category: String
});

const PostSchema = new mongoose.Schema({
 content: String,
 author: String,
 date: Date,
 topic: String,
 likes: [String]
});

const NotificationSchema = new mongoose.Schema({
 type: String, //like, mention, delete
 target: String,
 issuer: String,
 data: String,
 data: String,
 topic: TopicSchema
});


let User = mongoose.model("users", UserSchema);
let Topic = mongoose.model("topics", TopicSchema);
let Post = mongoose.model("posts", PostSchema);
let Notification = mongoose.model("notifications", NotificationSchema);

module.exports = {
  connect,
  User,
  Topic,
  Post,
  Notification
}
