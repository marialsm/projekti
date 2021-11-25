const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//muokkasin tätä osaa ja yhdistin minun bookstore-collectioniin MongoDBCompassista
const Book = new Schema({
  name: {
    type: String
  },
  author: {
    type: String
  },
  price: {
    type: Number
  },
  description: {
    type: String
  }
}, {
  collection: 'bookstore'
})

module.exports = mongoose.model('Book', Book)


