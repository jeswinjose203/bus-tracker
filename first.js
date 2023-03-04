var fs = require('fs');
var http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3030;


app.use(express.json());
app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3020"); // replace "*" with the appropriate origin
    res.header("Access-Control-Allow-Origin", "https://tracker-41x9.onrender.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.urlencoded({ extended: true }));
app.use('/css',express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')));
app.get('/',function(req,res){
    fs.readFile("index.html", function (error, pgResp){
        
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.write(pgResp);
            res.end();
        }
    });
});
var lat1,lon1;
app.post('/bus_no_1/data', (req1, res1) => {
    const { lat, lon } = req1.body;
    // Handle the received data here
    console.log(`Received data: lat=${lat}, lon=${lon}`);
    lat1 = lat;
    lon1 = lon; 
    // Send a response to the client
    res1.sendStatus(200);
   res1.redirect('/bus_no_1');
  });
app.get('/bus_no_1',function(req,res)
{
    fs.readFile("index.html", function (error, pgResp){
        
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.write(pgResp);
            res.write(`
            <h1>bus no 1</h1>
            `);
            if(lat1!=undefined && lon1!=undefined)
            {
                res.write('<h1>');
                res.write(lat1.toString());
                res.write('</h1>');

                res.write('<h1>');
                res.write(lon1.toString());
                res.write('</h1>');
            }
              
              
            
        res.end();

        }
    });
});

app.get('/bus_no_2',function(req,res)
{
    fs.readFile("index.html", function (error, pgResp){
        
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.write(pgResp);
            res.write(`
            <h1>bus no 2</h1>
            `);
            res.end();
        }
    });
});
app.get('/bus_no_3',function(req,res)
{
    fs.readFile("index.html", function (error, pgResp){
        
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.write(pgResp);
            res.write(`
            <h1>bus no 3</h1>
            `);
            res.end();
        }
    });
});
http.createServer(app).listen(PORT);