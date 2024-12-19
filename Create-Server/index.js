const http = require('http');
const port = 7000;
const server = http.createServer((req, res) => {
    res.write(`<h1>naitik</h1>`);
    res.end();
    });

    server.listen(port,(err)=>{
        if(err){
            console.log(`server is start on port :- ${port}`);
            }
    });