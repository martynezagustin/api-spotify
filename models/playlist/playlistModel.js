const mongoose = require('mongoose')

const PlaylistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ownerUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPublic: { type: Boolean, default: false },
    tracks: [{
        track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track' },
        addedAt: { type: Date, default: Date.now }
    }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Playlist', PlaylistSchema)
