const Comments = require('../../models/Comments.js');
const Connectis = require('../../models/Connectis.js');

exports.addComment = async (req, res, next) => {
    //Get the comment
    const { comment } = req.body;

    //Create comment on the DB

    await Comments.create({
        message: comment,
        userId: req.user.id,
        connectiId: req.params.id
    });

    //Redirect

    res.redirect('back');
    next();
}

//Delete a comment from the DB
exports.deleteComment = async (req,res,next) => {
    //Grab the comment's id
    const {commentId} = req.body;
    
    //Query the comment
    const comment = await Comments.findOne({where: {id: commentId}});

    //Verify if the comment exists
    if(!comment){
        res.status(404).send('Invalid operation');
        return next();
    }

    //Get the connecti asociated with it
    const connecti = await Connectis.findOne({where: {id: comment.connectiId}});

    //Verify if the comment's creator or the organizer of the connecti is the one who wants to delete it
    if(comment.userId === req.user?.id || connecti.userId === req.user?.id){
        await Comments.destroy({where: {id: comment.id}});
        res.status(200).send('The comment was deleted successfully');
        return next();
    } else {
        res.status(403).send('Invalid operation');
        return next();
    }
}