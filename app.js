const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const port = 3000;
const app = express();

// Crete Connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'issuenew'
  });

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Database connected');
});  

app.get('/',(req,res)=>{
    const data = fs.readFileSync('index.html');
    res.send(data.toString());
})

app.get('/createquery',(req,res)=>{
    let sql1 = 'insert into query(name, ) '
})

app.get('/query',(req,res)=>{
    let sql = 'select * from query';
    let fetch_query = db.query(sql,(err,results)=>{
        if (err) throw err;
        // console.log(results);
        res.send(results);
    })
})

app.listen(port, () => {
    console.log(`Server started on port 3000 ${port}`);
});