module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const AdminUser = require('../models/AdminUser')

    // 用户管理开始
    // 添加用户
    router.post('/users', async (req, res) => {
        const model = await AdminUser.create(req.body)
        res.send(model)
    })

    // 删除用户
    router.delete('/users/:id', async (req, res) => {
        await AdminUser.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    // 修改用户
    router.put('/users/:id', async (req, res) => {
        const model = await AdminUser.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 分页查询用户
    router.get('/users', async (req, res) => {
        const page = parseInt(req.query.pagenum)
        const pageSize = parseInt(req.query.pagesize)
        const skip = (page - 1) * pageSize
        const query1 = AdminUser.find()
        const query2 = AdminUser.find()
        const total = await query1.count()
        const items = await query2.sort({addTime: -1}).skip(skip).limit(pageSize)
        res.json({
            data: items,
            total: total
        })
    })

    // 根据ID查询单个用户
    router.get('/users/:id', async (req, res) => {
        const model = await AdminUser.findById(req.params.id)
        res.send(model)
    })
    
    app.use('/blog/api', router)

}