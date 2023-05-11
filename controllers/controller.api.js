const {getTopics, getApi, getByArticleId} = require('../models/model.api')

exports.fetchTopics =(req, res) =>{
getTopics().then((result)=>{
    res.status(200).send({topics:result})
})
}


exports.fetchApi =(req,res)=>{
    getApi().then((result)=>{
      res.status(200).send({'endPointData':result})
    })
}

exports.fetchArticleId=(req,res,next)=>{
    const articleIdQuery = req.params
    getByArticleId(articleIdQuery).then((result)=>{
res.status(200).send({article: result})
    }).catch(next);
}