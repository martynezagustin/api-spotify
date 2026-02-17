const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const PlaylistValidator = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  ownerUser: Joi.objectId().required(),
  isPublic: Joi.boolean().optional(),
  tracks: Joi.array().items(Joi.object({
    track: Joi.objectId().required(),
    addedAt: Joi.date().optional()
  }))
});

module.exports = { PlaylistValidator };
