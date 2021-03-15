

module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Article = require('../models/Article')
    const Friend = require('../models/Friend')
    const Discuss = require('../models/Discuss')
    const AdminUser = require('../models/AdminUser')
    const authMiddleware = require('../middleware/auth')

    // 评论操作开始
    // 添加文章
    router.post('/discusses', async (req, res) => {
        const model = await Discuss.create(req.body)
        res.send(model)
    })

    // 删除文章
    router.delete('/discusses/:id', authMiddleware(), async (req, res) => {
        // findByIdAndDelete()方法删除分类
        await Discuss.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    // 修改文章
    router.put('/discusses/:id', authMiddleware(), async (req, res) => {
        // 通过findByIdAndUpdata()方法修改数据
        const model = await Discuss.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 分页查询文章
    router.get('/discusses', async (req, res) => {
        let page = parseInt(req.query.pagenum)
        let pageSize = parseInt(req.query.pagesize)

        let skip = (page - 1) * pageSize
        let query1 = Discuss.find()
        let query2 = Discuss.find()

        const total = await query1.count()
        const items = await query2.skip(skip).limit(pageSize)

        res.json({
            data: items,
            total: total
        })
    })

    // 根据ID查询单个文章
    router.get('/discusses/:id', async (req, res) => {
        const model = await Discuss.findById(req.params.id)
        res.send(model)
    })
    // // 文章操作开始
    // // 添加文章
    // router.post('/articles', async (req, res) => {
    //     const model = await Article.create(req.body)
    //     res.send(model)
    // })

    // // 删除文章
    // router.delete('/articles/:id', authMiddleware(), async (req, res) => {
    //     // findByIdAndDelete()方法删除分类
    //     await Article.findByIdAndDelete(req.params.id)
    //     res.send({
    //         success: true
    //     })
    // })

    // // 修改文章
    // router.put('/articles/:id', authMiddleware(), async (req, res) => {
    //     // 通过findByIdAndUpdata()方法修改数据
    //     const model = await Article.findByIdAndUpdate(req.params.id, req.body)
    //     res.send(model)
    // })

    // // 分页查询文章
    // router.get('/articles', async (req, res) => {
    //     let page = parseInt(req.query.pagenum)
    //     let pageSize = parseInt(req.query.pagesize)

    //     let skip = (page - 1) * pageSize
    //     let query1 = Article.find()
    //     let query2 = Article.find()

    //     const total = await query1.count()
    //     const items = await query2.sort({addTime: -1}).skip(skip).limit(pageSize)

    //     res.json({
    //         data: items,
    //         total: total
    //     })
    // })

    // // 根据ID查询单个文章
    // router.get('/articles/:id', async (req, res) => {
    //     const model = await Article.findById(req.params.id)
    //     res.send(model)
    // })
    // // 文章操作结束

    // // 友情链接部分开始
    // // 添加友情链接
    // router.post('/friends', authMiddleware(), async (req, res) => {
    //     const model = await Friend.create(req.body)
    //     res.send(model)
    // })

    // // 删除友情链接
    // router.delete('/friends/:id', authMiddleware(), async (req, res) => {
    //     await Friend.findByIdAndDelete(req.params.id)
    //     res.send({
    //         success: true
    //     })
    // })
    // // 修改友情链接
    // router.put('/friends/:id', authMiddleware(), async (req, res) => {
    //     const model = await Friend.findByIdAndUpdate(req.params.id, req.body)
    //     res.send(model)
    // })

    // // 友情链接的查询分页
    // router.get('/friends', async (req, res) => {
    //     let page = parseInt(req.query.pagenum)
    //     let pageSize = parseInt(req.query.pagesize)
    //     let skip = (page - 1) * pageSize
    //     let query1 = Friend.find()
    //     let query2 = Friend.find()

    //     const total = await query1.count()
    //     const items = await query2.skip(skip).limit(pageSize)
    //     res.json({
    //         data: items,
    //         total: total
    //     })
    // })

    // // 根据id查询单个友链
    // router.get('/friends/:id', async (req, res) => {
    //     const model = await Friend.findById(req.params.id)
    //     res.send(model)

    // })

    // // 查询友情链接
    // router.get('/friends', async (req, res) => {
    //     let page = parseInt(req.query.pagenum)
    //     let pageSize = parseInt(req.query.pagesize)

    //     let skip = (page - 1) * pageSize
    //     let query1 = Friend.find()
    //     let query2 = Friend.find()

    //     const total = await query1.count()
    //     const items = await query2.skip(skip).limit(pageSize)

    //     res.send({
    //         data: items,
    //         total: total
    //     })
    // })

    // 用户管理开始
    router.post('/users', authMiddleware(), async (req, res) => {
        const model = await AdminUser.create(req.body)
        res.send(model)
    })



    // app.use('/blog/api', router)
    // // 图片上传
    // // 引入上传图片模块multer
    // const multer = require('multer')
    // // 配置multer
    // const upload = multer({ dest: __dirname + '/../uploads' })
    // // 图片上传接口
    // app.post('/blog/api/upload', upload.single('file'), async (req, res) => {
    //     const file = req.file
    //     file.url = `http://localhost:3000/uploads/${file.filename}`
    //     res.send(file)
    // })

    // 登陆接口
    // const AdminUser = require('../models/AdminUser')
    // app.post('/blog/api/login', async (req, res) => {
    //     const { username, password } = req.body
    //     const user = await AdminUser.findOne({ username }).select('+password')
    //     if (!user) {
    //         return res.status(422).send({
    //             message: '用户不存在'
    //         })
    //     }
    //     const isValid = require('bcrypt').compareSync(password, user.password)
    //     if (!isValid) {
    //         return res.status(422).send({
    //             message: '用户密码错误'
    //         })
    //     }
    //     const jwt = require('jsonwebtoken')
    //     const token = jwt.sign({ id: user._id }, app.get('secret'))
    //     res.send(token)
    // })
}