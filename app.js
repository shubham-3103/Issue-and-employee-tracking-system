const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const cors = require('cors')
const dotenv = require('dotenv');
const path = require('path');
const { Script } = require('vm');
const { setTimeout } = require('timers/promises');
const { count } = require('console');
const flash = require('express-flash');


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

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname)));

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Database connected');
});  

app.get('/',(req,res)=>{
    const data = fs.readFileSync(path.join(__dirname+'/index.html'));
    res.send(data.toString());
})
app.get('/usersignup',(req,res)=>{
    const data3 = fs.readFileSync(path.join(__dirname+'/usersignup.html'));
    res.send(data3.toString());
    
    // var usersignup = req.query.usersignnup_name;
    // var userpass = req.query.usersignup_pass;
    // var values3 = [
    //     [usersignup, userpass]
    // ]
    // if(usersignup==undefined){
    //     console.log("add query")
    // }else{
    // db.query("INSERT INTO userlogin(login_id, password) VALUES ?", [values3], function(err,result){
    //     if (err) throw err;
    //     console.log('record inserted');
    //     res.redirect('/');
        
    // })
    // return
// }
})
app.get('/usersignuprun',(req,res)=>{
    var usersignup = req.query.email;
    var userpass = req.query.pass;
    var values3 = [
        [usersignup, userpass]
    ]
    
    // db.query(`select count(login_id) from userlogin where login_id='${usersignup}'`,function(err,result){
    //     const results = Object.values(JSON.parse(JSON.stringify(result))[0]);
    //     count = (results[0]);
    // })
    // console.log(count)
    db.query("INSERT INTO userlogin(login_id, password) VALUES ?", [values3], function(err,result){
        if (err){ 
            res.send('Email already exist, Please go back')
        }
        
        else{
        console.log('record inserted');
        res.redirect('/usersignin');}
    })
})

