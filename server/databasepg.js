const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user : "postgres",
    port: 5432,
    password: "kri22tika",
    database: "visitor_info"
})

client.connect();

client.query('Select * from iprformpage2' , (err,res)=>{
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err.message);
    }
    client.end;
})