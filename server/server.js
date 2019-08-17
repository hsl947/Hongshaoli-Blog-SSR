var express = require('express');
var router = express.Router();
var blog = require('./db/front').blog
var user = require('./db/front').user

var multer = require('multer'); //接收图片
var fs = require('fs'); //操作文件

var path = require('path');

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
    blog.find({}, ignoreField).skip(skip).limit(limit).then(_data => {
        res.json({
            status: 200,
            message: '查询成功',
            data: _data,
            total: _data.length,
            page: page
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
        res.status(404).end();
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
            total: all,
            page: page,
            limit: limit
        })
    }).catch(err => {
        console.log(err);
    });
});

//admin文章添加
router.post('/admin/add', (req, res, next) => {
    let cookies = req.signedCookies;
    if(!cookies || !cookies.cur_user){
        res.json({
            status: 401,
            message: '操作失败，非法登录！'
        });
        return;
    }

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
    let cookies = req.signedCookies;
    if(!cookies || !cookies.cur_user){
        res.json({
            status: 401,
            message: '操作失败，非法登录！'
        });
        return;
    }

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
    let cookies = req.signedCookies;
    if(!cookies || !cookies.cur_user){
        res.json({
            status: 401,
            message: '操作失败，非法登录！'
        });
        return;
    }
    
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
            if(_data.token != 'guest') res.cookie('cur_user', _data.token,{ maxAge:30*24*3600*1000, signed: true, httpOnly: true });
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
//admin后台退出登录
router.post('/admin/logout', (req, res, next) => {
    // let cookies = req.signedCookies;
    // if(!cookies || !cookies.cur_user){
    //     res.json({
    //         status: 401,
    //         message: '操作失败，非法登录！'
    //     });
    //     return;
    // }
    res.clearCookie('cur_user');
    res.json({
        status: 200,
        message: '退出登录成功！'
    })
});
//定义图片上传的临时目录
var storage = multer.diskStorage({
    async destination(req, file, cb) {
        const upload_path = path.join(__dirname, 'uploads');
        let isExists = await fs.existsSync(upload_path); //判断目录是否存在
        if (!isExists) fs.mkdirSync(upload_path); //不存在的话，创建目录
        cb(null, path.join(__dirname, 'uploads'));
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

//增加阅读数
router.post('/list/view', async (req, res, next) => {
    if (!req.body._id) {
        res.json({
            status: 100,
            message: '更新阅读数量失败',
            data: {}
        })
        return;
    }
    let data = await blog.find(req.body, {view: 1});
    let view_num = data[0].view || 0;
    view_num++;
    blog.updateOne(req.body, { $set: { "view": view_num } }).then(_data => {
        res.json({
            status: 200,
            message: '更新阅读数量成功',
            data: _data[0]
        })
    }).catch(err => {
        
    });
});

//获取评论列表
router.post('/list/comments', async (req, res, next) => {
    if (!req.body._id) {
        res.json({
            status: 100,
            message: '查询评论失败',
            data: {}
        })
        return;
    }
    let fields = {
        _id: 1,
        comments: 1
    }
    let params = {
        _id: req.body._id
    }
    blog.find(params, fields).then(_data => {
        res.json({
            status: 200,
            message: '查询评论成功',
            data: _data[0].comments,
            id: req.body._id
        })
    }).catch(err => {
        res.status(404).end();
    });
});

//添加评论
router.post('/list/addComment', async (req, res, next) => {
    if (!req.body._id) {
        res.json({
            status: 100,
            message: '更新评论失败',
            data: {}
        })
        return;
    }
    let params = {
        _id: req.body._id
    }
    let data = await blog.find(params, { comments: 1 });
    let comments = data[0].comments || [];
    let json = {
        userName: req.body.userName,
        content: req.body.content,
        ip: req.body.ip,
        city: req.body.city
    }
    comments.push(json);
    blog.updateOne(params, { $set: { "comments": comments } }).then(_data => {
        res.json({
            status: 200,
            message: '更新评论成功',
            data: _data[0]
        })
    }).catch(err => {

    });
});

module.exports = router;