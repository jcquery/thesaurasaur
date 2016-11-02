'use strict'

const express = require('express');
const pos = require('pos');

const router = express.Router();

router.post('/parse', (req, res, next) => {
  const text = req.body.text;

  if (!text) {
    return res.status(400).send('No text!');
  }

  const words = new pos.Lexer().lex(text);
  const tagger = new pos.Tagger();
  const taggedWords = tagger.tag(words);

  res.send(taggedWords);
});

module.exports = router;
