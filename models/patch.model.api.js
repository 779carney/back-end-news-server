const db = require('../db/connection');
const { checkIfArticleExist } = require('../db/seeds/utils');
const {patchVotesQuery}= require('./query-strings')


exports.patchVotes=(id, votes)=>{
    const articleIdNum = id.article_id;
    const votesNum=votes.inc_votes;
    return checkIfArticleExist(articleIdNum).then(()=>{
   return  db.query(patchVotesQuery, [votesNum, articleIdNum]).then((result)=>{
        return result.rows[0];
        })
    })
}