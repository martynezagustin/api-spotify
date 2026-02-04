const Joi = require('Joi');
Joi.objectId = require('joi-objectid')(Joi);

const PlaylistSchema = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  ownerUser: Joi.objectId().required(),
});

module.exports = { PlaylistSchema };
