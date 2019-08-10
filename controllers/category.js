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
                    return res.status(403).json( {error: "Error! Not Permission"} )
                }
                return res.status(200).json( {message: "Add new category successfully!"} );
            })
        }
    })
}

module.exports.getCategories = (req, res) => {
    // Category.find({status: true}, (err, categories) => {
    //     if(err) return res.status(400).json( {error: "Can not get categories"} )
    //     return res.status(200).json(categories)
    // })

    Category.find( {status: true}, null, { limit: 5, skip: 0},  (err, categories) => {
        if(err) return res.status(400).json( {error: "Can not get categories"} )
        return res.status(200).json(categories)
    })

}

module.exports.getAllCategories = (req, res) => {
    // Category.find({status: true}, (err, categories) => {
    //     if(err) return res.status(400).json( {error: "Can not get categories"} )
    //     return res.status(200).json(categories)
    // })

    Category.find( {status: true}, null,  (err, categories) => {
        if(err) return res.status(400).json( {error: "Can not get categories"} )
        return res.status(200).json(categories)
    })

}


module.exports.getMoreCategories = async (req, res) => {
    await Category.find( {status: true}, null, { limit: 5, skip: req.body.skipNumber},  (err, categories) => {
        if(err) return res.status(400).json( {error: "Can not get categories"} )
        return res.status(200).json(categories)
    })
}