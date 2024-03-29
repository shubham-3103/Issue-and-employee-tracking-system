const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
var nodemailer = require('nodemailer');
session = require('express-session')
const port = 3000;
const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
  app.use(session({ resave: true ,secret: 'sus' , saveUninitialized: true}));
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
})
app.get('/usersignuprun',(req,res)=>{
    var usersignup = req.query.email;
    var userpass = req.query.pass;
    var values3 = [
        [usersignup, userpass]
    ]
    req.session;
    req.session.email=usersignup;
    db.query("INSERT INTO userlogin(login_id, password) VALUES ?", [values3], function(err,result){
        if (err){ 
            res.send(fs.readFileSync('useralreadyexist.html').toString())
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
    req.session;
    req.session.email=signin_name;
    db.query(`select * from userlogin where login_id= '${signin_name}' and password = '${signin_pass}'` ,function(err,result){
        if(err) throw err;
        if(result.length>0){
            req.session;
            // req.session.signin_name = signin_name; 
            res.redirect('/createquerypage')
        }
        else{
            res.send(fs.readFileSync('usernotfound.html').toString());
        }
    })
    
})
app.get('/engineersignin',(req,res)=>{
    const data5 = fs.readFileSync('engineersignin.html');
    res.send(data5.toString());
})
app.get('/engineersigninrun',(req,res)=>{
    var signin_name = req.query.your_name;
    var signin_pass = req.query.your_pass;
    req.session;
    req.session.email=signin_name;
    db.query(`select * from engineer where email= '${signin_name}' and password = '${signin_pass}'` ,function(err,result){
        if(err) throw err;
        if(result.length>0){
            req.session;
            res.redirect('/engineerpanel')
        }
        else{
            res.send(fs.readFileSync('usernotfound.html').toString());
        }
    })
    
})
app.get('/engineerpanel',(req,res)=>{
    email=(req.session.email)
    db.query(`select e_id from engineer where email='${email}'`,function(err,result){
        if(err) throw err;
        var e_id = (Object.values((Object.values(JSON.parse(JSON.stringify(result))))[0]))

        db.query(`select q_id, p_name, description from query where e_id=${e_id} and resolution is NULL`,function(err,results){
            var q_id1=[];
            const q = Object.values(JSON.parse(JSON.stringify(results)));
            q.forEach((v) => q_id1.push(Object.values(v)));

            res.render("engineerpanel",{query1:q_id1})
        })
    })
    console.log(email)
})
app.get('/afterengineerpanel',function(req,res){
    var q_id_get = (req.query.q_id.split(',')[0])
    var getreso = (req.query.reso);
    db.query(`update query set resolution = '${getreso}' where q_id = ${q_id_get}`,function(err,result){
        if(err) throw err
        console.log("Resolution has been updated")
        res.redirect('/engineerpanel')
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
    var orgname = req.query.orgname;
    var deptname = req.query.deptname;
    var email = req.session.email;
    var p_name = req.query.p_name;
    var description = req.query.description;
    console.log(req.session.email);
    if(email==undefined){
        res.status(400).send("Please Go Back To Login Page And Again Sign In And Do Not Refresh The Pages.")
    }else{
    var values=[
        [name,mob,orgname,deptname,email]
    ]
    var values2=[
        [p_name, description]
    ]
    console.log(req.session.email)
    
    db.query("INSERT INTO user(name, mob, orgname, deptname, email) VALUES ?", [values], function(err,result){
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
    })}
    res.status(200)
})

app.get('/engineerdetails',(req,res)=>{
    var email = (req.session.email);
    db.query(`SELECT user.name as username, user.mob as usermob FROM user where user.u_id IN (select query.u_id from query where query.e_id = (select engineer.e_id from engineer where engineer.email='${email}') and query.status = 0)`,function(err,result){
        if(err) throw err;
        var detail=[];
        const q = Object.values(JSON.parse(JSON.stringify(result)));
        q.forEach((v) => detail.push(Object.values(v)));
        console.log(detail[0])

        if(detail[0]==undefined){
            res.render("engineerdetails",{engdet:0})
        }else{
            res.render("engineerdetails",{engdet:detail[0]})
        } 
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
    var engineer_pass = req.query.engineer_pass;
    
    var values=[
        [engineer_name,engineer_email,engineer_mobile,engineer_pass]
    ]
    db.query("INSERT INTO engineer(name, email, mob, password) VALUES ?", [values], function(err,result){
        if (err) throw err;
        console.log('record inserted');
        res.redirect('/adminpanel')
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
            req.session.eid=admin_email;
            res.redirect('/adminpanel')
        }else{
            res.send(fs.readFileSync('usernotfound.html').toString());
            return;
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
        res.render("assignengineer",{name1: e_info });       
    })       
})

app.get('/adminpanel',(req,res)=>{
    
    db.query(`select COUNT(q_id) as remquery from ( SELECT q_id FROM query where status = 0) A UNION ALL select Count(e_id) FROM (select e_id FROM engineer) B UNION ALL SELECT COUNT(e_id) from (SELECT e_id FROM engineer WHERE engineer.status = 0) C UNION ALL select COUNT(u_id) FROM (SELECT u_id from user) D UNION ALL select p_name FROM (SELECT p_name from query where status = 0) E UNION ALL select description FROM (SELECT description from query where status = 0) F UNION ALL select q_id FROM (SELECT q_id from query where status = 0) G UNION ALL select e_id FROM (SELECT e_id from query where status = 0) H UNION ALL select u_id FROM (SELECT u_id from query where status = 0) I UNION ALL select start_date FROM (SELECT start_date from query where status = 0) J UNION ALL select end_date FROM (SELECT end_date from query where status = 0) K UNION ALL select status FROM (SELECT status from query where status = 0) L UNION ALL select feedback FROM (SELECT feedback from query where status = 0) M UNION ALL select count(q_id) FROM (select q_id from query where query.status = 0 and e_id is not NULL and query.resolution is not NULL) M ;`,function(err,result){
        if(err) throw err;

        if((result[5])==undefined ){
            res.render("adminpanel",{ adminsolve: { remquery: Object.values(result[0]), toteng: Object.values(result[1]), engfree: Object.values(result[2]), totuser: Object.values(result[3]), querypname: 0, querydesc: 0, queryqid: 0, queryeid: 0, queryuid: 0, querystart: 0, queryend: 0, querystatus: 0, queryfeed: 0, countquery: 0 }});
        }
        else{
            var increment = Object.values(result[0])-1;
            
            res.render("adminpanel",{ adminsolve: { remquery: Object.values(result[0]), toteng: Object.values(result[1]), engfree: Object.values(result[2]), totuser: Object.values(result[3]), querypname: Object.values(result[4+increment]), querydesc: Object.values(result[5+increment*2]), queryqid: Object.values(result[6+increment*3]), queryeid: Object.values(result[7+increment*4]), queryuid: Object.values(result[8+increment*5]), querystart: Object.values(result[9+increment*6]), queryend: Object.values(result[10+increment*7]), querystatus: Object.values(result[11+increment*8]), queryfeed: Object.values(result[12+increment*9]), countquery: Object.values(result[13+increment*9]) }});    
        }
    })  
})

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
        }) 
        db.query(`select engineer.email from engineer where engineer.e_id=${e_id.split(',')[0]};`,function(err,result){
            console.log(result)
            var sendingemail = (Object.values(JSON.parse(JSON.stringify(result)))[0].email);
    
            var transport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                  user: "shubhamsharma31031991@gmail.com",
                  pass: "",
                }
              });
            var mailOptions = {
                from: 'shubhamsharma31031991@gmail.com',
                to: `${sendingemail}`,
                subject: 'Query Assigned',
                text: `Query Had been asigned to you`,
            }; 
            transport.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            }); 
        })
    
        res.redirect('/adminpanel')
})
app.use('/remainingquery',(req,res)=>{
    db.query(`select p_name, description, q_id, e_id, u_id,feedback,resolution from query where status = 0`,function(err,result){
        if(err) throw err;
        // var rem_info = [];
        // const q = Object.values(JSON.parse(JSON.stringify(result)));
        // q.forEach((v) => rem_info.push(Object.values(v)));
        // if(rem_info[0]==undefined){
        //     res.redirect('/adminpanel')
        // }else{
        // console.log(rem_info[0].length)
        // for(var i = 0; i<rem_info.length; i++){
        //     for( var j = 0; j<rem_info[0].length; j++){
        //         if(rem_info[i][j] == undefined){
        //             rem_info[i][j] = 'Null';
        //         }
        //     }
        // }
        // res.render("remainingquery",{remain: rem_info });  }
        res.render("remainingquery",{remain: result });
    })
})

