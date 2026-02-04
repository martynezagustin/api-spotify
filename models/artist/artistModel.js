const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const ArtistSchema = Joi.object({
  artistName: Joi.string().min(2).max(55).required,
  bio: Joi.string().min(15).max(900).required(),
  verified: Joi.boolean().optional(),
  geo: {
    city: Joi.string().min(2).required,
    stateOrProvince: Joi.string().min(2).required(),
    country: Joi.string().min(2).required(),
  },
});

module.exports = { ArtistSchema };
