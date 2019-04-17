const db = require('./db');
const Schema = db.Schema;

var listSchema = new Schema({
    title: { type: String },
    time: { type: Date },
    description: { type: String },
    content: { type: String }
});
var blogModel = db.model('Blog', listSchema);

var userSchema = new Schema({
    userName: { type: String },
    password: { type: String },
    token: { type: String }
});
var userModel = db.model('User', userSchema);

module.exports = {
    blog: blogModel,
    user: userModel
};