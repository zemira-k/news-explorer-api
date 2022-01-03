const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.post(
  '/articles',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().uri(),
      image: Joi.string().required().uri(),
    }),
  }),
  createArticle,
);

router.delete(
  '/articles/:articleId',
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().length(24).alphanum().required(),
    }),
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  deleteArticle,
);

router.get('/articles', getAllArticles);

module.exports = router;
