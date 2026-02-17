const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    trackId: {type: mongoose.Schema.Types.ObjectId, ref: 'Track'}
}, {timestamps: true})

module.exports = mongoose.model('Like', LikeSchema)