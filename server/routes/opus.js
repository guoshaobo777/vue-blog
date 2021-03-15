module.exports = app => {

    /*
    *   作品模块  
    */

    const express = require('express')
    const router = express.Router()
    const Opus = require('../models/Opus')

    // 作品操作开始
    // 添加作品
    router.post('/opuses', async (req, res) => {
        const model = await Opus.create(req.body)
        res.send(model)
    })

    // 删除作品
    router.delete('/opuses/:id', async (req, res) => {
        // findByIdAndDelete()方法删除分类
        await Opus.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    // 修改作品
    router.put('/opuses/:id', async (req, res) => {
        // 通过findByIdAndUpdata()方法修改数据
        const model = await Opus.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 分页查询作品
    router.get('/opuses', async (req, res) => {
        let page = parseInt(req.query.pagenum)
        let pageSize = parseInt(req.query.pagesize)

        let skip = (page - 1) * pageSize
        let query1 = Opus.find()
        let query2 = Opus.find()

        const total = await query1.count()
        const items = await query2.sort({addTime: -1}).skip(skip).limit(pageSize)

        res.json({
            data: items,
            total: total
        })
    })

    // 根据ID查询单个作品
    router.get('/opuses/:id', async (req, res) => {
        const model = await Opus.findById(req.params.id)
        res.send(model)
    })
    // 作品操作结束
    app.use('/blog/api', router)

}