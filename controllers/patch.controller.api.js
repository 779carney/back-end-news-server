const {patchVotes}= require('../models/patch.model.api');


exports.updateVotes=(req,res,next)=>{
  const articleId=req.params;
  const votesObj=req.body
patchVotes(articleId, votesObj).then((result)=>{
  res.status(200).send({article:result})
}).catch(next)
}