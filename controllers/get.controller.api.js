const {getTopics, getApi, getByArticleId, getArticlesInDateOrder, getCommentsById, getUsers} = require('../models/get.model.api')

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
    const articleIdQuery = req.params;
    getByArticleId(articleIdQuery).then((result)=>{
res.status(200).send({article: result})
    }).catch(next);
}

exports.fetchArticles=(req,res, next)=>{
    const query=req.query
    getArticlesInDateOrder(query).then((result)=>{
        res.status(200).send({articles: result})
    }).catch(next)
}

exports.fetchCommentsById=(req,res, next)=>{
    const articleIdQuery = req.params
    getCommentsById(articleIdQuery).then((result)=>{
       res.status(200).send({comments: result})
    }).catch(next)
}

exports.fetchUsers=(req,res, next)=>{
    
    getUsers().then((result)=>{
       res.status(200).send({users: result})
    }).catch(next)
}