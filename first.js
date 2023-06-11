var fs = require('fs');
var http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3030;
const axios = require('axios');
const apiKey = 'AmhMfBZLCSDiPKsfakqFoNOIQAO2ot6WHmRfJOOByGBtg5zNzKwf6IN7zTl7DH2y';
const say = require('say');





app.use(express.json());
app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080"); // replace "*" with the appropriate origin
    res.header("Access-Control-Allow-Origin", "https://tracker-41x9.onrender.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.urlencoded({ extended: true }));
app.use('/css',express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')));
app.use(express.static(path.join(__dirname, 'images')));
app.get('/',function(req,res){
    fs.readFile("home.html", function (error, pgResp){
        
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.write(pgResp);
            res.end();
        }
    });
});

var lat1,lon1,lat2,lon2;
var placeName1,test1;
app.post('/bus_no_1/data', (req1, res1) => {
  var { lat, lon } = req1.body;
  // Handle the received data here
  console.log(`Received data: lat=${lat}, lon=${lon}`);
  lat1 = parseFloat(lat);
  lon1 = parseFloat(lon); 
  // Send a response to the client







  var latitude = lat; // Example latitude
var longitude = lon; // Example longitude

axios.get(`https://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}`, {
  params: {
    key: apiKey,
  },
})
  .then((response) => {
    const resourceSets = response.data.resourceSets;
    if (resourceSets.length > 0) {
      const resources = resourceSets[0].resources;
      if (resources.length > 0) {
        placeName1 = resources[0].name;
        console.log('Place Name:', placeName1);
      } else {
        console.log('No results found.');
      }
    } else {
      console.log('No results found.');
    }
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });


















  res1.redirect(`/bus_no_1`);
});
app.post('/bus_no_2/data', (req2, res2) => {
  var { lat, lon } = req2.body;
  // Handle the received data here
  console.log(`Received data: lat=${lat}, lon=${lon}`);
  lat2 = parseFloat(lat);
  lon2 = parseFloat(lon); 
  // Send a response to the client
  res2.redirect(`/bus_no_2`);
});
app.get('/bus_no_1', function(req, res) {




  

// Text to convert to speech
var text = 'Updated Location of the bus is : ' + placeName1;

// Use the say module to speak the text
if(test1!=placeName1)
{
say.speak(text);
}
test1 = placeName1;














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
            
          </nav>

          
          <footer class="footer">
            <a href="" class="Contact">Contact Us</a>
          </footer>
          </body>
</html>
  `);
  res.write(`
  <h1>lat : ${lat1}</h1>
    <h1>lon : ${lon1}</h1>
    <h1>place name: ${placeName1} </h1>
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
            var latitude = ${lat1};
            var longitude = ${lon1};
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
  res.write(`
    <script>
      setTimeout(function(){
        location.reload();
      }, 5000);
    </script>
  `);
  res.end();
});




app.get('/bus_no_2',function(req,res)
{
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
            
          </nav>

          
          <footer class="footer">
            <a href="" class="Contact">Contact Us</a>
          </footer>
          </body>
</html>
  `);
  res.write(`
  <h1>lat : ${lat2}</h1>
    <h1>lon : ${lon2}</h1>
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
            var latitude = ${lat2};
            var longitude = ${lon2};
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
  res.write(`
    <script>
      setTimeout(function(){
        location.reload();
      }, 5000);
    </script>
  `);
  res.end();
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