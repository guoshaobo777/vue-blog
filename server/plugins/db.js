module.exports = app =>{
    const mongoose = require('mongoose')
    // 链接数据库
    mongoose.connect('mongodb://127.0.0.1/node-vue-blog', {
        useCreateIndex:true,
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    },(err)=>{
        if(err){
            console.log('数据库链接失败')
        }
        console.log('数据库链接成功')
    })
}