const Chapter = require('../models/Chapter');

module.exports.addChapter = async (req, res) => {
    console.log("add chapter",req.body)
    await Promise.all(
        req.body.chapters.map( (ct, index) => {
            const chapter = new Chapter();
            chapter.content = ct[0].content;
            chapter.chapterNumber = req.body.titles[index];
            chapter.bookId = req.body.bookId;
            chapter.save( (err, chapter) => {
                if(err) {
                    return res.status(403).json( {message: "Error occur when save chapter, please try again!"} )
                }
            }) 
        })
    )
    
    return res.status(200).json( {message:"Add new chapter successfully!"} );
}

module.exports.requestRelatedBookIdToGetChapters = (req, res, next, id) => {
    Chapter.find( {status: true, bookId: id} )
        .select("_id chapterNumber")
        .exec( (err, chapters) => {
            if(err) return res.status(400).json( {message: "Can not get chapters"} )
            req.chapters = chapters;
            next();
        })
    
}

module.exports.getChapters = (req, res) => {
    console.log(req.chapters);
    // return res.status(200).json( {message: `${chapters.length} chapters loaded`, chapters: req.chapters} )
    return res.status(200).json( req.chapters )
}

module.exports.requestRelatedChapterId = (req, res, next, id) => {
    Chapter.findById(id)
        .select("_id chapterNumber content")
        .exec( (err, chapter) => {
            if(err) return res.status(400).json( {message: "Can not get chapter"} )
            req.chapter = chapter;
            next();
        })
}

module.exports.getSingleChapter = (req, res) => {
    return res.status(200).json( req.chapter )
}