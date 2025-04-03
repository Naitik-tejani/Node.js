const express = require('express');

const port = 8090;

const app = express();

const databese = require('./config/db')

app.use(express.urlencoded())

app.use('/',require('./routes/inexRoute'))

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log(`SERVER ON PORT : ${port}`);
})