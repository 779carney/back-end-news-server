const db = require('../db/connection');
const {checkIfArticleExist}=require('../db/seeds/utils');

exports.postComment=(id, comment)=>{
    const articleIdNum = id.article_id;
    const commentBody= comment.body;
    const commentAuthor = comment.username;
   return checkIfArticleExist(articleIdNum).then(()=>{
        return db.query(`INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) returning *`, [ commentBody,commentAuthor,articleIdNum]).then((result)=>{
            const commentObj=result.rows[0];
            return commentObj;
         })
    })
        
    
}