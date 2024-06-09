const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  reservedFrom: { type: Date, required: true },
  reservedTo: { type: Date, required: true }
});

module.exports = mongoose.model('Reservation', reservationSchema);