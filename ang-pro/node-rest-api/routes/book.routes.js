//määritellään sovelluksen reittejä
const express = require('express');
const app = express();

//const authorize = require('../verifytoken'); // authorisointi eli vahvistetaan token

const bookRoute = express.Router();
let Book = require('../model/Book');

// Add Book
bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all Books
bookRoute.route('/').get((req, res) => {
    Book.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Book
bookRoute.route('/read-book/:id').get((req, res) => {
  console.log('test2.1');
    Book.findById(req.params.id, (error, data) => {
  console.log('test2.2');
    if (error) {
      return error //next(error)
    } else {
      res.json(data)
    }
  })
})

// Get some exact book/s
//Tämän olen lisännyt itse, eli tämä on funktio hakukenttää varten, jolla voi etsiä kirjojen nimiä tai kirjailijoita
//Eli sen kirjaimen tai sanan perusteella, löytyy jokin kirja
bookRoute.route('/read-books/:txt').get((req, res) => {
  console.log('test');
  console.log(req.params);
  console.log(req.params.txt); 
    Book.find({$or: [{name: {"$regex": req.params.txt, "$options": "i"}}, {author: {"$regex": req.params.txt, "$options":"i"}}]}, {}, (error, data) => { 
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
}).collation({'locale':'en'}).sort({'name':1});
})


// Update Book
bookRoute.route('/update-book/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Book updated successfully!')
    }
  })
})

// Delete Book
bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = bookRoute;
