/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      // password: Joi.string().required().regex
      // (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
      password: Joi.string().required(),
    }),
  }),
  login
);

module.exports = router;