app.get('/querysolve',(req,res)=>{
    //show in dropdown
    var q_solve = []
    db.query('select query.q_id, p_name, description, e_id from query where query.status = 0 and e_id is not NULL and query.resolution is not NULL', function(err,result){
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

        db.query(`select user.email from user where user.u_id=(select u_id from query where q_id = ${q_id.split(',')[0]});`,function(err,result){
            var sendingemail = (Object.values(JSON.parse(JSON.stringify(result)))[0].email);

            var transport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                  user: "",
                  pass: "",
                }
              });
            var mailOptions = {
                from: 'shubhamsharma31031991@gmail.com',
                to: `${sendingemail}`,
                subject: 'You know us better than anyone else. What do you think?',
                text: `Thank you for your recent purchase of Service! We’d love to hear about your experience with us; you can leave us a review at 'http://localhost:3000/userfeedback?q_id=${q_id.split(',')[0]} 
                
                Your feedback is valuable to us. Thank you for your time!
                `
            }; 
            transport.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            }); 
        })
    })
    res.redirect('/querysolve')
})

app.get('/userfeedback',function(req,res){
    const q_iddata=req.query.q_id.split(',')[0]
    console.log(q_iddata);
    res.render("userfeedback",{ queryid : q_iddata })
})

app.use('/userfeedbackrun',function(req,res){
    console.log(req.query)
    db.query(`update query set query.feedback='${req.query.rating}' where q_id = ${req.query.queryidvalue}`,function(err,result){
            if (err) throw err;
            console.log('query updated')
    })
    res.redirect('/');
})

