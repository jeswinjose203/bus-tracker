var fs = require('fs');
var http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3030;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
            
            // here in req1,body.data  we have the data that have been sent from esp8266


            const WebSocket = require('ws');

            const wss = new WebSocket.Server({ port: 8080 });
            
            // Handle WebSocket connections
            wss.on('connection', (ws) => {
              console.log('New WebSocket connection');
            
              // Handle incoming messages
              ws.on('message', (data) => {
                console.log(`Received location data: ${data}`);
            
                // Parse the location data and do something with it
                const locationData = JSON.parse(data);
                console.log(`Latitude: ${locationData.lat}, Longitude: ${locationData.lon}`);
              });
            });
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