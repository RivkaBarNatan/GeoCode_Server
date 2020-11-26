const Client = require('pg').Pool;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'geocodedb',
    password: '123456',
    port: 5432,
});

const postGeoCode = (req, res) => {
    let data = req.params.data;
    console.log(data);
    client.query('INSERT INTO data VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', 
    data.latitude, data.longitude, data.formattedaddress, data.country, data.city, data.state,
     data.zipcode, data.streetname, data.countrycode, data.neighbourhood, data.provider
     , (error, result) => {
        if (error) {
            throw error
        }
        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
    console.log('Data insert successful');
    client.end();
}

const getget= (req, res)=>
{
    client.query('SELECT * FROM data', (error, result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows);
        console.log('Data insert successful');
    })
}








module.exports = {
    getget,
    postGeoCode,
}