app.use('/seefeedback',function(req,res){
    db.query(`select query.p_name, query.description, query.start_date ,query.end_date,query.status, (SELECT engineer.name from engineer where engineer.e_id = query.e_id) as engname, query.feedback,query.resolution from query;`,function(err,result){
        if (err) throw err;
        res.render('engfeedback',{userData: result})
    })
})
app.use('/forgotuserlogin',function(req,res){
    var forgetemail = req.query.your_name;
    db.query(`select password from userlogin where login_id = '${forgetemail}'`,function(err,result){
        if (err) throw err;
        var pass = (Object.values(JSON.parse(JSON.stringify(result)))[0].password)

        var transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: "",
              pass: "",
            }
          });
        var mailOptions = {
            from: 'shubhamsharma31031991@gmail.com',
            to: `${forgetemail}`,
            subject: 'Forgot Password',
            text: `Your Forgotten Password is: ${pass}`,
        }; 
        transport.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        }); 
    })
    
    setTimeout(() => {
        res.redirect('/usersignin')
    }, 3500);

})
app.use('/forgotadminlogin',function(req,res){
    var forgetemail = req.query.admin_email;
    db.query(`select pass from admin where admin_id = '${forgetemail}'`,function(err,result){
        if (err) throw err;
        var pass = (Object.values(JSON.parse(JSON.stringify(result)))[0].pass)

        var transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: "",
              pass: "",
            }
          });
        var mailOptions = {
            from: 'shubhamsharma31031991@gmail.com',
            to: `${forgetemail}`,
            subject: 'Forgot Password',
            text: `Your Forgotten Password is: ${pass}`,
        }; 
        transport.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        }); 
    })
    
    setTimeout(() => {
        res.redirect('/adminsignin')
    }, 3500);

})
app.use('/forgotengineerlogin',function(req,res){
    var forgetemail = req.query.your_name;
    db.query(`select password from engineer where email = '${forgetemail}'`,function(err,result){
        if (err) throw err;
        var pass = (Object.values(JSON.parse(JSON.stringify(result)))[0].password)

        var transport = nodemailer.createTransport({
            service: "smtp",
            host: "103.74.54.192",
            port: 465,
            auth: {
              user: "support@globecs.in",
              pass: "",
            }
          });
        var mailOptions = {
            from: 'support@globecs.in',
            to: `${forgetemail}`,
            subject: 'Forgot Password',
            text: `Your Forgotten Password is: ${pass}`,
        }; 
        transport.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        }); 
    })
    
    setTimeout(() => {
        res.redirect('/engineersignin')
    }, 3500);

})

app.use('/logout', (req,res) => {
    res.destroy;
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Server started on port 3000 ${port}`);
});
