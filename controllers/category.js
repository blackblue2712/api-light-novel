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

module.exports.requestRelatedCategoryId = async (req, res, next, id) => {
    await Category.findById(id, (err, category) => {
        if(err || !category) return res.status(400).json( {error: `Can not get category with id ${id}`} );
        req.cateInfo = category;
        next();
    })
}

module.exports.getSingleCategory = (req, res) => {
    return res.status(200).json(req.cateInfo);
}

module.exports.postUpdateCategory = (req, res) => {
    let cate = req.cateInfo;
    const { name, description, status } = req.body;
    cate.name = name;
    cate.description = description;
    cate.status = status;

    cate.save( (err, result) => {
        if(err) return res.status(400).json( {message: `Can not update category ${name}`} );
        return res.status(200).json( {message: `Category ${name} was updated`} );       
    })
}

module.exports.deleteCategory = (req, res) => {
    let category = req.cateInfo;
    category.delete( (err,  result) => {
        if(err) return res.status(400).json( {message: `Can not delete ${category.name}`} );
        return res.status(200).json( {message: `Category ${category.name} was deleted`} );
    })
}