var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "shubhamsharma31031991@gmail.com",
      pass: "kiigkwmyusdntexs",
    }
  });
var mailOptions = {
    from: 'shubhamsharma31031991@gmail.com',
    to: 'ayushsharma2440@gmail.com',
    subject: 'Succeded',
    text: 'Hello',
}; 
transport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
});  