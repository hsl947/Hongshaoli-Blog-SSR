const db = require('./db')
const Schema = db.Schema

const listSchema = new Schema({
  title: { type: String },
  time: { type: Date },
  description: { type: String },
  content: { type: String },
  view: { type: Number },
  isTop: { type: Boolean },
  comments: { type: Array }
})
const blogModel = db.model('Blog', listSchema)

const userSchema = new Schema({
  userName: { type: String },
  password: { type: String },
  token: { type: String }
})
const userModel = db.model('User', userSchema)

module.exports = {
  blog: blogModel,
  user: userModel
}
