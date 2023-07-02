const db = require('../db/connection');
const fs = require('fs/promises');


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
   return db.query( `SELECT * FROM articles WHERE article_id = $1;`, [articleIdNum]).then((result) => {
      const article = result.rows[0];
      if (!article) {
         return Promise.reject({ status: 404, msg: 'not found' });
      }
      return article;
   })
}



exports.getArticlesInDateOrder = ({topic}) => {
   let queryString =`SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id)::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id`
   const queryValues=[]
   if(topic){
      queryString += ` WHERE topic =$1`
      queryValues.push(topic)
   }
   queryString += ` GROUP BY articles.article_id ORDER BY articles.created_at DESC;`

   return db.query(queryString,queryValues).then((result) => {
      const articlesInDateOrder = result.rows;
      return articlesInDateOrder;
   })
}

exports.getCommentsById = (id) => {
   const articleIdNum = id.article_id;
   return db.query(`SELECT * FROM articles WHERE  article_id = $1 ORDER BY created_at ASC;`, [articleIdNum]).then((result)=>{
      if(result.rows.length ===0){
         return Promise.reject({status:404, msg: 'no article found'})
      }else return db.query(`SELECT * FROM comments WHERE  article_id = $1 ORDER BY created_at ASC;`, [articleIdNum])
   }).then((result)=>{
      const commentsArray = result.rows;
      return commentsArray
   })
}