const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
// const { response } = require('express');
// const { request } = require('https');
const port = 3000;
const app = express();

// Crete Connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : "",
    database : 'issuenew'
  });

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Database connected');
});  
// app.use(bodyParser.urlencoded({ extended: true })); 
// var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/',(req,res)=>{
    const data = fs.readFileSync('index.html');
    res.send(data.toString());
    
    console.log(req.query.username);
})

// app.get('/example',(req,res)=>{
//     // var temp = JSON.parse(JSON.stringify(req.query));
//     console.log(req.query.username);
//     res.send(req.query.username);
//     // console.log(`name is ${req.body.username}`)
//     // res.send(request.body);
//     // console.log(req.body)
//     // res.render('example', {qs:req.query});
//     // var data = req.query.username;
//     // console.log("name:"+data);
//     // res.render('handleForm');
// })



app.get('/createquery',(req,res,next)=>{
    // name1=req.body.fetch_query()
    var name = req.query.username;
    var mob = req.query.mobile;
    var address = req.query.address;
    var email = req.query.email;
    var p_name = req.query.p_name;
    var description = req.query.description;
    // let sql1 = `INSERT INTO user(name, mob, address, email) values ("${name}","${mob}","${address}","${email}")`;
    var sql = "INSERT INTO user(name, mob, address, email) VALUES ?"
    var sql2 = "INSERT INTO query(p_name, description) VALUES ?"
    var values=[
        [name,mob,address,email]
    ]
    var values2=[
        [p_name, description]
    ]
    db.query(sql, [values], function(err,result){
        if (err) throw err;
        console.log('record inserted');
        res.redirect('/')
    })
    db.query(sql2, [values2], function(err,result){
        if (err) throw err;
        console.log('record inserted');
        res.redirect('/')
    })
    // let sql2 = 'insert into query(p_name, description) values (p_name, description)';
    // let query2 = db.query(sql2, post, (err,result)=>{
    //     if(err) throw err;
    //     console.log(result);
    //     res.send("added succesfully2")
    // })
})

app.get('/createadmin',(req,res,next)=>{
    // name1=req.body.fetch_query()
    var admin_name = req.query.admin_id;
    var pass = req.query.pass;
    
    // let sql1 = `INSERT INTO user(name, mob, address, email) values ("${name}","${mob}","${address}","${email}")`;
    var sql3 = "INSERT INTO admin(admin_id, pass) VALUES ?"
    var values=[
        [admin_name,pass]
    ]
    db.query(sql3, [values], function(err,result){
        if (err) throw err;
        console.log('record inserted');
        res.redirect('/')
    })
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