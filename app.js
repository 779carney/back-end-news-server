const express = require("express");
const {fetchTopics, fetchApi} = require("./controllers/controller.api");

const app = express();
app.use(express.json());

app.get('/api/topics', fetchTopics);

app.get('/api/', fetchApi);

app.get('/*', (req,res)=>{
res.status(404).send({msg:'not found'})
})

module.exports = app;