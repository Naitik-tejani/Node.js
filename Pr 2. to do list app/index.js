const express = require('express');

const port = 8000;

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded());

let record = [];

app.get('/', (req, res) => {
    return res.render('view', {
        record
    });
})

app.get('/add', (req, res) => {
    return res.render('add');
})


app.post('/adduser', (req, res) => {
    const { usertask, userstatus, userdate } = req.body;

    let obj = {
        id: Math.floor(Math.random() * 1000000),
        task: usertask,
        status: userstatus,
        dedline: userdate
    }
    record.push(obj);
    console.log("successfully add");
    return res.redirect('/');
})

app.get('/deleteuser', (req, res) => {
    let id = req.query.deleteId
    let deletedata = record.filter(val => val.id != id);
    record = deletedata;
    return res.redirect('/');
})


app.get('/edituser', (req, res) => {
    let id = req.query.id;
    let single = record.find(val => val.id == id);
    return res.render('edit', {
        single
    });
})
app.post('/updateuser', (req, res) => {
    const { editid,  usertask, userstatus, userdate } = req.body;
    let up = record.map((val) => {
        if (val.id == editid) {
            val.task = usertask;
            val.status = userstatus;
            val.dedline = userdate;
        }
        return val;
    });
    record = up;
    console.log("successfully updated");
    return res.redirect('/');
})


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is running on port:- ${port}`);
})
