module.exports = app => {
     // 图片上传
    // 引入上传图片模块multer
    const multer = require('multer')
    // 配置multer
    const upload = multer({ dest: __dirname + '/../uploads' })
    // 图片上传接口
    app.post('/blog/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}