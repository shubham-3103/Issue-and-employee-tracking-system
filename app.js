const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
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

app.get('/',(req,res)=>{
    const data = fs.readFileSync('index.html');
    res.send(data.toString());
})

app.get('/admin.html',(req,res)=>{
    const data2 = fs.readFileSync('admin.html');
    res.send(data2.toString());
})

app.get('/engineer.html',(req,res)=>{
    const data4 = fs.readFileSync('engineer.html');
    res.send(data4.toString());
})

// Go to user as well as query
app.get('/createquery',(req,res,next)=>{
    var name = req.query.username;
    var mob = req.query.mobile;
    var address = req.query.address;
    var email = req.query.email;
    var p_name = req.query.p_name;
    var description = req.query.description;

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
    })
    
    db.query(`SELECT AUTO_INCREMENT-1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'issuenew' AND TABLE_NAME = 'user'`, function(err,result){
        var arr1=[]
        if (err) throw err;
        const results = Object.values(JSON.parse(JSON.stringify(result)));
        results.forEach((v) => arr1 = Object.values(v));

        var user_id = arr1[0];
        var sql5 = `update query, user set query.u_id = '${user_id}' where query.u_id IS NULL `
        db.query(sql5, function(err,result){
            if (err) throw err;
            console.log('record updated');
            return;
        })
    })
})

app.get('/createadmin',(req,res,next)=>{
    var admin_name = req.query.adminname;
    var pass = req.query.admin_pass;
    
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

app.get('/createengineer',(req,res,next)=>{
    var engineer_name = req.query.engineer_name;
    var engineer_email = req.query.engineer_email;
    var engineer_mobile = req.query.engineer_mob;
    
    var sql4 = "INSERT INTO engineer(name, email, mob) VALUES ?"
    var values=[
        [engineer_name,engineer_email,engineer_mobile]
    ]
    db.query(sql4, [values], function(err,result){
        if (err) throw err;
        console.log('record inserted');
        res.redirect('/')
    })
})

app.get('/query',(req,res)=>{
    let sql = 'select * from query';
    db.query(sql,(err,results)=>{
        if (err) throw err;
        res.send(results);
    })
})


app.listen(port, () => {
    console.log(`Server started on port 3000 ${port}`);
});