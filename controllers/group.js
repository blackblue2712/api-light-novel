const GroupUser = require("../models/GroupUser");

module.exports.createGroupUser = (req, res) => {
    const groupName = req.body.name;
    GroupUser.findOne( {name: groupName}, (err, result) =>{
        if(result) {
            return res.json( {error: `The ${groupName} group has been exists!`} )
        } else {
            const group = new GroupUser(req.body);
            group.save( (err, obj) => {
                if(err) {
                    return res.status(400).json( {error: err} )
                } else {
                    return res.status(400).json( {message: `The ${groupName} group has created` })
                }
            })
        }
    })
}