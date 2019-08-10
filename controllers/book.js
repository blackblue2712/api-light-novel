
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
                return res.status(200).json( {message: "Add new book successfully!"} );
            })
        }
    })
}

module.exports.getBooks =  (req, res) => {
    Book.find( {status: true}, null, {limit: 5, skip: 0, sort: {created: -1}} )
        .select("name status  price saleOff created")
        .populate("cateId", "name")
        .exec( (err, books) => {
            if(!books || err) return res.status(400).json( {error: "Can not get all books"} )
            return res.status(200).json(books)
        })
}

module.exports.getSingleBook = (req, res) => {
    return res.json(req.bookInfo);
}

module.exports.requestRelatedBookId = (req, res, next, id) => {
    Book.findById(id)
        .select("_id name description author price saleOff status special datePublished created views")
        .populate("cateId", "_id name description created")
        .exec( (err, book) => {
            if(err || !book) return res.status(400).json( {error: `Can not get book with id ${id} !`})
            req.bookInfo = book;
            next();
        })
    
}

module.exports.getMoreBooks = (req, res) => {
    Book.find( {status: true}, null, {limit: 5, skip: req.body.skipNumber, sort: {created: -1}} )
        .select("name status  price saleOff created")
        .populate("cateId", "name")
        .exec( (err, books) => {
            if(!books || err) return res.status(400).json( {error: "Can not get all books"} )
            return res.status(200).json(books)
        })
}