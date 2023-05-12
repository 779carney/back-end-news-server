const express = require("express");
const {fetchTopics, fetchApi, fetchArticleId, fetchArticles, fetchCommentsById} = require("./controllers/get.controller.api");
const {sendComment}= require('./controllers/post.controller.api');
const app = express();
app.use(express.json());

app.get('/api/topics', fetchTopics);

app.get('/api/', fetchApi);

app.get('/api/articles/:article_id', fetchArticleId);

app.get('/api/articles', fetchArticles);

app.get('/api/articles/:article_id/comments', fetchCommentsById,);

app.post('/api/articles/:article_id/comments', sendComment)

app.get('/*', (req,res)=>{
  res.status(404).send({msg:'not found'})
  })

  app.use((err, req, res, next) => {
    if (err.status) {
      res.status(err.status).send({ msg: err.msg });
    } else next(err);
  });
  
  app.use((err, req, res, next) => {
    console.log(err);
    if (err.code === '22P02' || err.code === '23502') {
      res.status(400).send({ msg: 'invalid request' });
    } else if(err.code === '23503'){
      res.status(404).send({msg:'user not found'})
    }else next(err);
  });

  
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: 'Internal Server Error' });
  });

module.exports = app;