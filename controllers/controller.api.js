const {getTopics} = require('../models/model.api')

exports.fetchTopics =(req, res) =>{
getTopics().then((result)=>{
    res.status(200).send({topics:result})
})
}