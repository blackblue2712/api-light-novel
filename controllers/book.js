
const Book = require('../models/Book');
const formidable = require("formidable");
const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});
  

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
    Book.find( {status: true}, null, {limit: 10, skip: 0, sort: {created: -1}} )
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
    Book.find( {status: true}, null, {limit: 10, skip: req.body.skipNumber, sort: {created: -1}} )
        .select("name status  price saleOff created")
        .populate("cateId", "name")
        .exec( (err, books) => {
            if(!books || err) return res.status(400).json( {error: "Can not get all books"} )
            return res.status(200).json(books)
        })
}

module.exports.postUpdateBook = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
	form.parse(req, async (err, fields, files) => {
		if(err) {
			return res.status(400).json( {error: "Photo could not be uploaded file"} );
		}
		// save book
        let book = req.bookInfo;
        let { name, description, price, saleOff, author, datePublished, status, special, cateId } = fields;
        book.name = name;
        book.description = description;
        book.price = price;
        book.saleOff = saleOff;
        book.author = author;
        book.datePublished= datePublished;
        book.status = status;
        book.special = special;
        book.cateId = cateId;

        if(files.photo) {
            if(book.photo) {
                const fileName = book.photo.split(".")[post.photo.split(".").length - 2];
                cloudinary.v2.uploader.destroy(fileName);
            }
            await cloudinary.v2.uploader.upload(files.photo.path, function(error, result) {
                book.photo = result.secure_url;
                }).then( () => {
                    book.save( (err, result) => {
                        if(err) {
                            return res.status(403).json( {message: "Error! Not Permission"} )
                        }
                        return res.status(200).json( {message: `Book ${book.name} updated!`} );
                    })
                })
        }

        book.save( (err, result) => {
            if(err) {
                return res.status(403).json( {message: "Error! Not Permission"} )
            }
            return res.status(200).json( {message: `Book ${name} updated!`} );
        })
    });
}
