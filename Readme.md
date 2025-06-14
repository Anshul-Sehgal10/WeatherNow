# 🌦️ WeatherNow

**WeatherNow** is a sleek and modern weather web application built with **React** and **Node.js**, providing real-time weather data for any location around the globe. With support for geolocation, manual search, and dynamic visuals, WeatherNow ensures an engaging user experience for weather enthusiasts.

---

## 🚀 Features

- 📍 **Search by City Name**
- 📡 **Use Current Location (Geolocation API)**
- 🌤️ **Live Weather Data via OpenWeather API**
- 🌓 **Light & Dark Mode Support**
- ⏰ **Live Clock & Date Display**
- 📊 **Detailed Weather Metrics**
- 🎨 **Smooth, Responsive UI (TailwindCSS)**

---

## 🛠️ Tech Stack

**Frontend**  
- React (Vite)
- TailwindCSS  
- Axios  
- Lucide Icons  

**Backend**  
- Node.js  
- Express.js  
- dotenv  
- OpenWeatherMap API integration  

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Anshul-Sehgal10/WeatherNow.git
cd WeatherNow
```
### 2. Environment Setup
Create a .env file in the backend folder with the following:

``` ini
API_KEY=your_api_key_here
```
Replace your_api_key_here with your actual OpenWeatherMap API key.

### 3. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Run the App
``` bash
# In one terminal, run backend
cd backend
npm run dev

# In another terminal, run frontend
cd frontend
npm run dev
```
Visit http://localhost:5173 to view the app.


### 📁 Project Structure
``` arduino
WeatherNow/
├── backend/
│   ├── index.js
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   └── vite.config.js
└── README.md
```

### 💡 Inspiration
This project was created to practice real-world full-stack development with real-time APIs, React state handling, and user experience design.

### 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📝 Data Source & Licensing

Weather data is provided by [OpenWeatherMap](https://openweathermap.org/) and used under the  
[Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/)  
and the [Open Database License (ODbL)](https://opendatacommons.org/licenses/odbl/1-0/).

> This app is not endorsed or certified by OpenWeatherMap.
