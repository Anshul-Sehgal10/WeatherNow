import React, { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Wind, MapPin, Search } from "lucide-react";
import ErrorMessage from './ErrorMessage'
import LoadingComponent from './LoadingComponent'
import SearchToggleInput from "./SearchToggleInput";
import WeatherDisplay from "./WeatherDisplay";

const WeatherLandingScreen = ({ weatherData, loading, onCitySearch, onLocationSearch, error }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const isDay = currentTime.getHours() >= 6 && currentTime.getHours() < 18;

  if (loading) return <LoadingComponent />;
  if (weatherData) return <WeatherDisplay weatherData={weatherData} />;
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
      </div>

      {/* Time Display - Top Right Corner */}
      <div className="absolute top-8 right-8 text-right">
        <div className="text-2xl font-light text-slate-800 dark:text-slate-200 mb-1">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-2xl mx-auto">
          {/* Minimal Weather Icon */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              {isDay ? (
                <Sun size={40} className="text-amber-500" />
              ) : (
                <Cloud
                  size={40}
                  className="text-slate-600 dark:text-slate-400"
                />
              )}
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-extralight text-slate-900 dark:text-white mb-6 tracking-tight">
              WeatherNow
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-lg mx-auto">
              Precise forecasts and real-time conditions for any location
            </p>
          </div>

          {/* Error Message */}
          <ErrorMessage error={error} />

          {/* Action Buttons */}
          <div className="space-y-4 mb-16">
            <button
              onClick={onLocationSearch}
              className="group w-full max-w-sm mx-auto flex items-center justify-center px-8 py-4 
                       bg-slate-900 dark:bg-white text-white dark:text-slate-900 
                       font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 
                       focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 
                       transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <MapPin size={18} className="mr-3" />
              Use Current Location
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900">
                  or
                </span>
              </div>
            </div>

            <SearchToggleInput handleCitySearch={onCitySearch} />
          </div>
        </div>
      </div>

      {/* Minimal Footer Stats */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-8 text-xs text-slate-400 dark:text-slate-500">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            Live Data
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
            Global Coverage
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
            Accurate Forecasts
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherLandingScreen;
