const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: { type: String },
    show: { type: String },
    body: { type: String },
    render: { type: String },
    ishot: { type: Boolean },
    icon: { type: String },
    addTime: {
        type: Date,
        default: Date.now
    },
    discuss: [{
        discuss: { type: mongoose.SchemaTypes.ObjectId, ref: 'Discuss' }
    }]
    // _discuss: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Discuss'
    // }
})

module.exports = mongoose.model('Acticle', schema)