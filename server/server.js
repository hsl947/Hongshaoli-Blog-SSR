const fs = require('fs') // 操作文件
const path = require('path')
const express = require('express')
const router = express.Router()
const multer = require('multer') // 接收图片

const Blog = require('./db/front').blog
const User = require('./db/front').user
const Project = require('./db/front').project

router.get('/test', (req, res, next) => {
  res.send('test api ok!')
})

// 文章列表数据
router.post('/list', (req, res, next) => {
  const page = req.body.page ? +req.body.page : 1
  const limit = req.body.limit ? +req.body.limit : 20
  const skip = (page - 1) * limit
  const ignoreField = {
    content: 0,
    __v: 0
  }
  Blog.find({}, ignoreField).skip(skip).limit(limit).then((_data) => {
    res.json({
      status: 200,
      message: '查询成功',
      data: _data,
      total: _data.length,
      page
    })
  }).catch((err) => {
    console.log(err)
  })
})

// 文章详情
router.post('/list/detail', (req, res, next) => {
  if (!req.body._id) {
    res.json({
      status: 100,
      message: '查询失败',
      data: {}
    })
    return
  }
  const ignoreField = {
    __v: 0
  }
  Blog.find(req.body, ignoreField).then((_data) => {
    res.json({
      status: 200,
      message: '查询成功',
      data: _data[0]
    })
  }).catch(() => {
    res.status(404).end()
  })
})

// admin文章列表数据
router.post('/admin/list', async (req, res, next) => {
  let all = 0
  await Blog.count({}, (e, count) => { all = count })
  const page = req.body.page ? +req.body.page : 1
  const limit = req.body.limit ? +req.body.limit : 20
  const skip = (page - 1) * limit
  const ignoreField = {
    content: 0,
    __v: 0
  }
  Blog.find({}, ignoreField).skip(skip).limit(limit).then((_data) => {
    res.json({
      status: 200,
      message: '查询成功',
      data: _data,
      total: all,
      page,
      limit
    })
  }).catch((err) => {
    console.log(err)
  })
})

// admin文章添加
router.post('/admin/add', (req, res, next) => {
  const cookies = req.signedCookies
  if (!cookies || !cookies.cur_user) {
    res.json({
      status: 401,
      message: '操作失败，非法登录！'
    })
    return
  }

  const data = req.body
  const newBlog = new Blog(data)
  newBlog.save((err) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        status: 200,
        message: '添加成功'
      })
    }
  })
})

// admin文章编辑
router.post('/admin/edit', (req, res, next) => {
  const cookies = req.signedCookies
  if (!cookies || !cookies.cur_user) {
    res.json({
      status: 401,
      message: '操作失败，非法登录！'
    })
    return
  }

  const data = req.body
  const target = { _id: data._id }
  Blog.update(target, data, (err) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        status: 200,
        message: '修改成功'
      })
    }
  })
})

// admin文章删除
router.post('/admin/delete', (req, res, next) => {
  const cookies = req.signedCookies
  if (!cookies || !cookies.cur_user) {
    res.json({
      status: 401,
      message: '操作失败，非法登录！'
    })
    return
  }

  const data = req.body
  const target = { _id: data._id }
  Blog.remove(target, (err) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        status: 200,
        message: '删除成功'
      })
    }
  })
})

// admin后台登录
router.post('/admin/login', (req, res, next) => {
  const data = req.body
  User.findOne(data).then((_data) => {
    if (_data) {
      if (_data.token !== 'guest') { res.cookie('cur_user', _data.token, { maxAge: 30 * 24 * 3600 * 1000, signed: true, httpOnly: true }) }
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
  }).catch((err) => {
    console.log(err)
  })
})
// admin后台退出登录
router.post('/admin/logout', (req, res, next) => {
  // let cookies = req.signedCookies;
  // if(!cookies || !cookies.cur_user){
  //     res.json({
  //         status: 401,
  //         message: '操作失败，非法登录！'
  //     });
  //     return;
  // }
  res.clearCookie('cur_user')
  res.json({
    status: 200,
    message: '退出登录成功！'
  })
})
// 定义图片上传的临时目录
const storage = multer.diskStorage({
  async destination (req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads')
    const isExists = await fs.existsSync(uploadPath) // 判断目录是否存在
    if (!isExists) { fs.mkdirSync(uploadPath) } // 不存在的话，创建目录
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename (req, file, cb) {
    cb(null, Date.now() + '.' + file.originalname.split('.').slice(-1))
  }
})
const upload = multer({ storage })
router.post('/file/upload', upload.single('img'), function (req, res) {
  req.connection.setTimeout(100000) // 100 seconds
  res.json({ url: '/uploads/' + req.file.filename })
})

// 增加阅读数
router.post('/list/view', async (req, res, next) => {
  if (!req.body._id) {
    res.json({
      status: 100,
      message: '更新阅读数量失败',
      data: {}
    })
    return
  }
  const data = await Blog.find(req.body, { view: 1 })
  let viewNum = data[0].view || 0
  viewNum++
  Blog.updateOne(req.body, { $set: { 'view': viewNum } }).then((_data) => {
    res.json({
      status: 200,
      message: '更新阅读数量成功',
      data: _data[0]
    })
  }).catch((e) => {

  })
})

// 获取评论列表
router.post('/list/comments', (req, res, next) => {
  if (!req.body._id) {
    res.json({
      status: 100,
      message: '查询评论失败',
      data: {}
    })
    return
  }
  const fields = {
    _id: 1,
    comments: 1
  }
  const params = {
    _id: req.body._id
  }
  Blog.find(params, fields).then((_data) => {
    res.json({
      status: 200,
      message: '查询评论成功',
      data: _data[0].comments,
      id: req.body._id
    })
  }).catch((e) => {
    res.status(404).end()
  })
})

// 添加评论
router.post('/list/addComment', async (req, res, next) => {
  if (!req.body._id) {
    res.json({
      status: 100,
      message: '更新评论失败',
      data: {}
    })
    return
  }
  const params = {
    _id: req.body._id
  }
  const data = await Blog.find(params, { comments: 1 })
  const comments = data[0].comments || []
  const json = {
    userName: req.body.userName,
    content: req.body.content,
    ip: req.body.ip,
    city: req.body.city
  }
  comments.push(json)
  Blog.updateOne(params, { $set: { comments } }).then((_data) => {
    res.json({
      status: 200,
      message: '更新评论成功',
      data: _data[0]
    })
  }).catch((e) => {

  })
})

// 我的项目-列表数据
router.post('/project/list', (req, res, next) => {
  Project.find({}).then((_data) => {
    res.json({
      status: 200,
      message: '查询成功',
      data: _data,
      total: _data.length
    })
  }).catch((err) => {
    console.log(err)
  })
})

module.exports = router
