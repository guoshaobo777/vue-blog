module.exports = app => {

    /*
    *   文章模块  
    */

    const express = require('express')
    const router = express.Router()
    const Article = require('../models/Article')

    // 文章操作开始
    // 添加文章
    router.post('/articles', async (req, res) => {
        const model = await Article.create(req.body)
        res.send(model)
    })

    // 删除文章
    router.delete('/articles/:id', async (req, res) => {
        // findByIdAndDelete()方法删除分类
        await Article.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    // 修改文章
    router.put('/articles/:id', async (req, res) => {
        // 通过findByIdAndUpdata()方法修改数据
        const model = await Article.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 分页查询文章
    router.get('/articles', async (req, res) => {
        let page = parseInt(req.query.pagenum)
        let pageSize = parseInt(req.query.pagesize)

        let skip = (page - 1) * pageSize
        let query1 = Article.find()
        let query2 = Article.find()

        const total = await query1.count()
        const items = await query2.sort({addTime: -1}).skip(skip).limit(pageSize)

        res.json({
            data: items,
            total: total
        })
    })

    // 根据ID查询单个文章
    router.get('/articles/:id', async (req, res) => {
        const model = await Article.findById(req.params.id)
        res.send(model)
    })
    // 文章操作结束
    app.use('/blog/api', router)

}