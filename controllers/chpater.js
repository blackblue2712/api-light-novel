const Chapter = require('../models/Chapter');

module.exports.addChapter = (req, res) => {
    // Chapter.findOne( {name: req.body.name}, (err, result) => {
    //     if(result) {
    //         return res.status(400).json( {error: `The chapter ${req.body.name} is exists`} )
    //     }else {        
    //         const chapter = new Chapter(req.body);
        
    //         chapter.save( (err, chapter) => {
    //             if(err) {
    //                 return res.status(403).json("Error! Not Permission")
    //             }
    //             return res.status(400).json("Add new chapter successfully!");
    //         })
    //     }
    // })
    const chapter = new Chapter(req.body);
    chapter.save( (err, chapter) => {
        if(err) {
            return res.status(403).json("Error! Not Permission")
        }
        return res.status(400).json("Add new chapter successfully!");
    })
}