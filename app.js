const express = require('express');
const mysql = require('mysql');
const fs = require('fs');

// const path = require('path');
// const { query, response } = require('express');
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

//useless
app.get('/query',(req,res)=>{
    db.query('select * from query',(err,results)=>{
        if (err) throw err;
        res.send(results);
    }).catch(err =>{
        console.log(err);
    })
})
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/adminpanel',function(req,res){

    // db.query('select p_name, description from query WHERE u_id=71',(err,result)=>{
    //     if(err) throw err;
    //     content1 = (Object.values(Object.values(JSON.parse(JSON.stringify(result)))[i])).toString()
    //     console.log(content1)
    // })
    db.query('select p_name, description from query WHERE u_id=71',(err,result)=>{
        if(err) throw err;
        content1 = (JSON.stringify(result)).split(',')
        console.log(content1)
        res.redirect('/usersignup')
    })
    
    // db.query('',(err,result)=>{
    //     var end_date = req.query.end_date;
    //     var values=[
    //         [end_date]
    //     ]

    //     if (err) throw err;
    //     res.send(fs.readFileSync('adminpanel.html').toString());
    //     // console.log(Object.values(JSON.parse(JSON.stringify(result))))
    //     var namearr = [];
    //     for( let i=0;i<(Object.values(JSON.parse(JSON.stringify(result))).length);i++){
    //         content = (Object.values(Object.values(JSON.parse(JSON.stringify(result)))[i])).toString()
    //         namearr.push(content);           
    //     }
    //     console.log(namearr)
    //     res.render(__dirname + '/adminpanel.html',{questions:namearr});
    // })
})


// app.get('/adminpanel',function(req,res){
    
//     db.query('SELECT e_id, name from engineer where status = 0',(err,result)=>{
//         if (err) throw err;
//         // res.send(fs.readFileSync('adminpanel.html').toString());
//         // console.log(Object.values(JSON.parse(JSON.stringify(result))))
//         var namearr = [];
//         for( let i=0;i<(Object.values(JSON.parse(JSON.stringify(result))).length);i++){
//             content = (Object.values(Object.values(JSON.parse(JSON.stringify(result)))[i])).toString()
//             namearr.push(content);     
//         }
//         // fs.writeFile('admin panel.html', namearr.toString(),err => {
//             //             if(err) throw err
//             //         })
//     })
// })

app.listen(port, () => {
    console.log(`Server started on port 3000 ${port}`);
});