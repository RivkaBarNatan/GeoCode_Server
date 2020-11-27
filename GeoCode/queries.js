const { response } = require('express');

const Client = require('pg').Pool;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'geocodedb',
    password: '123456',
    port: 5432,
});

const postGeoCode = (req, res) => {
    let data = req.body;
    console.log(data);
    client.query('INSERT INTO data VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
        [data.latitude, data.longitude, data.formattedAddress, data.country, data.city, data.state,
        data.zipcode, data.streetName, data.countryCode, data.neighbourhood, data.provider]
        , (error, result) => {
            if (error) {
                console.log('error:');
                console.log(error);
                throw error;
            }
            console.log(`User added with ID: ${result}`)
            res.status(201).send(`User added with ID: ${result}`);
        });
    console.log(data.streetname);
    console.log('Data insert successful');
    // client.end();
}

const getAll = (req, res) => {
    client.query('SELECT * FROM data', (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows);
        console.log('Data insert successful');
    })
}

const getMostPopular = (req, res) => {
    client.query('SELECT COUNT(id), streetName FROM data GROUP BY latitude, longitude, streetName ORDER BY COUNT(id) DESC LIMIT 1;',
     (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows[0]);
    })
}
module.exports = {
    getAll,
    postGeoCode,
    getMostPopular
}