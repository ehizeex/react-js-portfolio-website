
const router = require('express').Router();
const nodemailer = require('nodemailer');



// nodemailer is a module created in  node.js and has benn created in order to send mails

// in order to send mails you have to follow 3 steps:
// 1.Create nodemailer transporter
// --the most common is SMTP
// --SENDMAIL is a command for simple message. like mail() in php

// 2. Set nodemailer message options(mailOptions)
// we specify the sender,messages

// 3.deliver a message with sendmail


router.post('/contact', (req, res)=>{
    let data = req.body;

    // if the fields are empty we want to appear a message
    if(data.name.length===0 || data.email.length===0 || data.message.length===0){
      
     return res.json({msg:"Please fill all the fields"})

    }


//   we create a transporter
let smtpTransport = nodemailer.createTransport({

    service:'Gmail',
    // the connect port
    port:465,

    // authenticate
    auth:{
        user:'ehizeextech@gmail.com',
        pass:'ehiedu212333'
    }
})


// define the mailoptions
let mailOptions = {
    from:data.email,
    to:'ehizeextech@gmail.com',
    subject:`Message from ${data.name}`,
    html:`
    
    <h3>Informations</h3>
    <ul>
    <li>Name: ${data.name}</li>
    <li>Email: ${data.email}</li>
   
    </ul>

    <h3>Message</h3>
    <p>${data.message}</p>
    
    
    `
}


// 3.send the message with sendmail
smtpTransport.sendMail(mailOptions, (err)=>{

try {
    
if(err) return res.status(400).json({msg:'Please fill all the fields'})

res.status(200).json({msg:'Thank you for contacting Ehizeex!'})


} catch (err) {
    if(err) return res.status(500).json({msg:'There is server error'})
}

})



})



module.exports=router;