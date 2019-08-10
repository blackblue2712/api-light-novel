const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bookSchema = new Schema({
    name: String,
    description: String,
    author: String,
    datePublished: Date,
    price: Number,
    special: {
        type: Boolean,
        default: false
    },
    saleOff: {
        type: Number,
        default: 0
    },
    picture: String,
    created: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    },
    modified: Date,
    modifiedBy: {
        type: ObjectId,
        ref: "User"
    },
    status: {
        type: Boolean,
        default: true
    },
    ordering: Number,
    cateId: [
        {
            type: ObjectId,
            ref: "Category"
        }
    ],
    views: {
        type: Number,
        default: 0
    }
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;