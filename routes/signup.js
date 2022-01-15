const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser,
);

module.exports = router;
