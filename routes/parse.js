'use strict'

const express = require('express');
const pos = require('pos');
const axios = require('axios');
const tKey = process.env.T_API_KEY;
const pKey = process.env.P_API_KEY;
const router = express.Router();

router.post('/parse', (req, res, next) => {
  const text = req.body.text;

  axios.post('https://textanalysis.p.mashape.com/nltk-pos-tagging', `text=${text}`, {
    headers: {
      "X-Mashape-Key": "vaHegy10Qbmsh7DoQNenVN0gmVmap12hzs4jsnhflVWwFae6xG",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    }
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
