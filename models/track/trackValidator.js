const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const TrackValidator = Joi.object({
  mainArtist: Joi.objectId().required(),
  featuredArtists: Joi.array().items(Joi.string().hex().length(24)).optional(),
  title: Joi.string().required(),
  durationSeconds: Joi.number().integer().min(20).required(),
  genre: Joi.string().valid(
    'Rock',
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
    'Heavy Metal'
  ),
});


module.exports = {TrackValidator}