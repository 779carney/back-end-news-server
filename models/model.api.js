const db = require('../db/connection');
const data = require('../db/data/test-data')


exports.getTopics = () =>{
return db.query(`SELECT * FROM topics;`).then((result)=>{
   return result.rows;
})
}