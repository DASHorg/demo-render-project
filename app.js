const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use('/', express.static('./demo-site'));
// app.use(express.json());

app.get('/weather-report', (req, res) => {
    const { lat, lon } = req.query;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fbaf44106f46a387d0ce59729b35b569`;

    (async () => {
        try{
            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);
            const new_data = {
                "location": data.name,
                "temp": parseFloat(data.main.temp - 273.15).toFixed(2),
                "weather": data.weather[0].description
            }
            res.json(new_data);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    })();
})

app.listen(3000);
