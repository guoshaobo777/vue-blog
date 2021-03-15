module.exports = app => {
    // const express = require('express')
    // const router = express.Router()
    // const Article = require('../models/Article')
    // 登陆接口
    const AdminUser = require('../models/AdminUser')
    app.post('/blog/api/login', async (req, res) => {
        const { username, password } = req.body
        const user = await AdminUser.findOne({ username }).select('+password')
        if (!user) {
            return res.status(422).send({
                message: '用户不存在'
            })
        }
        const isValid = require('bcrypt').compareSync(password, user.password)
        if (!isValid) {
            return res.status(422).send({
                message: '用户密码错误'
            })
        }
        const jwt = require('jsonwebtoken')
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send(token)
    })

}