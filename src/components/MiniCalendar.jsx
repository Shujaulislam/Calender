import React from "react";

function MiniCalendar({ currentDate, onDateChange, onPrevMonth, onNextMonth, onClose }) {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="absolute top-full mt-2 z-50 left-2 bg-white shadow-lg rounded-lg p-4 ">
      <div className="flex justify-between items-center mb-2 text-blue-600 ">
        <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <span className=" *:mx-2 ">
        <button onClick={onPrevMonth}>&lt;</button>
        <button onClick={onNextMonth}>&gt;</button>
        </span>
      
      </div>
      <div className="grid grid-cols-7">
        {weekdays.map(day => (
          <div key={day} className="text-center text-xs border-b-2">{day}</div>
        ))}
        {Array(firstDayOfMonth).fill(null).map((_, index) => (
          <div key={`empty-${index}`} className="border-b-2" />
        ))}
        {days.map(day => (
          <button
            key={day}
            onClick={() => {
              onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
              onClose();
            }}
            className={`text-center p-1 border-b-2 hover:bg-blue-100 ${day === currentDate.getDate() ? 'bg-blue-500 text-white rounded' : ''
              }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MiniCalendar;