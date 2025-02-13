const express = require('express');
const routes = express.Router();

const { loginPage, registerPage, registerUser, dashboardPage, informationPage, loginUser, logout, formPage, insertData, deleteUser, updateUser, updateData } = require('../controllers/CrudController');

const { checkUserLogin } = require('../middleware/checkUser');

const multer = require('multer');
const st = multer.diskStorage({
    destination: (req, res, cb) => {
        return cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniq = Math.floor(Math.random() * 1000000000);
        return cb(null, `${file.fieldname}-${uniq}`)
    }
})

const fileUpload = multer({ storage: st }).fields([
    { name: 'imageFile' },   
    
  ]);


routes.get('/', loginPage);
routes.get('/register', registerPage);
routes.post('/registeruser',  registerUser);
routes.get('/dashboard',  dashboardPage);
routes.get('/information',  informationPage);
routes.post('/loginuser', loginUser);
routes.get('/logout',  logout);
routes.get('/form', formPage);
routes.post('/insertdata', fileUpload, insertData);
routes.get('/deleteuser', deleteUser);
routes.get('/updateuser', updateUser);
routes.post('/updatedata', fileUpload, updateData);

module.exports = routes;
