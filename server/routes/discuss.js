module.exports = app => {

    /*
    *   留言板模块  
    */

    const express = require('express')
    const router = express.Router()
    const Discuss = require('../models/Discuss')

    // 评论操作开始
    // 添加评论
    router.post('/discusses', async (req, res) => {
        const model = await Discuss.create(req.body)
        res.send(model)
    })

    // 删除评论
    router.delete('/discusses/:id', async (req, res) => {
        await Discuss.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    // 修改评论
    router.put('/discusses/:id', async (req, res) => {
        // 通过findByIdAndUpdata()方法修改数据
        const model = await Discuss.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 分页查询评论
    router.get('/discusses', async (req, res) => {
        let page = parseInt(req.query.pagenum)
        let pageSize = parseInt(req.query.pagesize)

        let skip = (page - 1) * pageSize
        let query1 = Discuss.find()
        let query2 = Discuss.find()

        const total = await query1.count()
        const items = await query2.sort({addTime: -1}).skip(skip).limit(pageSize)

        res.json({
            data: items,
            total: total
        })
    })

    // 根据ID查询单个评论
    router.get('/discusses/:id', async (req, res) => {
        const model = await Discuss.findById(req.params.id)
        res.send(model)
    })

    app.use('/blog/api', router)

}