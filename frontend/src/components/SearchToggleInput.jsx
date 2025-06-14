import { useState, useRef } from "react";
import { Search } from "lucide-react";

const SearchToggleInput = ({ handleCitySearch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [city, setCity] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (city.trim() !== "") {
      handleCitySearch(city.trim());
      setCity("");
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const commonClasses =
    "group w-full max-w-sm mx-auto flex items-center justify-center px-8 py-4 " +
    "bg-white dark:bg-slate-800 text-slate-900 dark:text-white " +
    "font-medium rounded-lg border border-slate-200 dark:border-slate-700 " +
    "hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none " +
    "focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 " +
    "transition-all duration-200 shadow-sm hover:shadow-md";

  return isEditing ? (
    <input
      ref={inputRef}
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      onBlur={handleSubmit}
      onKeyDown={handleKeyDown}
      placeholder="Enter city..."
      className={`${commonClasses} text-center`}
      autoFocus
    />
  ) : (
    <button onClick={() => setIsEditing(true)} className={commonClasses}>
      <Search size={18} className="mr-3" />
      Search Location
    </button>
  );
};

export default SearchToggleInput;
