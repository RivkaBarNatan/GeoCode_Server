const nodeGeocoder = require('node-geocoder');
const express = require('express');
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./queries');
// const Sequelize = require('sequelize');
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





// app.post('/post', async (req, res) => {

//   try {
  
//   const data=req.body;
  
//   await newUser.save()
  
//   res.json({ data: data }) // Returns the new user that is created in the database
  
//   } catch(error) {
  
//   console.error(error)
  
//   }
  
//   })

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/users', db.getget);
app.post('/PostGeoCode/:data', db.postGeoCode);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
  // res.writeHead(200);
});