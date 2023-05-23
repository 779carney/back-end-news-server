const app = require('./app');

const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));



// app.listen(9090, (err)=>{
//     if(err){
//         console.log({'you have an error': err});
//     }
//     else 'listening on port 9090'
// })