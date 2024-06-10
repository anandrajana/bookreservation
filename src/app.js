const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const initializeData = require('./initData');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/book_reservation').then(() => {
  console.log('Connected to MongoDB');
  initializeData();  // Initialize data after connecting to the database
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});;

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/reservations', reservationRoutes);

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

app.listen(443, () => {
  console.log('Server running on port 443');
});
