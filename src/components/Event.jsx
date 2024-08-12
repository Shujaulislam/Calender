import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Event({ event, onDelete, onResize, onDragStart, cellWidth, cellHeight }) {
  // Get the current theme mode
  const { isDarkMode } = useTheme();

  // Helper function to format time string
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  // Determine the text color based on the event's background color
  const textColor = getContrastColor(event.color);

  return (
    <div
      className={`p-1 rounded shadow-sm text-xs mb-2 cursor-move ${
        isDarkMode ? 'shadow-gray-700' : 'shadow-gray-300'
      }`}
      style={{
        width: `${cellWidth}px`,
        height: `${cellHeight}px`,
        backgroundColor: event.color, // Use the event's color
        color: textColor,
      }}
      draggable
      onDragStart={onDragStart}
    >
      <div className="font-semibold truncate">{event.title}</div>
      <div className="truncate">
        {formatTime(event.startTime)}-{formatTime(event.endTime)}
      </div>
      <button 
        onClick={(e) => { e.stopPropagation(); onDelete(); }} 
        className={`text-${textColor === 'white' ? 'red-300' : 'red-700'} hover:text-${textColor === 'white' ? 'red-100' : 'red-900'}`}
      >
        Delete
      </button>
    </div>
  );
}

// Helper function to determine contrast color for text
const getContrastColor = (backgroundColor) => {
  if (!backgroundColor) return 'black';
  const rgb = backgroundColor.match(/\d+/g);
  if (!rgb) return 'black';
  const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
  return brightness > 128 ? 'black' : 'white';
};

export default Event;