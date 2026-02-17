const mongoose = require('mongoose')

const ArtistModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    artistName: {type: String, required: true},
    bio: {type: String},
    genres: [{type: String, enum: ['Rock',
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
            'Heavy Metal'], required: true}],
    verified: {type: Boolean},
    geo: {
        city: {type: String},
        stateOrProvince: {type: String},
        country: {type: String},
    },
})

module.exports = mongoose.model('Artist', ArtistModel)