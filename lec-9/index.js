const express = require('express');

const port = 8800;

const app = express();

const db = require('./config/db');

const UserModel = require('./models/UserModel');

const path = require('path');

app.use('/upload', express.static(path.join(__dirname, 'upload')));

const multer = require('multer');

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'upload');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname);
    }
})
const imageupload = multer({ storage: st }).single('image');

app.set(`view engine`, `ejs`);

app.use(express.urlencoded());


app.get(`/`, (req, res) => {
    return res.render(`form`);
})

app.post('/adduser', imageupload, (req, res) => {
    const { name, email, password, gender, hobby, city } = req.body;

    UserModel.create({
        username: name,
        useremail: email,
        userpassword: password,
        gender: gender,
        hobby: hobby,
        city: city,
        image: req.file?.path,

    }).then((record) => {
        console.log(record);
        console.log('user create');
        return res.redirect('/');
    }).catch((err) => {
        console.log(err);
        return false;
    })
})

app.get(`/deleteid`, (req, res) => {
    let id = req.query.did;
    UserModel.findByIdAndDelete(id)
        .then((data) => {
            console.log('record deleted');
            return res.redirect('/viewuser');
        }).catch((err) => {
            console.log(err);
            return false;
        })

})

app.get('/edituser', (req, res) => {
    let id = req.query.eid;
    UserModel.findById(id)
        .then((single) => {
            return res.render('edit', {
                single
            });
        })
        .catch((err) => {
            console.log(err);
            return false;
        })
})

app.post(`/updateuser`, (req, res) => {
    const { editid, name, email, password, gender, hobby, city } = req.body;

    UserModel.findByIdAndUpdate(editid, {
        username: name,
        useremail: email,
        userpassword: password,
        gender: gender,
        hobby: hobby,
        city: city,
    }).then((user) => {
        console.log(`user updated`);
        return res.redirect('/viewuser');
    })
        .catch((err) => {
            console.log(err);
            return false;
        })

})

app.get(`/viewuser`, (req, res) => {
    UserModel.find({})
        .then((record) => {
            return res.render('table', {
                allrecord: record
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server start on port ${port}`);
})