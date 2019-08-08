const mongoose = require("mongoose");
const uuidv1 = require('uuidv1');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    username: String,
    email: String,
    fullname: String,
    hashed_password: String,
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    },
    modified: {
        type: Date
    },
    picture: String,
    registerIP: String,
    status: {
        type: Boolean,
        default: true
    },
    groupId: {
        type: ObjectId,
        ref: "GroupUser",
        default: "5d4a5036ff544122f0f6f2c9"
    },
    activeLink: String
})

userSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password;
    })

userSchema.methods = {
    authenticate: function(textPlain) {
        return this.encryptPassword(textPlain) === this.hashed_password;
    },

    encryptPassword: function(password) {
        try {
            return crypto.createHmac('sha256', this.salt)
                   .update(password)
                   .digest('hex');
        } catch(err) {
            return "error hashed password";
        }
    }
}


const User = mongoose.model("User", userSchema);
module.exports = User;