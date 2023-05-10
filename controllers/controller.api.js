const {getTopics, getApi} = require('../models/model.api')

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