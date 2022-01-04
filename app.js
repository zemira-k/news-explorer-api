const express = require('express');
const { errors } = require('celebrate');
require('dotenv').config();

const { PORT = 3000, NODE_ENV, DB_ADRESS } = process.env;
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./logs/logger');

const limiter = require('./middleware/limiter');

const routes = require('./routes/index');

app.use(helmet());
app.options('*', cors());
app.use(cors());

// for localDb testing
mongoose.connect(NODE_ENV === 'production' ? DB_ADRESS : '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);

app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use('/', routes);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
});

app.listen(PORT);
