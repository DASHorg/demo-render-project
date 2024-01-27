const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const app = express();

app.use('/', express.static('./demo-site'));

const port = process.env.PORT || 3000;
const weather_api_key = process.env.WEATHER_API_KEY;

app.get('/weather-report', (req, res) => {
    const { lat, lon } = req.query;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`;
    
    (async () => {
        try{
            const response = await fetch(url);
            const data = await response.json();
            const new_data = {
                "location": data.name,
                "temp": data.main.temp,
                "weather": data.weather[0].description
            }
            res.json(new_data);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    })();
})

app.listen(port);
