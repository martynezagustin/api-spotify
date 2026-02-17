const mongoose = require('mongoose')

const TrackSchema = {
    mainArtist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    featuredArtists: [{type: mongoose.Schema.Types.ObjectId, ref: 'Artist'}],
    title: { type: String, required: true },
    durationSeconds: { type: Number, required: true },
    genre: {
        type: String, enum: ['Rock',
            'Pop',
            'Indie',
            'Jazz',
            'Trap',
            'R&B',
            'Hip-hop',
            'Reggaetón',
            'Blues',
            'Electrónica',
            'Folklore',
            'Salsa',
            'Funk',
            'Reggae',
            'Clásico',
            'Flamenco',
            'Heavy Metal'], required: true
    }
}

module.exports = mongoose.model('Track', TrackSchema)