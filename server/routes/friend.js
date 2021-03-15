module.exports = app => {
    const Friend = require('../models/Friend')
    const express = require('express')
    const router = express.Router()
    // 友情链接部分开始
    // 添加友情链接
    router.post('/friends', async (req, res) => {
        const model = await Friend.create(req.body)
        res.send(model)
    })

    // 删除友情链接
    router.delete('/friends/:id', async (req, res) => {
        await Friend.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })
    // 修改友情链接
    router.put('/friends/:id', async (req, res) => {
        const model = await Friend.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 友情链接的查询分页
    router.get('/friends', async (req, res) => {
        let page = parseInt(req.query.pagenum)
        let pageSize = parseInt(req.query.pagesize)
        let skip = (page - 1) * pageSize
        let query1 = Friend.find()
        let query2 = Friend.find()

        const total = await query1.count()
        const items = await query2.skip(skip).limit(pageSize)
        res.json({
            data: items,
            total: total
        })
    })

    // 根据id查询单个友链
    router.get('/friends/:id', async (req, res) => {
        const model = await Friend.findById(req.params.id)
        res.send(model)

    })
    app.use('/blog/api', router)
}