import React, { useState } from "react";
import MiniCalendar from "./MiniCalendar"; // You'll need to create this component
import { useTheme } from '../context/ThemeContext';

function TopBar({ currentDate, onDateChange, onPrevMonth, onNextMonth }) {
  const { isDarkMode } = useTheme();
  const [showMiniCalendar, setShowMiniCalendar] = useState(false);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleToday = () => {
    onDateChange(new Date());
  };

  const toggleMiniCalendar = () => {
    setShowMiniCalendar(!showMiniCalendar);
  };

  return (
    <div className={`flex justify-between items-center p-2 border-b w-full fixed left-0 top-0 z-30 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 
        className={`text-2xl font-light cursor-pointer ${isDarkMode ? 'text-white' : 'text-blue-600'}`}
        onClick={toggleMiniCalendar}
      >
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h2>
      {showMiniCalendar && (
        <MiniCalendar
          currentDate={currentDate}
          onDateChange={onDateChange}
          onPrevMonth={onPrevMonth}
          onNextMonth={onNextMonth}
          onClose={() => setShowMiniCalendar(false)}
        />
      )}
      <div>
        <button
          onClick={onPrevMonth}
          className={`text-${isDarkMode ? 'white' : 'blue-600'} px-3 py-1 rounded mr-2`}
        >
          &lt;
        </button>
        <button
          onClick={handleToday}
          className={` text-${isDarkMode ? 'white' : 'blue-600'} px-1 py-1 rounded mr-2`}
        >
          Today
        </button>
        <button
          onClick={onNextMonth}
          className={`text-${isDarkMode ? 'white' : 'blue-600'} px-3 py-1 rounded mr-2`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default TopBar;