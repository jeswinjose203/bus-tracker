var fs = require('fs');
var http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const EventEmitter = require('events');
const PORT = process.env.PORT || 3030;

var eventEmitter = new EventEmitter();

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
  var { lat, lon } = req1.body;
  // Handle the received data here
  console.log(`Received data: lat=${lat}, lon=${lon}`);
  lat1 = parseFloat(lat);
  lon1 = parseFloat(lon); 

  // Send a response to the client
  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Bing Maps Example</title>
      <meta charset="utf-8" />
      <script type="text/javascript" src="https://www.bing.com/api/maps/mapcontrol?key=AmhMfBZLCSDiPKsfakqFoNOIQAO2ot6WHmRfJOOByGBtg5zNzKwf6IN7zTl7DH2y"></script>
      <script type="text/javascript">
        function loadMapScenario() {
          var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
            center: new Microsoft.Maps.Location(${lat1}, ${lon1}),
            zoom: 10
          });
          
          var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
          map.entities.push(pushpin);
        }
      </script>
      <style>
        #myMap {
          height: 400px;
          width: 100%;
        }
      </style>
    </head>
    <body onload="loadMapScenario();">
      <div id="myMap"></div>
    </body>
  </html>
  `;
  
  fs.writeFile('one.html', htmlContent, (err) => {
    if (err) throw err;
    console.log('HTML file created successfully');
  });

  eventEmitter.on('myEvent', () => {
    app.get('/bus_no_1', function(req, res) {
      fs.readFile("one.html", function (error, pgResp) {
        if (error) {
          res.writeHead(404);
          res.write('Contents you are looking are Not Found');
          res.end();
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'});

          res.write(`
          <html>
  <head>
    
      <link rel="stylesheet" href="css/bootstrap.css">
        <script src="js/bootstrap.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>

        <style>
          html{
          position:relative;
        } 
          .footer{
                width: 100%;
                height: 60px;
                position: absolute;
                background: #05111a;
                text-align: center;
                bottom:0;
                padding-top: 20px;
            }
            body{
              padding-bottom:60px;
            }
            .contact{
                color: #70787e;
                font-size: 15px;
                text-decoration: none;
            }
        </style>
  </head>
  <body>
    

        <nav class="navbar navbar-light" style="background-color: #eaff03;">
            <div class="container-fluid">
              <a class="navbar-brand" href="" style="font-family:Impact, fantasy;">
                <img src="https://em-content.zobj.net/source/microsoft-teams/337/man-with-white-cane-light-skin-tone_1f468-1f3fb-200d-1f9af.png" alt="" width="40" class="d-inline-block align-text-top">
               
                CHITAPPAN TRACKER
                
              </a>
              <ul class="nav nav-pills">
                <!--
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Active</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
              -->
                
                
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="bus_no_1">BUS NO 1</a></li>
                    <li><a class="dropdown-item" href="bus_no_2">BUS NO 2</a></li>
                    <li><a class="dropdown-item" href="bus_no_3">BUS NO 3</a></li>
                  </ul>
                </li>


              </ul>
            </div>
            
          </nav>`);

          res.write(pgResp);
          
          res.write(`<footer class="footer">
            <a href="" class="Contact">Contact Us</a>
          </footer>
          </body>
</html>
          `);
          res.end();
        }
      });
    });
  });
  eventEmitter.emit('myEvent');
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