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

module.exports.requestRelatedGroupId = async (req, res, next, id) => {
    await GroupUser.findById(id, (err, group) => {
        if(err || !group) return res.status(400).json( {message: `Can not get group with ${id} id!`});
        req.groupInfo = group;
        next();
    })
}

module.exports.getGroups = (req, res) => {
    GroupUser.find( {status: true}, (err, groups) => {
        if(!groups || err) return res.status(400).json( {message: "Can not get groups user"} )
        return res.status(200).json(groups);
    })
}

module.exports.getMoreGroups = (req, res) => {
    GroupUser.find( {status: true}, null, {limit: 5, skip: req.body.skipNumber, sort: {created: -1}} )
        .select("_id name description groupACP status")
        .exec( (err, groups) => {
            if(!groups || err) return res.status(400).json( {error: "Can not get all groups"} )
            return res.status(200).json(groups)
        })
}

module.exports.getSingleGroup = (req, res) => {
    return res.status(200).json(req.groupInfo);
}

module.exports.postUpdateGroup = (req, res) => {
    const { name, description, status, groupACP, _id } = req.body;
    
    GroupUser.findById( _id, (err, group) => {
        if(!group || err) {
            res.status(400).json( {message: "Group not found!"} )
        } else {
            group.name = name;
            group.description = description;
            group.status = status;
            group.groupACP = groupACP;
            group.save( (err, obj) => {
                if(err) return res.status(400).json( {message: err} )
                return res.status(200).json( {message: `Group '${name}' updated`} )
            })
        }
    })

}