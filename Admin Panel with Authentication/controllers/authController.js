const adminModel = require('../models/adminsModel');

const nodemailer = require('nodemailer');

const loginPage = (req, res) => { 
    if(res.locals?.users){
        return res.redirect('/dashboard');
    }
    return res.render('login');
}

const registerPage = (req, res) => {
    return res.render('register');
}

const loginUser = (req, res) => {
    try{
        return res.redirect('/dashboard');
    }catch(err){
        console.log(err);
        return false;
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        await adminModel.create({
            name: name,
            email: email,
            password: password
        })
        console.log("User registered successfully..!");
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const forgotPassword = async (req,res) => {
    try{
       const { useremail } = req.body;
       let user = await adminModel.findOne({email : useremail});
       if(!user){
        console.log("Email or Password is not valid..!");
        return false;
       }
       let otp = Math.floor(Math.random() * 100000);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '7133naitiktejani@gmail.com',
          pass: 'pzhm qslc zuez jpfr'
        }
      });
      
      var mailOptions = {
        from: '7133naitiktejani@gmail.com',
        to: useremail,
        subject: 'Forgot Password',
        html: `<h1 style='color:green'> Here's Your OTP :- ${otp}</h1>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            let userotp = {
                email: useremail,
                otp: otp
            }
            res.cookies('userotp',userotp);
            console.log('Email sent: ' + info.response);
            return res.redirect('/otp');
        }
      });

        return res.redirect('/otp')
    }catch(err){
        console.log(err);
        return false;
    }
}

const userOtp = async (req,res) => {
    try{
        const otp = req.body.userotp;
        if(req.cookies.userotp == otp){
            return res.redirect('/newpassword');
        }else{
            console.log("OTP you entered is not valid..!");
            return res.redirect('/otp')
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const otpPage = (req,res) => {
    return res.render('otp');
} 

const changePassword = async (req,res) => {
    try{
        let nPassword = req.body.nPassword;
        let cPassword = req.body.cPassword;

        if(nPassword == cPassword){
            let email = req.cookies.user?.email;
            let user = await adminModel.findOneAndUpdate({email: email},{
                password : nPassword
            })
            res.clearCookie('userotp');
            return res.redirect('/');
        }else{
            console.log("Password and Confirm Password does not match..!");
            return res.redirect('/newpassword');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}
 
const newPasswordPage = (req,res) => {
    return res.render('newpassword');
}

const dashboardPage = (req, res) => {
    return res.render('dashboard');
}

const chartsPage = (req,res) => {
    return res.render('charts');
}

const tablesPage = (req,res) => {
    return res.render('tables');
}

const gridPage = (req,res) => {
    return res.render('grid');
}

const widgetsPage = (req,res) => {
    return res.render('widgets');
}

const logoutUser = (req,res) => {
    req.logout((err) => {
        if(err){
            console.log(err);
            return false;
        }
        return res.redirect('/');
    })
}

module.exports = {
    dashboardPage,
    chartsPage,
    widgetsPage,
    tablesPage,
    gridPage,
    loginPage,
    registerPage,
    loginUser,
    registerUser,
    forgotPassword,
    changePassword,
    newPasswordPage,
    otpPage,
    userOtp,
    logoutUser
}