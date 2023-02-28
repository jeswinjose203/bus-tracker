var fs = require('fs');
var http = require('http');
const express = require('express');
const app = express();
const path = require('path');
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

            res.write(`
            <form action="/data" method="post">
             <div class="row">
              <div class="col">
              <input type="text" class="form-control" id="i1" name="SR_NO2" placeholder="SR NO">
                </div>
           
                <div class="col">
                <input type="text" class="form-control" id="i2" name="REGULATOR" placeholder="Regulator">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i3" name="AUD_DATE" placeholder="Audit Date">
                </div>
            
                <div class="col">
                <input type="text" class="form-control" id="i4" name="NO_OF_FINDINGS" placeholder="No of findings">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i5" name="NO_OF_OBSERV" placeholder="No of observations">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i6" name="CAP_DUE_DATE" placeholder="cap due date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i7" name="CAP_SUBMT_DATE" placeholder="Cap submitted date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i8" name="CA_submit_due_date" placeholder="Ca submit due date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i9" name="CA_SUBMT_DATE" placeholder="Ca submitted date">
                </div>
               <div class="col">
                <input type="text" class="form-control" id="i9" name="Audit_clos" placeholder="Audit closure date">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i10" name="REMARKS" placeholder="REMARKS">
                </div>
                <div class="row">
                <div class="col-10">
                </div>
                <div class="col-2">
           
                <button type="submit" class="btn btn-primary mb-3" style="margin-top: 4%;">SAVE CHANGES</button>
                
                </div>
                </div>
                </div>
            </form>
          `);

          app.post('/data', (req1, res1) => {
            res1.write(pgResp);
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
        </body>
        `);
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
http.createServer(app).listen(8080);