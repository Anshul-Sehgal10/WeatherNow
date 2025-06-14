import React, { useState } from "react";
import { Cloud, Search } from "lucide-react";

const Navbar2 = ({ onCitySearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim()) {
      onCitySearch(searchValue.trim());
    }
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800">
              <Cloud className="text-slate-700 dark:text-slate-300 w-5 h-5" />
            </div>
            <span className="font-light text-slate-900 dark:text-white text-xl sm:text-2xl tracking-tight">
              Weather
            </span>
          </div>

          {/* Search Section */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search location..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-48 sm:w-64 md:w-80 px-4 py-3 pl-10 pr-4 
                           rounded-lg border border-slate-200 dark:border-slate-700 
                           bg-white dark:bg-slate-800 text-slate-900 dark:text-white 
                           placeholder-slate-500 dark:placeholder-slate-400 
                           focus:outline-none focus:ring-2 focus:ring-slate-400 
                           focus:border-transparent transition-all duration-200 
                           shadow-sm hover:shadow-md"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-slate-900 dark:bg-white 
                         text-white dark:text-slate-900 font-medium 
                         rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 
                         focus:outline-none focus:ring-2 focus:ring-slate-400 
                         focus:ring-offset-2 transition-all duration-200 
                         shadow-sm hover:shadow-md"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
