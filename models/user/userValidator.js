const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const UserValidator = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  lastname: Joi.string().min(2).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*\d).*/)
    .required()
    .messages({
      'string.pattern.base':
        'La contraseña debe tener una mayúscula y un número.',
    }),
  birthday: Joi.date().iso().max('now').required(),
  username: Joi.string().min(5).max(20).required().messages({
    'string.min': 'Debes, al menos, ingresar cinco caracteres.',
  }),
});

module.exports = { UserValidator };
