const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    avatar: { type: String },
    name: { type: String },
    content: { type: String, },
    addTime: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Discuss', schema)