const http = require("http");
const fs = require("fs");
const url = require("url");
const { log } = require("console");

// this exacute just one time so its can be Sync function 
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8',(err,data) =>{
    const dataObject = JSON.parse(data);
   
 });

// creating a server
const server = http.createServer((req, res) => {
    console.log(req.url);

    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
      res.end('This is the OVERVIEW page');

    }else if(pathName === '/product'){
        res.end('This is the PRODUCT page');

    }else if(pathName === '/api'){
            res.writeHead(200,{
                'Content-type': 'application/json'});
           res.end(data);
    }else{
         // can send here any headers i want 
        res.writeHead(404 , {
            'Content-type': 'text/html',
           

        });
        // res.end('404 page not found :( ')
        res.end('<h1>404 page not found :( </h1>')
    }
   
});

server.listen(8000, () => {
  console.log("Server is running :) ");
});
