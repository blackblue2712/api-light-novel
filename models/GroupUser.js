const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const groupSchema = new Schema({
    name: String,
    groupACP: Boolean,
    created: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    modified: {
        type: Date,
    },
    modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: Boolean,
        default: true
    },
    description: String
})

const GroupUser = mongoose.model("GroupUser", groupSchema);
module.exports = GroupUser;