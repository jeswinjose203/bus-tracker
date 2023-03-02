var fs = require('fs');
var http = require('http');
const express = require('express');
const app = express();
const path = require('path');

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


          app.post('/data', (req1, res1) => {
            res1.write(pgResp);
            /*
           res1.write(`
           <head>
                <title>My Location</title>
                <meta charset="utf-8" />
                <style>
                #myMap {
                    height: 400px;
                    width: 100%;
                }
                </style>
                    <script src="https://www.bing.com/api/maps/mapcontrol?key=AmhMfBZLCSDiPKsfakqFoNOIQAO2ot6WHmRfJOOByGBtg5zNzKwf6IN7zTl7DH2y&callback=loadMapScenario" async defer></script>
                    <script>
                        function loadMapScenario() {
                        navigator.geolocation.getCurrentPosition(
                        function (position) {
                        var latitude = position.coords.latitude;
                        var longitude = position.coords.longitude;

                        var map = new Microsoft.Maps.Map("#myMap", {
                        center: new Microsoft.Maps.Location(latitude, longitude),
                        zoom: 15,
                        });

                        var pushpin = new Microsoft.Maps.Pushpin(
                        map.getCenter(),
                        null
                        );
                        map.entities.push(pushpin);
                        },
                        function (error) {
                        console.log(error);
                        }
                        );
                        }
                    </script>
            </head>
        <body>
        <div id="myMap"></div>
        <h1>${req1.body.lat}</h1>
        </body>
        `);*/
        const { lat, lon } = req1.body;
        res1.write(`<h1>Received lat: ${lat}, lon: ${lon}</h1>`);
        res1.sendStatus(200);
        res1.end();
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