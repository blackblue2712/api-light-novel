const Category = require('../models/Category');

module.exports.addCategory = (req, res) => {
    Category.findOne( {name: req.body.name}, (err, result) => {
        if(result) {
            return res.status(400).json( {error: `The category ${req.body.name} is exists`} )
        }else {
            const cateData = {
                name: req.body.name,
                status: true,
                ordering: req.body.ordering,
                description: req.body.description || ""
            }
        
            const cate = new Category(cateData);
        
            cate.save( (err, cate) => {
                if(err) {
                    return res.status(403).json("Error! Not Permission")
                }
                return res.status(400).json("Add new category successfully!");
            })
        }
    })
}