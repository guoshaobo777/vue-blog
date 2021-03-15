const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.set('secret', 'i2u34y12oi3u4y8')

// 数据接收限制
app.use(bodyParser.json({limit : "2100000kb"}))
// 配置cors跨域
app.use(require('cors')())
// 配置bodyparser
// 设置完毕之后，会在req对象上面新增一个req.body的一个对象
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
// 文件资源
app.use('/uploads', express.static(__dirname + '/uploads'))
// 数据库链接
require('./plugins/db')(app)
// 接口api
require('./routes/article')(app)
require('./routes/login')(app)
require('./routes/upload')(app)
require('./routes/friend')(app)
require('./routes/user')(app)
require('./routes/discuss')(app)
require('./routes/opus')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})