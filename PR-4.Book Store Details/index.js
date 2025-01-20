const express = require('express');
const port = 9080;
const app = express();  

const db = require('./config/db');

const path = require('path');

app.set("view engine","ejs");

const bookModel = require("./models/detailsModel");

app.use(express.urlencoded());
app.get('/',(req,res) => {
    return res.render('add')
})

app.post('/addDetails',(req,res) => {
    const {name,price,pages,description,author} = req.body;

    bookModel.create({
        bookName : name,
        bookPrice : price,
        bookPages : pages,
        bookDescription : description,
        bookAuthor : author
    }).then((record) => {
        console.log(record);
        console.log("Data successfully created..!");
        return res.redirect('/viewDetails');
    }).catch((err) => {
        console.log(err);
        return false;
    })
})

app.get('/viewDetails',(req,res) => {
    bookModel.find()
    .then((record) => {
        return res.render('view',{
            record
        })
    })
})

app.get('/deleteData',(req,res) => {
    const id = req.query.delId;

    bookModel.findByIdAndDelete(id)
    .then((del) => {
        console.log(del);
        return res.redirect('/viewDetails');
    }).catch((err) => {
        console.log(err);
        return false;
    })
})

app.get('/editData',(req,res) => {
    bookModel.findById(req.query.editId)
    .then((editRcd) => {
        return res.render('edit',{
            editRcd
        })
    })
})

app.post('/updateData',(req,res) => {
    const {editId, name, price, pages, description, author} = req.body;

    bookModel.findByIdAndUpdate(editId,{
        bookName : name,
        bookPrice : price,
        bookPages : pages,
        bookDescription : description,
        bookAuthor : author
    }).then((edit) => {
        console.log(edit);
        return res.redirect('/viewDetails');
    }).catch((err) => {
        console.log(err);
        return false;
    })
})

app.listen(port,(err) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log(`Server is running on port :- ${port}`);
})