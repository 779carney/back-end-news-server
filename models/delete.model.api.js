const db = require('../db/connection');
const fs = require('fs/promises');
const { checkIfCommentExist } = require('../db/seeds/utils');


exports.deleteComment = (id) => {
   const commentId = id.comment_id;
   return checkIfCommentExist(commentId).then(() => {
      db.query('DELETE FROM comments WHERE comment_id =$1 RETURNING *;', [commentId]).then((result) => {

         return result.rows
      })
   })

}