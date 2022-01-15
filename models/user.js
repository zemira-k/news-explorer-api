const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthError = require('../errors/auth-err');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'the email is not valid',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Damien',
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Incorrect email or password');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthError('Incorrect email or password');
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
