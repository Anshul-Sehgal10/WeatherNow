import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure dotenv to look for .env file in the backend directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error('OpenWeatherMap API key is not configured');
}

export async function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Weather data not available.");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "City not found.");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
