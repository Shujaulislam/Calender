import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const BottomBar = () => {
  // Get theme-related functions from context
  const { isDarkMode, toggleTheme } = useTheme();
  // State for language selection
  const [language, setLanguage] = useState('English');

  // Handle language change
  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className={`z-30 fixed bottom-0 left-0 w-full h-12 flex items-center justify-between px-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
      {/* Platform icons */}
      <div className="flex items-center space-x-2">
        <button className="w-5 h-5 flex items-center justify-center focus:outline-none">
          <img src="/apple-icon.svg" alt="Apple" className={`w-4 h-4 ${isDarkMode ? 'filter invert' : ''}`} />
        </button>
        <button className="w-5 h-5 flex items-center justify-center focus:outline-none">
          <img src="/android-logo.svg" alt="Android" className={`w-4 h-4 ${isDarkMode ? 'filter invert' : ''}`} />
        </button>
        <button className="w-5 h-5 flex items-center justify-center focus:outline-none">
          <img src="/pc-logo.svg" alt="PC" className={`w-4 h-4 ${isDarkMode ? 'filter invert' : ''}`} />
        </button>
      </div>
      
      {/* Theme toggle and language selection */}
      <div className="flex items-center space-x-2">
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className={`px-3 py-1 text-xs font-semibold rounded transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
        >
          {isDarkMode ? 'LIGHT' : 'DARK'}
        </button>
        
        {/* Language selection dropdown */}
        <div className="relative">
          <select
            value={language}
            onChange={changeLanguage}
            className={`appearance-none px-3 py-1 pr-8 text-xs font-semibold rounded transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          >
            <option value="English">English</option>
            <option value="Español">Español</option>
            <option value="Français">Français</option>
          </select>
          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;