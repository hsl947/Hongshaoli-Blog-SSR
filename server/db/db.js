const mongoose = require('mongoose'); 
const DB_URL = 'mongodb://localhost:27017/test';
mongoose.connect(DB_URL);

const db = mongoose.connection;
/**
 * 连接
 * 连接数据库 如果不自己创建 默认test数据库会自动生成
 */

/**
  * 连接成功
  */
db.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
db.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
db.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;