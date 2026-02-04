const Joi = require('joi');
Joi.ob;

const TrackSchema = Joi.object({
  artists: Joi.array()
    .items(Joi.string().hex().length(24).required())
    .min(1)
    .required(),
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
