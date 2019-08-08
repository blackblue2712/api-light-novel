const User = require("../models/User");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();

module.exports.requestRelatedUserId = async (req, res, next, id) => {
    await User.findById(id)
        .select("_id username email fullname")
        .populate("groupId", "name groupACP description")
        .exec( (err, result) => {
            if(err || !result) {
                return res.status(400).json( {error: `Can not get user with this id ${id}` } )
            }
            req.userProfile = result;
            next();
        })
}

module.exports.hasAuthorization = (req, res, next) => {
    const authorized = req.payload && req.userProfile && req.userProfile._id == req.payload._id;
    if(!authorized) return res.status(403).json( {error: "You don't authorized to perform this action!"} )
    next();
}

module,exports.isAdmin = (req, res, next) => {
    // console.log(req.userProfile, "==========", req.payload)
    if(req.userProfile && req.payload && req.userProfile._id == req.payload._id && req.userProfile.groupId.groupACP) {
        next();
    }else {
        return res.status(403).json( {error: "You don't have permission to perform this action!"} );
    }
}

module.exports.postSignup = (req, res) => {
    
    User.findOne( {username: req.body.username}, (err, result) => {
        if(result) {
            res.status(400).json( {error: "Username has been exists!"} )
        } else {
            const user = new User(req.body);
            user.save( (err, obj) => {
                if(err) return res.status(400).json( {error: err} )
                return res.status(200).json( {message: "Signup successfully!"} )
            })
        }
    })
}

module.exports.postSignin = async (req, res) => {
    const { password, username } = req.body;

    await User.findOne( {username}, (err, user) =>{
        if(err || !user) {
            return res.json( {error: "User with that username does not exists"} )
        }else {
            if(!user.authenticate(password)) {
                return res.json( {error: "Password do not match!"} )
            }

            const token = jwt.sign( {_id: user._id}, process.env.JWT_SECRET );
            res.cookie('t', token, {"expire": new Date() + 3600} );
            const { _id, username, email, fullname } = user;
            return res.json( {token, user: { _id, username, email, fullname }} );
        }
    })
}

module.exports.requireSignin = expressJwt({
    // if the token is valid, express jwt appends the verified users id
	// in an auth key to the request object
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
})


module.exports.postSignout = (req, res) => {
    res.clearCookie('t');
    req.userProfile = undefined;
    req.payload = undefined;
    return res.json( {message: 'Signout success'} )
}