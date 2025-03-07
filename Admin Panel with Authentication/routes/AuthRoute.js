const express = require('express');


const routes = express.Router();

const { dashboardPage, loginPage, registerPage, loginUser, registerUser, logoutUser,chartsPage, widgetsPage, tablesPage, gridPage, forgotPassword, newPasswordPage, userOtp, otpPage, changePassword } = require('../controllers/AuthController');


const passport = require('passport');

routes.get('/',loginPage);
routes.post('/loginuser',passport.authenticate('local',{failureRedirect :'/'}),loginUser);

routes.get('/register',registerPage);
routes.post('/registeruser',registerUser);

routes.post('/forgotpassword',forgotPassword);

routes.get('/otp',otpPage);
routes.post('/userotp',userOtp);

routes.get('/newpassword',newPasswordPage);
routes.post('/changepassword',changePassword);

routes.get('/logout',logoutUser);

//pages
// routes.get('/dashboard',passport.checkUser, dashboardPage);
// routes.get('/charts',passport.checkUser, chartsPage);
// routes.get('/widgets',passport.checkUser, widgetsPage);
// routes.get('/grid',passport.checkUser, gridPage);

routes.get('/dashboard', dashboardPage);
routes.get('/charts', chartsPage);
routes.get('/widgets', widgetsPage);
routes.get('/grid', gridPage);

module.exports = routes;