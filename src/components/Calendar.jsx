import React, { useState, useRef, useEffect } from "react";
import Event from "./Event";
import AddEventForm from "./AddEventForm";
import { generatePastelColor, generatePastelColorForResource } from '../utils/colorUtils'
import { useTheme } from '../context/ThemeContext';

function Calendar({ currentDate, events, onEventChange }) {
  // State for managing the add event form
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const calendarRef = useRef(null);
  const { isDarkMode } = useTheme();

  // Initialize resources with pastel colors
  const [resources, setResources] = useState([
    { id: 1, name: 'Resource A', color: generatePastelColorForResource(0) },
    { id: 2, name: 'Resource B', color: generatePastelColorForResource(1) },
    { id: 3, name: 'Resource C', color: generatePastelColorForResource(2) },
    { id: 4, name: 'Resource D', color: generatePastelColorForResource(3) },
    { id: 5, name: 'Resource E', color: generatePastelColorForResource(4) },
    { id: 6, name: 'Resource F', color: generatePastelColorForResource(5) },
    { id: 7, name: 'Resource G', color: generatePastelColorForResource(6) },
    { id: 8, name: 'Resource H', color: generatePastelColorForResource(7) },
    { id: 9, name: 'Resource I', color: generatePastelColorForResource(8) },
    { id: 10, name: 'Resource J', color: generatePastelColorForResource(9) },
    { id: 11, name: 'Resource K', color: generatePastelColorForResource(10) },
    { id: 12, name: 'Resource L', color: generatePastelColorForResource(11) },
    { id: 13, name: 'Resource M', color: generatePastelColorForResource(12) },
    { id: 14, name: 'Resource N', color: generatePastelColorForResource(13) },
    { id: 15, name: 'Resource O', color: generatePastelColorForResource(14) },
  ]);

  // Function to get the next available resource letter
  const getNextResourceLetter = () => {
    const lastResource = resources[resources.length - 1];
    const lastLetter = lastResource.name.split(' ')[1];
    return String.fromCharCode(lastLetter.charCodeAt(0) + 1);
  };

  // Function to add a new resource
  const addResource = () => {
    const newId = resources.length + 1;
    const newLetter = getNextResourceLetter();
    setResources([
      ...resources,
      {
        id: newId,
        name: `Resource ${newLetter}`,
        color: generatePastelColorForResource(newId - 1),
      },
    ]);
  };

  // Function to remove a resource (only for custom added resources)
  const removeResource = (id) => {
    if (id > 15) {
      setResources(resources.filter(resource => resource.id !== id));
    }
  };

  // Calculate the number of days in the current month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Handle cell click to open add event form
  const handleCellClick = (day, resource) => {
    setSelectedDate(day);
    setSelectedResource(resource);
    setShowAddEventForm(true);
  };

  // Handle adding a new event
  const handleAddEvent = (newEvent) => {
    const dateKey = formatDateKey(selectedDate, selectedResource);
    const updatedEvents = { ...events };
    if (!updatedEvents[dateKey]) {
      updatedEvents[dateKey] = [];
    }
    updatedEvents[dateKey].push({
      ...newEvent,
      id: Date.now().toString(),
      date: selectedDate,
      resource: selectedResource,
      duration: 1,
      color: generatePastelColor(), // Generate a pastel color for the new event
    });
    onEventChange(updatedEvents);
    setShowAddEventForm(false);
  };

  // Handle deleting an event
  const handleDeleteEvent = (dateKey, event) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const newEvents = { ...events };
      newEvents[dateKey] = newEvents[dateKey].filter((e) => e !== event);
      if (newEvents[dateKey].length === 0) delete newEvents[dateKey];
      onEventChange(newEvents);
    }
  };

  // Handle resizing an event
  const handleEventResize = (event, newDuration) => {
    const dateKey = formatDateKey(event.date, event.resource);
    const updatedEvents = { ...events };
    const index = updatedEvents[dateKey].findIndex((e) => e.id === event.id);
    updatedEvents[dateKey][index] = { ...event, duration: newDuration };
    onEventChange(updatedEvents);
  };

  // Handle start of drag operation
  const handleDragStart = (event, dateKey) => {
    setDraggedEvent({ event, originalDateKey: dateKey });
  };

  // Handle drag over operation
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop operation for drag and drop
  const handleDrop = (e, targetDate, targetResource) => {
    e.preventDefault();
    if (!draggedEvent) return;

    const { event, originalDateKey } = draggedEvent;
    const targetDateKey = formatDateKey(targetDate, targetResource);

    if (originalDateKey === targetDateKey) return;

    const updatedEvents = { ...events };

    // Remove event from original date
    updatedEvents[originalDateKey] = updatedEvents[originalDateKey].filter(e => e.id !== event.id);
    if (updatedEvents[originalDateKey].length === 0) delete updatedEvents[originalDateKey];

    // Add event to new date without changing the color
    if (!updatedEvents[targetDateKey]) {
      updatedEvents[targetDateKey] = [];
    }
    updatedEvents[targetDateKey].push({
      ...event,
      date: targetDate,
      resource: targetResource,
      color: event.color, // Ensure the color remains unchanged
    });

    onEventChange(updatedEvents);
    setDraggedEvent(null);
  };

  // Helper function to format date key
  const formatDateKey = (date, resource) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}-${resource}`;
  };

  // Render the header of the calendar
  const renderHeader = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const isToday = day.toDateString() === new Date().toDateString();
      days.push(
        <div
          key={i}
          className={`sticky top-0 z-10 p-1 w-20 h-7 font-light border-r border-b ${isToday
              ? isDarkMode
                ? "bg-blue-900"
                : "bg-blue-100"
              : isDarkMode
                ? "bg-gray-800"
                : "bg-gray-50"
            }`}
        >
          <div className="text-sm text-black">
            {i} {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day.getDay()]}
          </div>
        </div>
      );
    }
    return days;
  };

  // Render the main calendar grid
  const renderCalendar = () => {
    const cells = [];
    resources.forEach((resource, resourceIndex) => {
      cells.push(
        <div
          key={`resource-${resourceIndex}`}
          className={`sticky left-0 z-10 p-2 w-48 min-h-16 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-blue-950 '} border-r border-b font-semibold`}
        >
          {resource.name}
        </div>
      );
      for (let i = 1; i <= daysInMonth; i++) {
        const day = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          i
        );
        const dateKey = formatDateKey(day, resource.id);
        const isToday = day.toDateString() === new Date().toDateString();
        cells.push(
          <div
            key={dateKey}
            className={`p-1 w-20 min-h-16 border-r border-b relative cursor-pointer ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            onDoubleClick={() => handleCellClick(day, resource.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, day, resource.id)}
          >
            <div className="flex flex-col">
              {events[dateKey] &&
                events[dateKey].map((event) => (
                  <Event
                    key={event.id}
                    event={event}
                    onDelete={() => handleDeleteEvent(dateKey, event)}
                    onResize={handleEventResize}
                    onDragStart={() => handleDragStart(event, dateKey)}
                  />
                ))}
            </div>
          </div>
        );
      }
    });
    return cells;
  };

  return (
    <div className="my-14">
      <div className="">
        <div
          ref={calendarRef}
          className="grid"
          style={{
            gridTemplateColumns: `192px repeat(${daysInMonth}, 80px)`,
          }}
        >
          <div
            className={`sticky top-0 left-0 z-20 p-1 w-48 h-7 font-light ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} border-r border-b`}
          >
          </div>
          {renderHeader()}
          {renderCalendar()}
          <div className="mt-3 w-full sticky left-0 z-10">
            <button
              onClick={addResource}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Add Resource
            </button>
            {resources.slice(15).map(resource => (
              <span key={resource.id} className="inline-flex items-center mr-2">
                {resource.name}
                <button
                  onClick={() => removeResource(resource.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      {showAddEventForm && (
        <AddEventForm
          onAddEvent={handleAddEvent}
          onClose={() => setShowAddEventForm(false)}
          initialDate={selectedDate}
          initialResource={selectedResource}
        />
      )}
    </div>
  );
}

export default Calendar;