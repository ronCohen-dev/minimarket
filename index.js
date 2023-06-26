const http = require('http');
const fs = require('fs');
const url = require('url');
const { log } = require('console');

// import function from anather place dir
const replaceTemplate = require('./modules/replaceTemplate.js');

// taking this from the node_modules
const slugify = require('slugify');

// this exacute just one time so its can be Sync function
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempProducte = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

const dataObject = JSON.parse(data);

const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);

// creating a server
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    // this ' .join('') ' to return String object
    const cardsHtml = dataObject.map((element) => replaceTemplate(tempCard, element)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // product page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    // getting the product with the spacific id from query path ver
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProducte, product);
    res.end(output);

    // api page
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  } else {
    // not found page
    // can send here any headers i want
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    // res.end('404 page not found :( ')
    res.end('<h1>404 page not found :( </h1>');
  }
});

server.listen(8000, () => {
  console.log('Server is running :) ');
});
