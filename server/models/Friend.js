const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    icon: { type: String},
    link: { type: String },
    name: { type: String },
    show: { type: String },
    isreco: { type: Boolean },
    addTime:{
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Friend', schema)