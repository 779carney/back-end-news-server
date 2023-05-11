const db = require('../db/connection');
const data = require('../db/data/test-data');
const fs =require('fs/promises');

exports.getTopics = () =>{
return db.query(`SELECT * FROM topics;`).then((result)=>{
   return result.rows;
})
}


exports.getApi = ()=>{
   return fs.readFile('./endpoints.json', 'utf-8').then((data)=>{
     const parsedData= JSON.parse(data);
     return parsedData;
   })
}

exports.getByArticleId=(id)=>{
  const articleIdNum = id.article_id;
   return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [articleIdNum]).then((result)=>{
   const article = result.rows[0];
   if(!article){
      return Promise.reject({status: 404, msg:'not found'});
   }
   return article;
   })
}