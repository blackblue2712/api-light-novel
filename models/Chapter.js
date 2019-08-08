const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const chapterChema = new Schema({ 
    content: String,
    status: {
        type: Boolean,
        default: true
    },
    ordering: Number,
    chapterNumber: Number,
    bookId: {
        type: ObjectId,
        ref: "Book"
    }
})

const Chapter = mongoose.model("Chapter", chapterChema);
module.exports = Chapter;