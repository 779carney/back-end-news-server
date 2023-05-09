const express = require("express");
const {fetchTopics}= require("./controllers/controller.api");

const app = express();
app.use(express.json());

app.get('/api/topics', fetchTopics);


app.get('/*', (req,res)=>{
res.status(404).send('not found')
})

module.exports = app;