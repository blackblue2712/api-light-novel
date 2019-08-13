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

module.exports.getUsers =  (req, res) => {
    User.find( {status: true}, null, {limit: 5, skip: 0, sort: {created: -1}} )
        .select("_id username email fullname status")
        .populate("groupId", "_id name groupACP description")
        .exec( (err, users) => {
            if(!users || err) return res.status(400).json( {error: "Can not get all users"} )
            return res.status(200).json(users)
        })
}


module.exports.getMoreUsers = (req, res) => {
    User.find( {status: true}, null, {limit: 5, skip: req.body.skipNumber, sort: {created: -1}} )
        .select("_id username email fullname status")
        .populate("groupId", "_id name groupACP description")
        .exec( (err, users) => {
            if(!users || err) return res.status(400).json( {error: "Can not get all users"} )
            return res.status(200).json(users)
        })
}

module.exports.getSingleUser = (req, res) => {
    return res.status(200).json(req.userProfile);
}

module.exports.postUpdateUser = (req, res) => {
    const { username, email, fullname, status, groupId, _id } = req.body;
    
    User.findById( _id, (err, user) => {
        if(!user || err) {
            res.status(400).json( {message: "User not found!"} )
        } else {
            user.username = username;
            user.email = email;
            user.fullname = fullname;
            user.status = status;
            user.groupId = groupId;
            user.save( (err, obj) => {
                if(err) return res.status(400).json( {message: err} )
                return res.status(200).json( {message: "User updated"} )
            })
        }
    })

}