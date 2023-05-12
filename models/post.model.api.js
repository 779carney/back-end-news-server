const db = require('../db/connection');
const {postInsertCommentQuery}=require('./query-strings');
const {checkIfArticleExist}=require('../db/seeds/utils');

exports.postComment=(id, comment)=>{
    const articleIdNum = id.article_id;
    const commentBody= comment.body;
    const commentAuthor = comment.username;
   return checkIfArticleExist(articleIdNum).then(()=>{
        return db.query(postInsertCommentQuery, [commentBody, commentAuthor,articleIdNum]).then((result)=>{
            const commentObj=result.rows[0];
            return commentObj;
         })
    })
        
    
}