const mongoose = require('mongoose')

const FollowerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true }
}, { timestamps: true })

FollowerSchema.index({ userId: 1, artistId: 1 }, { unique: true })

module.exports = mongoose.model('Follower', FollowerSchema)