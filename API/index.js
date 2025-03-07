const express = require('express');
const port = 9000;
const app = express();

const cors = require('cors');
app.use(cors());

app.get('/user',(req,res)=>{
    return res.status(200).json({
        success: true,
        message:"usre is succses full submit",
        user:[
            {id:"1", name:"raj",phone:"213534545698"},
            {id:"2", name:"vraj",phone:"21353698"},
            {id:"3", name:"vijay",phone:"2135328698"},
            {id:"4", name:"sanjay",phone:"21353693688"},
            {id:"5", name:"keval",phone:"2135369822558"},
            {id:"6", name:"gopi",phone:"21353698556558"},
            {id:"8", name:"nirzaa",phone:"21353698114510"},
            {id:"9", name:"Naitik",phone:"21353698888"},
            {id:"10", name:"brijesh",phone:"213525874"}
        ]
    })
})


app.listen(port,(err) => {
    if(err) {
        console.log(err);
        return false;
    }
    console.log(`Server is running on port :- ${port}`);
})