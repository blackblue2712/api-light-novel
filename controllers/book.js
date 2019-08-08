const Book = require('../models/Book');

module.exports.addBook = (req, res) => {
    Book.findOne( {name: req.body.name}, (err, result) => {
        if(result) {
            return res.status(400).json( {error: `The book ${req.body.name} is exists`} )
        }else {        
            const book = new Book(req.body);
        
            book.save( (err, book) => {
                if(err) {
                    return res.status(403).json("Error! Not Permission")
                }
                return res.status(400).json("Add new book successfully!");
            })
        }
    })
}