import React from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  Eye, 
  Wind, 
  Droplets, 
  Thermometer, 
  Gauge,
  Sunrise,
  Sunset,
  MapPin
} from 'lucide-react';

const WeatherDisplay = ({ weatherData }) => {
  // Get dynamic background based on weather condition
  const getWeatherBackground = (condition, timeOfDay = 'day') => {
    const baseClasses = "min-h-screen transition-all duration-1000 ease-in-out";
    
    switch (condition?.toLowerCase()) {
      case 'clear':
      case 'clear sky':
        return timeOfDay === 'night' 
          ? `${baseClasses} bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900`
          : `${baseClasses} bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600`;
      case 'clouds':
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':
        return `${baseClasses} bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600`;
      case 'rain':
      case 'shower rain':
      case 'light rain':
      case 'moderate rain':
      case 'heavy intensity rain':
      case 'drizzle':
        return `${baseClasses} bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800`;
      case 'snow':
      case 'light snow':
      case 'heavy snow':
        return `${baseClasses} bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300`;
      case 'thunderstorm':
        return `${baseClasses} bg-gradient-to-br from-gray-800 via-gray-900 to-black`;
      default:
        return `${baseClasses} bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600`;
    }
  };

  // Determine time of day based on current time and sunrise/sunset
  const getTimeOfDay = () => {
    if (!weatherData?.sys) return 'day';
    const now = Date.now() / 1000;
    const sunrise = weatherData.sys.sunrise;
    const sunset = weatherData.sys.sunset;
    return (now < sunrise || now > sunset) ? 'night' : 'day';
  };

  // If no data provided, show loading state
  if (!weatherData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-4xl w-full">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded w-48 mb-6"></div>
            <div className="h-32 bg-white/20 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 bg-white/20 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getWeatherIcon = (condition, size = 64) => {
    const iconProps = { size, className: "drop-shadow-lg" };
    
    switch (condition?.toLowerCase()) {
      case 'clear':
      case 'clear sky':
        return <Sun {...iconProps} className="text-yellow-300 drop-shadow-lg" />;
      case 'clouds':
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':
        return <Cloud {...iconProps} className="text-white drop-shadow-lg" />;
      case 'rain':
      case 'shower rain':
      case 'light rain':
      case 'moderate rain':
      case 'heavy intensity rain':
      case 'drizzle':
        return <CloudRain {...iconProps} className="text-blue-200 drop-shadow-lg" />;
      case 'snow':
      case 'light snow':
      case 'heavy snow':
        return <CloudSnow {...iconProps} className="text-white drop-shadow-lg" />;
      case 'thunderstorm':
        return <Zap {...iconProps} className="text-yellow-300 drop-shadow-lg" />;
      default:
        return <Cloud {...iconProps} className="text-white drop-shadow-lg" />;
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWindDirection = (deg) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(deg / 22.5) % 16];
  };

  const currentWeatherCondition = weatherData.weather?.[0]?.main;
  const timeOfDay = getTimeOfDay();

  return (
    <div className={getWeatherBackground(currentWeatherCondition, timeOfDay)}>
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden max-w-4xl w-full">
        
        {/* Header Section */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-white/70" />
              <h1 className="text-2xl font-light text-white">
                {weatherData.name || 'Unknown Location'}
              </h1>
              {weatherData.sys?.country && (
                <span className="text-white/70 text-lg">
                  {weatherData.sys.country}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>

          {/* Main Weather Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm">
                {getWeatherIcon(weatherData.weather?.[0]?.main)}
              </div>
              <div>
                <div className="text-5xl font-extralight text-white mb-2">
                  {Math.round(weatherData.main?.temp) || 0}°
                </div>
                <div className="text-lg text-white/80 capitalize">
                  {weatherData.weather?.[0]?.description || 'Unknown'}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/60 text-sm mb-1">Feels like</div>
              <div className="text-2xl font-light text-white/90">
                {Math.round(weatherData.main?.feels_like) || 0}°
              </div>
            </div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Wind */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <Wind className="w-5 h-5 text-white/70" />
                <span className="text-sm font-medium text-white/80">Wind</span>
              </div>
              <div className="text-2xl font-light text-white mb-1">
                {Math.round((weatherData.wind?.speed || 0) * 3.6)} km/h
              </div>
              <div className="text-xs text-white/60">
                {getWindDirection(weatherData.wind?.deg)} direction
              </div>
            </div>

            {/* Humidity */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <Droplets className="w-5 h-5 text-white/70" />
                <span className="text-sm font-medium text-white/80">Humidity</span>
              </div>
              <div className="text-2xl font-light text-white mb-1">
                {weatherData.main?.humidity || 0}%
              </div>
              <div className="text-xs text-white/60">
                Relative humidity
              </div>
            </div>

            {/* Visibility */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <Eye className="w-5 h-5 text-white/70" />
                <span className="text-sm font-medium text-white/80">Visibility</span>
              </div>
              <div className="text-2xl font-light text-white mb-1">
                {Math.round((weatherData.visibility || 0) / 1000)} km
              </div>
              <div className="text-xs text-white/60">
                Clear visibility
              </div>
            </div>

            {/* Pressure */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <Gauge className="w-5 h-5 text-white/70" />
                <span className="text-sm font-medium text-white/80">Pressure</span>
              </div>
              <div className="text-2xl font-light text-white mb-1">
                {weatherData.main?.pressure || 0} hPa
              </div>
              <div className="text-xs text-white/60">
                Atmospheric pressure
              </div>
            </div>

            {/* Cloud Coverage */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <Cloud className="w-5 h-5 text-white/70" />
                <span className="text-sm font-medium text-white/80">Clouds</span>
              </div>
              <div className="text-2xl font-light text-white mb-1">
                {weatherData.clouds?.all || 0}%
              </div>
              <div className="text-xs text-white/60">
                Cloud coverage
              </div>
            </div>

            {/* Wind Gust */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <Wind className="w-5 h-5 text-white/70" />
                <span className="text-sm font-medium text-white/80">Wind Gust</span>
              </div>
              <div className="text-2xl font-light text-white mb-1">
                {Math.round((weatherData.wind?.gust || 0) * 3.6)} km/h
              </div>
              <div className="text-xs text-white/60">
                Maximum gust speed
              </div>
            </div>

          </div>
        </div>

        {/* Sunrise/Sunset */}
        {weatherData.sys && (
          <div className="px-8 pb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Sunrise className="w-6 h-6 text-amber-300" />
                  <div>
                    <div className="text-sm text-white/70 mb-1">Sunrise</div>
                    <div className="text-lg font-medium text-white">
                      {formatTime(weatherData.sys.sunrise)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Sunset className="w-6 h-6 text-orange-300" />
                  <div>
                    <div className="text-sm text-white/70 mb-1">Sunset</div>
                    <div className="text-lg font-medium text-white">
                      {formatTime(weatherData.sys.sunset)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;