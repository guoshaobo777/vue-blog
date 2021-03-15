const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    opus_name: { type: String },
    opus_pic: { type: String },
    opus_show: { type: String },
    opus_link: { type: String },
    opus_git_link: { type: String },
    addTime: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Opus', schema)