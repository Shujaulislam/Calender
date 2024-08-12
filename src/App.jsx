import React, { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import Calendar from "./components/Calendar";
import BottomBar from "./components/BottomBar";
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  // Access the current theme mode
  const { isDarkMode } = useTheme();
  
  // State for managing the current date and events
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});

  // List of resources which are pre-rendered
  const resources = [
    "Resource A", "Resource B", "Resource C", "Resource D", "Resource E",
    "Resource F", "Resource G", "Resource H", "Resource I", "Resource J",
    "Resource K", "Resource L", "Resource M", "Resource N", "Resource O",
  ];

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events") || "{}");
    setEvents(savedEvents);
  }, []);

  // Save events to localStorage and update state
  const saveEvents = (newEvents) => {
    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
  };

  // Handler for navigating to the previous month
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Handler for navigating to the next month
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Handler for drag and drop functionality
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedEvents = { ...events };

    // Remove event from source
    const sourceEvents = updatedEvents[source.droppableId] || [];
    const [movedEvent] = sourceEvents.splice(source.index, 1);

    // Add event to destination
    const destEvents = updatedEvents[destination.droppableId] || [];
    destEvents.splice(destination.index, 0, movedEvent);

    // Update event date and resource
    const [year, month, day, resource] = destination.droppableId.split("-");
    movedEvent.date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    movedEvent.resource = resource;

    // Clean up empty date entries
    if (sourceEvents.length === 0) {
      delete updatedEvents[source.droppableId];
    } else {
      updatedEvents[source.droppableId] = sourceEvents;
    }
    updatedEvents[destination.droppableId] = destEvents;

    // Save updated events
    saveEvents(updatedEvents);
  };

  return (
    <div className={`font-sans min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <TopBar
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <Calendar
        currentDate={currentDate}
        events={events}
        onEventChange={saveEvents}
        resources={resources}
      />
      <BottomBar />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;