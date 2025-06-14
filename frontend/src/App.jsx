import { useState } from "react";
import "./styles/App.css";
import axios from 'axios'
import Navbar2 from "./components/Navbar2";
import WeatherLandingScreen from "./components/WeatherLandingScreen";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Search by city name
  const handleCitySearch = async (city) => {
    if (!city) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/weather?city=${encodeURIComponent(city)}`
      );
      setWeatherData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Search by location
  const handleLocationRequest = async () => {
    setLoading(true);
    setError("");
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      const response = await axios.get(
        `/api/weather?lat=${latitude}&lon=${longitude}`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to get location. Please allow access or search manually."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar2 onCitySearch={handleCitySearch} />
      <WeatherLandingScreen
        weatherData={weatherData}
        loading={loading}
        onCitySearch={handleCitySearch}
        onLocationSearch={handleLocationRequest}
        error = {error}
      />
    </>
  );
}

export default App;
