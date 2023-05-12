const {postComment} = require('../models/post.model.api');




exports.sendComment=(req, res,next)=>{
  const articleId = req.params;
const comment=req.body;
  postComment(articleId, comment)
  .then((result)=>{
    res.status(201).send({comment: result})
  }).catch(next)
}