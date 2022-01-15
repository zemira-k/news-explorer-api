const mongoose = require('mongoose');
const validator = require('validator');

// keyword — the word by which the articles are searched. A string, required field.
// title — an article title (string, required).
// text — the article text (string, required).
// date — the article date (string, required).
// source — the article source (string, required).
// link — a link to the article (string, required, must be a URL address).
// image — a link to the image for the article (string, required, must be a URL address).
// owner — the _id of the user who saved the article.
// You need to set the default behavior so that the database doesn't return this field.

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: true,
  },
});

module.exports = mongoose.model('article', articleSchema);
