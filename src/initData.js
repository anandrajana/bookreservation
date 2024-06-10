const bcrypt = require("bcrypt");
const User = require('./models/userSchema');
const Book = require('./models/bookSchema');

async function initializeData() {
  // Check and insert users
  const userCount = await User.countDocuments({});
  if (userCount === 0) {
    const anandrajanaPwd = await bcrypt.hash("anandrajana", 10);
    const sandeepkomalanPwd = await bcrypt.hash("sandeepkomalan", 10);
    await User.insertMany([
      {
        username: "anandrajana",
        email: "anandsandmay@gmail.com",
        password: anandrajanaPwd,
        reservationHistory: [],
      },
      {
        username: "sandeepkomalan",
        email: "sandeepkomalan@gmail.com",
        password: sandeepkomalanPwd,
        reservationHistory: [],
      },
    ]);
    console.log('Test Users initialized');
  } else {
    console.log('Test Users already exist');
  }

  // Check and insert books
  const bookCount = await Book.countDocuments({});
  if (bookCount === 0) {
    const books = [
      { title: 'Book 1', author: 'Author 1' , description: 'Description 1', available: true},
      { title: 'Book 2', author: 'Author 2' , description: 'Description 2', available: true},
      { title: 'Book 3', author: 'Author 3' , description: 'Description 3', available: true},
      { title: 'Book 4', author: 'Author 4' , description: 'Description 4', available: true},
      { title: 'Book 5', author: 'Author 5' , description: 'Description 5', available: true},
      { title: 'Book 6', author: 'Author 6' , description: 'Description 6', available: true},
      { title: 'Book 7', author: 'Author 7' , description: 'Description 7', available: true},
      { title: 'Book 8', author: 'Author 8' , description: 'Description 8', available: true},
      { title: 'Book 9', author: 'Author 9' , description: 'Description 9', available: true},
      { title: 'Book 10', author: 'Author 10' , description: 'Description 10', available: true}
    ];
    await Book.insertMany(books);
    console.log('Test Books initialized');
  } else {
    console.log('Test Books already exist');
  }
}

module.exports = initializeData;