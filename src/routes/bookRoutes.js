const express = require('express');
const Book = require('../models/bookSchema');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send({ error: 'Book not found' });
    res.send(book);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
