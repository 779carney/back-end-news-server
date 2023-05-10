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