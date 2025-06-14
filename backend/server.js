import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchWeatherByCity, fetchWeatherByCoords } from './services/weatherAPI.js';
dotenv.config();

const app = express();
app.use(cors()); // Add this line before your routes
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.get('/api/weather', async (req, res) => {
    try {
        const { city, lat, lon } = req.query;
        let weatherData;

        if (city) {
            weatherData = await fetchWeatherByCity(city);
        } else if (lat && lon) {
            weatherData = await fetchWeatherByCoords(lat, lon);
        } else {
            return res.status(400).json({ error: 'Please provide either city name or coordinates (lat & lon)' });
        }

        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});