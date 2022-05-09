/* eslint-disable linebreak-style */
const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const BadReqError = require('../errors/bad-req-err');
const ForbiddenError = require('../errors/forbidden-err');

const getAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadReqError('all inputs required');
      }
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(() => {
      throw new NotFoundError('article not found');
    })
    .then((articleEl) => {
      if (req.user._id.toString() === articleEl.owner.toString()) {
        Article.findByIdAndRemove(req.params.articleId).then((article) => {
          res.status(200).send({ data: article });
        });
      } else if (req.user._id.toString() !== articleEl.owner.toString()) {
        throw new ForbiddenError('can not delete article of other user');
      } else if (Error.name === 'CastError') {
        throw new BadReqError('Invalid article id');
      }
    })
    .catch(next);
};

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};
