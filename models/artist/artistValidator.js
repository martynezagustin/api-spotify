const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const ArtistValidator = Joi.object({
  userId: Joi.objectId().required().messages({
    'string.pattern.name': 'El userId proporcionado no es un ID válido.'
  }),
  artistName: Joi.string().min(2).max(55).required(),
  genres: Joi.array().items(Joi.string()),
  bio: Joi.string().min(15).max(900).required(),
  verified: Joi.boolean().optional(),
  geo: {
    city: Joi.string().min(2).required(),
    stateOrProvince: Joi.string().min(2).required(),
    country: Joi.string().min(2).required(),
  },
});

module.exports = { ArtistValidator };
