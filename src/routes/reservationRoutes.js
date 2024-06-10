// routes/reservationRoutes.js
const express = require('express');
const Reservation = require('../models/reservationSchema');
const Book = require('../models/bookSchema');
const User = require('../models/userSchema');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { bookId, reservedFrom, reservedTo } = req.body;

    const book = await Book.findById(bookId);
    if (!book || !book.available) {
      return res.status(400).send({ error: 'Book is not available for reservation' });
    }

    const reservation = new Reservation({
      user: req.user._id,
      book: bookId,
      reservedFrom,
      reservedTo
    });

    await reservation.save();

    book.available = false;
    await book.save();

    const user = await User.findById(req.user._id);
    user.reservationHistory.push(reservation._id);
    await user.save();

    res.status(201).send(reservation);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id }).populate('book');
    res.send(reservations);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
