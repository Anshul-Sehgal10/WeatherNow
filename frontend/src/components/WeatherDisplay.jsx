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
  // If no data provided, show loading state
  if (!weatherData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-48 mb-6"></div>
            <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getWeatherIcon = (condition, size = 64) => {
    const iconProps = { size, className: "text-slate-600 dark:text-slate-300" };
    
    switch (condition?.toLowerCase()) {
      case 'clear':
      case 'clear sky':
        return <Sun {...iconProps} className="text-yellow-500" />;
      case 'clouds':
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':
        return <Cloud {...iconProps} />;
      case 'rain':
      case 'shower rain':
      case 'light rain':
      case 'moderate rain':
      case 'heavy intensity rain':
      case 'drizzle':
        return <CloudRain {...iconProps} className="text-blue-500" />;
      case 'snow':
      case 'light snow':
      case 'heavy snow':
        return <CloudSnow {...iconProps} className="text-blue-300" />;
      case 'thunderstorm':
        return <Zap {...iconProps} className="text-yellow-600" />;
      default:
        return <Cloud {...iconProps} />;
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-8 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              <h1 className="text-2xl font-light text-slate-900 dark:text-white">
                {weatherData.name || 'Unknown Location'}
              </h1>
              {weatherData.sys?.country && (
                <span className="text-slate-500 dark:text-slate-400 text-lg">
                  {weatherData.sys.country}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500 dark:text-slate-400">
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
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800">
                {getWeatherIcon(weatherData.weather?.[0]?.main)}
              </div>
              <div>
                <div className="text-5xl font-extralight text-slate-900 dark:text-white mb-2">
                  {Math.round(weatherData.main?.temp) || 0}°
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-300 capitalize">
                  {weatherData.weather?.[0]?.description || 'Unknown'}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-slate-500 dark:text-slate-400 text-sm mb-1">Feels like</div>
              <div className="text-2xl font-light text-slate-700 dark:text-slate-200">
                {Math.round(weatherData.main?.feels_like) || 0}°
              </div>
            </div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Wind */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Wind className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Wind</span>
              </div>
              <div className="text-2xl font-light text-slate-900 dark:text-white mb-1">
                {Math.round((weatherData.wind?.speed || 0) * 3.6)} km/h
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {getWindDirection(weatherData.wind?.deg)} direction
              </div>
            </div>

            {/* Humidity */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Droplets className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Humidity</span>
              </div>
              <div className="text-2xl font-light text-slate-900 dark:text-white mb-1">
                {weatherData.main?.humidity || 0}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Relative humidity
              </div>
            </div>

            {/* Visibility */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Eye className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Visibility</span>
              </div>
              <div className="text-2xl font-light text-slate-900 dark:text-white mb-1">
                {Math.round((weatherData.visibility || 0) / 1000)} km
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Clear visibility
              </div>
            </div>

            {/* Pressure */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Gauge className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Pressure</span>
              </div>
              <div className="text-2xl font-light text-slate-900 dark:text-white mb-1">
                {weatherData.main?.pressure || 0} hPa
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Atmospheric pressure
              </div>
            </div>

            {/* Cloud Coverage */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Cloud className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Clouds</span>
              </div>
              <div className="text-2xl font-light text-slate-900 dark:text-white mb-1">
                {weatherData.clouds?.all || 0}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Cloud coverage
              </div>
            </div>

            {/* Wind Gust */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Wind className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Wind Gust</span>
              </div>
              <div className="text-2xl font-light text-slate-900 dark:text-white mb-1">
                {Math.round((weatherData.wind?.gust || 0) * 3.6)} km/h
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Maximum gust speed
              </div>
            </div>

          </div>
        </div>

        {/* Sunrise/Sunset */}
        {weatherData.sys && (
          <div className="px-8 pb-8">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800/30 dark:to-slate-700/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Sunrise className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  <div>
                    <div className="text-sm text-slate-600 dark:text-slate-300 mb-1">Sunrise</div>
                    <div className="text-lg font-medium text-slate-900 dark:text-white">
                      {formatTime(weatherData.sys.sunrise)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Sunset className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  <div>
                    <div className="text-sm text-slate-600 dark:text-slate-300 mb-1">Sunset</div>
                    <div className="text-lg font-medium text-slate-900 dark:text-white">
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
  );
};

export default WeatherDisplay;