const db = require('../db/connection');
const data = require('../db/data/test-data');
const fs = require('fs/promises');
const { getArticlesInDateOrderQuery, getCommentsByIdQuery, getArticleByIdQuery } = require('./query-strings');


exports.getTopics = () => {
   return db.query(`SELECT * FROM topics;`).then((result) => {
      return result.rows;
   })
}


exports.getApi = () => {
   return fs.readFile('./endpoints.json', 'utf-8').then((data) => {
      const parsedData = JSON.parse(data);
      return parsedData;
   })
}

exports.getByArticleId = (id) => {
   const articleIdNum = id.article_id;
   return db.query(getArticleByIdQuery, [articleIdNum]).then((result) => {
      const article = result.rows[0];
      if (!article) {
         return Promise.reject({ status: 404, msg: 'not found' });
      }
      return article;
   })
}



exports.getArticlesInDateOrder = () => {
   return db.query(getArticlesInDateOrderQuery).then((result) => {
      const articlesInDateOrder = result.rows;
      return articlesInDateOrder;
   })
}

exports.getCommentsById = (id) => {
   const articleIdNum = id.article_id;
   return db.query(getArticleByIdQuery, [articleIdNum]).then((result)=>{
      if(result.rows.length ===0){
         return Promise.reject({status:404, msg: 'no article found'})
      }else return db.query(getCommentsByIdQuery, [articleIdNum])
   }).then((result)=>{
      const commentsArray = result.rows;
      return commentsArray
   })
}