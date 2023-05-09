const app = require('./app');

app.listen(9090, (err)=>{
    if(err){
        console.log({'you have an error': err});
    }
    else 'listening on port 9090'
})