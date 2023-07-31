const {deleteComment}=require('../models/delete.model.api')



exports.deleteCommentById=(req, res, next) =>{
    const commentId=req.params
    deleteComment(commentId).then((result)=>{
    
        res.status(204).send({"msg":"comment deleted", "commentDeleted":result})
    }).catch(next)
    }