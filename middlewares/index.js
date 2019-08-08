
module.exports.validateSignupUser = (req, res, next) => {
    req.check("username", "Username is required").notEmpty();
    req.check("email", "Email is required").notEmpty();
    req.check("email")
        .matches(/.+\@.+\..+/)
        .withMessage("Invalid email")
    
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .matches(/\d/)
        .withMessage("Password must has a number")
        .isLength( {min: 6} )
        .withMessage("Paasword must contain at least 6 characters")


    // Check for error
    const errors = req.validationErrors();
    // If error show the first one as they happen
    if(errors) {
        const firstError = errors[0].msg;
        return res.status(400).json({
            error: firstError
        })
    }

    // Process to the next middleware
    next();
}

module.exports.validateCreateGroupUser = (req, res, next) => {
    req.check("name", "Name of the group is required").notEmpty();
    req.check("groupACP", "Group access control is required").notEmpty();
    req.check("groupACP")
        .isBoolean()
        .withMessage("Group access control must be a boolean type")

    // Check for error
    const errors = req.validationErrors();
    // If error show the first one as they happen
    if(errors) {
        const firstError = errors[0].msg;
        return res.status(400).json({
            error: firstError
        })
    }

    // Process to the next middleware
    next();
}

module.exports.validateAddCategory = (req, res, next) => {
    req.check("name", "Name of the category is required").notEmpty();
    // Check for error
    const errors = req.validationErrors();
    // If error show the first one as they happen
    if(errors) {
        const firstError = errors[0].msg;
        return res.status(400).json({
            error: firstError
        })
    }
    // Process to the next middleware
    next();
}

module.exports.validateAddBook = (req, res, next) => {
    req.check("name", "Name of the book is required").notEmpty();
    req.check("price", "Price of the book is required").notEmpty();
    req.check("price", "Price must is number").isNumeric();
    req.check("cateId", "Category id of the book is required").notEmpty();
    // Check for error
    const errors = req.validationErrors();
    // If error show the first one as they happen
    if(errors) {
        const firstError = errors[0].msg;
        return res.status(400).json({
            error: firstError
        })
    }
    // Process to the next middleware
    next();
}

module.exports.validateAddChapter = (req, res, next) => {
    req.check("content", "Content of the chapter is required").notEmpty();
    req.check("chapterNumber", "Chapter number is required").notEmpty();
    req.check("bookId", "Book id of the chapter is required").notEmpty();
    // Check for error
    const errors = req.validationErrors();
    // If error show the first one as they happen
    if(errors) {
        const firstError = errors[0].msg;
        return res.status(400).json({
            error: firstError
        })
    }
    // Process to the next middleware
    next();
}