const express = require("express");
const {fetchTopics, fetchApi, fetchArticleId, fetchArticles} = require("./controllers/controller.api");

const app = express();
app.use(express.json());

app.get('/api/topics', fetchTopics);

app.get('/api/', fetchApi);

app.get('/api/articles/:article_id', fetchArticleId)

app.get('/api/articles', fetchArticles)


app.get('/*', (req,res)=>{
  res.status(404).send({msg:'not found'})
  })

app.use((err, req, res, next) => {
    if (err.status) {
      res.status(err.status).send({msg: err.msg });
    } else if( err.code === '22P02'){
        res.status(400).send({msg:'invalid request'})
    }
    else{
      console.log(err);
        res.status(500).send({msg: 'internal server error'})
    }
  })

module.exports = app;