app.get('/usersignin',(req,res)=>{
    const data4 = fs.readFileSync('usersignin.html');
    res.send(data4.toString());
})
app.get('/usersigninrun',(req,res)=>{
    var signin_name = req.query.your_name;
    var signin_pass = req.query.your_pass;

    db.query(`select * from userlogin where login_id= '${signin_name}' and password = '${signin_pass}'` ,function(err,result){
        if(err) throw err;
        if(result.length>0){
            req.session;
            // req.session.signin_name = signin_name; 
            res.redirect('/createquerypage')
        }
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
app.get('/createquerypage',(req,res)=>{
    const data5 = fs.readFileSync('addquery.html');
    res.send(data5.toString());
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

app.get('/createadmin',(req,res)=>{
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

app.get('/adminsignin',(req,res)=>{
    const data6 = fs.readFileSync('adminpanelsignin.html');
    res.send(data6.toString());
})
app.use('/adminpanelrun', (req,res) => {
    var admin_email = req.query.admin_email;
    var admin_pass = req.query.admin_pass;
    db.query(`select * from admin where admin_id='${admin_email}' and pass='${admin_pass}'`, function(err,result){
        if(err) throw err;
        if(result.length>0){
            req.session;
            res.redirect('/adminpanel')
        }
          
    })   
})
//work of admin both given 2 function given below
app.use('/assignengineer', (req,res) => {
    var e_info = []
    db.query('select engineer.e_id, name, email, p_name, description, query.q_id, query.u_id from engineer, query where engineer.status = 0 and query.status = 0 and query.e_id IS NULL;', function(err,result){
        if (err) throw err;
        const q = Object.values(JSON.parse(JSON.stringify(result)));
        q.forEach((v) => e_info.push(Object.values(v)));
        for (let i = 0; i < e_info.length; i++) {
        }res.render("assignengineer",{name1: e_info });   
    })   
})

app.get('/adminpanel',(req,res)=>{
    // const data6 = fs.readFileSync('adminpanel.ejs');
    // res.send(data6.toString());
    // sessionStorage.setItem()
    db.query(`select COUNT(q_id) as remquery from ( SELECT q_id FROM query where status = 0) A UNION ALL select Count(e_id) FROM (select e_id FROM engineer) B UNION ALL SELECT COUNT(e_id) from (SELECT e_id FROM engineer WHERE engineer.status = 0) C UNION ALL select COUNT(u_id) FROM (SELECT u_id from user) D UNION ALL select p_name FROM (SELECT p_name from query where status = 0) E UNION ALL select description FROM (SELECT description from query where status = 0) F UNION ALL select q_id FROM (SELECT q_id from query where status = 0) G UNION ALL select e_id FROM (SELECT e_id from query where status = 0) H UNION ALL select u_id FROM (SELECT u_id from query where status = 0) I UNION ALL select start_date FROM (SELECT start_date from query where status = 0) J UNION ALL select end_date FROM (SELECT end_date from query where status = 0) K UNION ALL select status FROM (SELECT status from query where status = 0) L UNION ALL select feedback FROM (SELECT feedback from query where status = 0) M;`,function(err,result){
        
        if(err) throw err;
        console.log((result[4])==undefined)

        if((result[4])==undefined){
            res.render("adminpanel",{ adminsolve: { remquery: Object.values(result[0]), toteng: Object.values(result[1]), engfree: Object.values(result[2]), totuser: Object.values(result[3]), querypname: 0, querydesc: 0, queryqid: 0, queryeid: 0, queryuid: 0, querystart: 0, queryend: 0, querystatus: 0, queryfeed: 0 }});
        }
        else{
        res.render("adminpanel",{ adminsolve: { remquery: Object.values(result[0]), toteng: Object.values(result[1]), engfree: Object.values(result[2]), totuser: Object.values(result[3]), querypname: Object.values(result[4]), querydesc: Object.values(result[5]), queryqid: Object.values(result[6]), queryeid: Object.values(result[7]), queryuid: Object.values(result[8]), querystart: Object.values(result[9]), queryend: Object.values(result[10]), querystatus: Object.values(result[11]), queryfeed: Object.values(result[12]) }});    
        }
    })
    
    // db.query(`SELECT COUNT(e_id) from engineer`,function(err,result){
    //     if(err) throw err;
    //     var q = Object.values(Object.values(JSON.parse(JSON.stringify(result)))[0]);
    //     q=q[0]
    //     console.log(q)
    //     res.render("adminpanel",{totaleng: q });
    // })    
    
     
})

// app.use('/adminpanel', (req,res) => {
    
//     var e_info = []
//     db.query('select engineer.e_id, name, email, p_name, description, query.q_id, query.u_id from engineer, query where engineer.status = 0 and query.status = 0 and query.e_id IS NULL;', function(err,result){
//         if (err) throw err;
//         const q = Object.values(JSON.parse(JSON.stringify(result)));
//         q.forEach((v) => e_info.push(Object.values(v)));
//         for (let i = 0; i < e_info.length; i++) {
//         }res.render("adminpanel",{name1: e_info });   
//     })   
// })
app.use('/afteradminpanel', (req,res) => {
    var e_id = req.query.e_id;     
    console.log(e_id)   
        db.query(`update query, engineer set query.e_id = '${e_id.split(',')[0]}' where query.q_id = '${e_id.split(',')[5]}' `, function(err,result){
            if (err) throw err;
            console.log('record updated')
        })
        db.query(`update engineer set status = 1 where e_id ='${e_id.split(',')[0]}' `,function(err,result){
            if (err) throw err;
            console.log('status set to 1')
            return
        }) 
        res.redirect('/adminpanel')
})

app.get('/querysolve',(req,res)=>{
    //show in dropdown
    var q_solve = []
    db.query('select query.q_id, p_name, description, e_id from query where query.status = 0', function(err,result){
        if (err) throw err;
        const q = Object.values(JSON.parse(JSON.stringify(result)));
        q.forEach((v) => q_solve.push(Object.values(v)));
        res.render("querysolve",{qsolve: q_solve });
    })
})
app.get('/afterquerysolve',(req,res)=>{
    
    var query_enddate = req.query.end_date;
    var q_id = req.query.q_id;
    db.query(`update query set end_date = '${query_enddate}', status = 1 where q_id = ${q_id.split(',')[0]}`, function(err,result){
        if (err) throw err;
        console.log("date added")
        console.log(query_enddate)
    })
    var e_id
    db.query(`select e_id from query where q_id=${q_id.split(',')[0]}`,function(err,result){
        const q = Object.values(JSON.parse(JSON.stringify(result)));
        q.forEach((v) => e_id= (Object.values(v)));
        
        db.query(`update engineer set status = 0 where e_id = ${e_id}`, function(err,result){
        if (err) throw err;
        console.log("date added")
        console.log(query_enddate)
        })
    })
    res.redirect('/querysolve')
})

app.use('/logout', (req,res) => {
    res.destroy;
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Server started on port 3000 ${port}`);
});
