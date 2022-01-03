const router = require('express').Router(); // creating a router
const { celebrate, Joi } = require('celebrate');
const { getUser } = require('../controllers/users');

router.get(
  '/users/me',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  getUser
);

module.exports = router; // exporting the router
