'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ silent: true });
}

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const path = require('path');
const parse = require('./routes/parse');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  const morgan = require('morgan');

  app.use(morgan('short'));
}

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(express.static(path.join('public')));

app.use('/api', parse);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.status) {

    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {

    console.log('Listening on port', port);
  }
});
