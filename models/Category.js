const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId; 

const categorySchema = new Schema({
  name:  String,
  picture: String,
  created: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: ObjectId,
    ref: "User"
  },
  modified: {
    type: Date,
  },
  status: {
    type: Boolean,
    default: true
},
  ordering: Number,
  description: String
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;