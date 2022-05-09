/* eslint-disable linebreak-style */
const router = require('express').Router();
const auth = require('../middleware/auth');

const signin = require('./signin');
const signup = require('./signup');
const articles = require('./articles');
const users = require('./users');

router.use('/', signin);
router.use('/', signup);
router.use(auth);
router.use('/', articles);
router.use('/', users);

module.exports = router;
