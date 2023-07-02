const db = require('../db/connection');
const { checkIfArticleExist } = require('../db/seeds/utils');


exports.patchVotes=(id, votes)=>{
    const articleIdNum = id.article_id;
    const votesNum=votes.inc_votes;
    return checkIfArticleExist(articleIdNum).then(()=>{
   return  db.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 returning *;`, [votesNum, articleIdNum]).then((result)=>{
        return result.rows[0];
        })
    })
}