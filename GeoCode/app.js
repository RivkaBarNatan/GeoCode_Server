const nodeGeocoder = require('node-geocoder');
const express = require('express');
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./queries');
app.use(cors());



app.get('/GetGeocode', function (req, res) {
  let address = req.query.address;


  let options = { 
    provider: 'openstreetmap'
  };

  let geoCoder = nodeGeocoder(options);
  geoCoder.geocode(address)
    .then((result) => {
      console.log(result);
      res.send(result);
      console.log(address);
    })
    .catch((err) => {
      console.log(err);
    });
})

// app.get('GetPopularSearch', function (req, res) {

// })


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/GetAll', db.getAll);
app.post('/PostGeoCode', db.postGeoCode);
app.get('/GetMostPopular', db.getMostPopular);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
  // res.writeHead(200);
});