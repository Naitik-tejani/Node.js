const express=require('express'); 
const port=8000;
const app =express();

app.set('view engine','ejs');
app.use(express.urlencoded());
let record=[];

app.get('/',(req,res)=>{
    return res.render('Table',{
        record
    });
});

app.get('/form',(req,res)=>{
    return res.render('Form');
});

app.post('/adduser',(req,res)=>{
    const {username,userphone}=req.body;
    let obj={
        name:username,
        phone:userphone
    }
    record.push(obj);
    console.log("user sucesfully register");
    return res.redirect('/');
})

app.get('/deletuser',(req,res)=>{
   let id =req.query.deletId
   let deletdata = record.filter(val=>val.id !=id);
   record=deletdata;
   return res.redirect('/');
})


app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log('server is strat on port http://localhost:${port}');
})