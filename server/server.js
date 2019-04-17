var express = require('express');
var router = express.Router();
var blog = require('./db/front').blog
var user = require('./db/front').user

var multer = require('multer'); //接收图片
var fs = require('fs'); //操作文件

router.get('/test', (req, res, next) => {
    res.send('test api ok!')
});

//文章列表数据
router.post('/list', (req, res, next) => {
    let page = req.body.page ? +req.body.page : 1;
    let limit = req.body.limit ? +req.body.limit : 20;
    let skip = (page - 1) * limit;
    let ignoreField = {
        content: 0,
        __v: 0
    }
    blog.find({}, ignoreField).then(_data => {
        res.json({
            status: 200,
            message: '查询成功',
            data: _data,
            count: _data.length
        })
    }).catch(err => {
        console.log(err);
    });
});

//文章详情
router.post('/list/detail', (req, res, next) => {
    if (!req.body._id) {
        res.json({
            status: 100,
            message: '查询失败',
            data: {}
        })
        return;
    }
    let ignoreField = {
        __v: 0
    }
    blog.find(req.body, ignoreField).then(_data => {
        res.json({
            status: 200,
            message: '查询成功',
            data: _data[0]
        })
    }).catch(err => {
        console.log(err);
    });
});

//admin文章列表数据
router.post('/admin/list', (req, res, next) => {
    var all = 0;
    blog.count({}, (err, count) => { all = count; });
    let page = req.body.page ? +req.body.page : 1;
    let limit = req.body.limit ? +req.body.limit : 20;
    let skip = (page - 1) * limit;
    let ignoreField = {
        content: 0,
        __v: 0
    }
    blog.find({}, ignoreField).skip(skip).limit(limit).then(_data => {
        res.json({
            status: 200,
            message: '查询成功',
            data: _data,
            count: all,
            page: page,
            limit: limit
        })
    }).catch(err => {
        console.log(err);
    });
});

//admin文章添加
router.post('/admin/add', (req, res, next) => {
    var data = req.body;
    let Blog = new blog(data);
    Blog.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                status: 200,
                message: '添加成功'
            })
        }
    });
});

//admin文章编辑
router.post('/admin/edit', (req, res, next) => {
    var data = req.body;
    let target = { _id: data._id };
    blog.update(target, data, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                status: 200,
                message: '修改成功'
            })
        }
    });
});

//admin文章删除
router.post('/admin/delete', (req, res, next) => {
    var data = req.body;
    let target = { _id: data._id };
    blog.remove(target, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                status: 200,
                message: '删除成功'
            })
        }
    });
});

//admin后台登录
router.post('/admin/login', (req, res, next) => {
    var data = req.body;
    user.findOne(data).then(_data => {
        if (_data) {
            res.json({
                status: 200,
                message: '登录成功',
                data: {
                    token: _data.token
                }
            })
        } else {
            res.json({
                status: 100,
                message: '用户名或密码错误！'
            })
        }
    }).catch(err => {
        console.log(err);
    });
});
//定义图片上传的临时目录
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname.split('.').slice(-1));
    }
});
var upload = multer({ storage: storage })
router.post('/file/upload', upload.single('img'), function (req, res) {
    req.connection.setTimeout(100000); //100 seconds
    res.json({ url: '/uploads/' + req.file.filename });
})

module.exports = router;