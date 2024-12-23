const http = require('http');
const port = 9000;
const fs = require('fs');

const server = http.createServer((req, res) => {
    let fileName = "";
    switch (req.url) {
        case "/":
            fileName = "./home.html";
            break;
        case "/About":
            fileName = "./about.html";
            break;
        case "/product":
            fileName = "./product.html";
            break;
        case "/contact":
            fileName = "./contact.html";
            break;
        case "/blog":
            fileName = "./blog.html";
            break;
    }
    fs.readFile(fileName, (err, pagename) => {
        if (err) {
            console.log('file not found');
            return false;
        }
        res.end(pagename);
    });
})

server.listen(port, (err) => {
    if (err) {
        console.log(`server is start on port :- ${port}`);
    }
});