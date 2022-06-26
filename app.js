const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const cors = require('cors')
const dotenv = require('dotenv');
const path = require('path');
const { Script } = require('vm');

// const path = require('path');
// const { query, response } = require('express');
const port = 3000;
const app = express();

app.set('view engine', 'ejs');
const viewPath = path.join(__dirname)
app.set('views',viewPath)

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
app.get('/usersignup',(req,res)=>{
    const data3 = fs.readFileSync('usersignup.html');
    res.send(data3.toString());

    
    var usersignup = req.query.usersignnup_name;
    var userpass = req.query.usersignup_pass;
    var values3 = [
        [usersignup, userpass]
    ]

    db.query("INSERT INTO user(email, password) VALUES ?", [values3], function(err,result){
        if (err) throw err;
        console.log('record inserted');
        res.redirect('/index.html')
    })

})

app.get('/createadmin.html',(req,res)=>{
    const data2 = fs.readFileSync('createadmin.html');
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
   
    var values=[
        [name,mob,address,email]
    ]
    var values2=[
        [p_name, description]
    ]
    
    db.query("INSERT INTO user(name, mob, address, email) VALUES ?", [values], function(err,result){
        if (err) throw err;
        console.log('record inserted');
        res.redirect('/')
    })
    db.query("INSERT INTO query(p_name, description) VALUES ?", [values2], function(err,result){
        if (err) throw err;
        console.log('record inserted');
    })
    
    db.query(`SELECT AUTO_INCREMENT-1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'issuenew' AND TABLE_NAME = 'user'`, function(err,result){
        var arr1=[]
        if (err) throw err;
        const results = Object.values(JSON.parse(JSON.stringify(result)));
        results.forEach((v) => arr1 = Object.values(v));

        var user_id = arr1[0];

        db.query(`update query, user set query.u_id = '${user_id}' where query.u_id IS NULL `, function(err,result){
            if (err) throw err;
            console.log('record updated');
            return;
        })
    })
})

app.get('/createadmin',(req,res,next)=>{
    var admin_name = req.query.adminname;
    var pass = req.query.admin_pass;
    
    var values=[
        [admin_name,pass]
    ]
    db.query("INSERT INTO admin(admin_id, pass) VALUES ?", [values], function(err,result){
        if (err) throw err;
        console.log('record inserted');
        res.redirect('/')
    })
})

app.get('/createengineer',(req,res,next)=>{
    var engineer_name = req.query.engineer_name;
    var engineer_email = req.query.engineer_email;
    var engineer_mobile = req.query.engineer_mob;
    
    var values=[
        [engineer_name,engineer_email,engineer_mobile]
    ]
    db.query("INSERT INTO engineer(name, email, mob) VALUES ?", [values], function(err,result){
        if (err) throw err;
        console.log('record inserted');
        res.redirect('/')
    })
})

app.use('/adminpanel', (req,res) => {

    // var e_info = []
    // db.query('select e_id, name, email from engineer WHERE status=0', function(err,result){
    //     if (err) throw err;
    //     const q = Object.values(JSON.parse(JSON.stringify(result)));
    //     q.forEach((v) => e_info.push(Object.values(v)));
    //     for (let i = 0; i < e_info.length; i++) {
    //     console.log(e_info[i].toString());  
    //     }res.render("adminpanel",{name1: e_info });
    // })

    var e_info = []
    db.query('select engineer.e_id, name, email, p_name, description, query.q_id, query.u_id from engineer, query where engineer.status = 0 and query.status = 0;', function(err,result){
        if (err) throw err;
        const q = Object.values(JSON.parse(JSON.stringify(result)));
        q.forEach((v) => e_info.push(Object.values(v)));
        for (let i = 0; i < e_info.length; i++) {
        // console.log(e_info[i].toString());  
        }res.render("adminpanel",{name1: e_info });

        // var q_id = req.query.q_id
        var e_id = req.query.e_id;
        
        db.query(`update query set query.e_id = '${e_id.split(',')[0]}', status = 1 where query.q_id = '${e_id.split(',')[5]}' `, function(err,result){
            
            if (err) throw err;
            console.log('record updated')
            res.redirect('/adminpanel.ejs');
            return;
        })
    })

    // var q_info = []
    // db.query('select p_name, description, q_id, u_id from query WHERE e_id IS NULL', function(err,result){
    //     if (err) throw err;
    //     const q = Object.values(JSON.parse(JSON.stringify(result)));
    //     q.forEach((v) => q_info.push(Object.values(v)));
    //     for (let i = 0; i < q_info.length; i++) {
    //     console.log(q_info[i].toString());  
    //     }res.render("adminpanel",{query1: q_info });
    // })
})

//useless
// app.get('/query',(req,res)=>{
//     db.query('select * from query',(err,results)=>{
//         if (err) throw err;
//         res.send(results);
//     }).catch(err =>{
//         console.log(err);
//     })
// })
app.listen(port, () => {
    console.log(`Server started on port 3000 ${port}`);
});
