module.exports = option => {
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    return async (req, res, next) => {
        const token = String(req.headers.authorization).split(' ').pop()
        assert(token, 401, '请先登录')
        // verify 解析token 解析成id
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登录')
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登录')
        await next()
    }
}

