import React, { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import Calendar from "./components/Calendar";
import BottomBar from "./components/BottomBar";
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { isDarkMode } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const resources = [
    "Resource A",
    "Resource B",
    "Resource C",
    "Resource D",
    "Resource E",
    "Resource F",
    "Resource G",
    "Resource H",
    "Resource I",
    "Resource J",
    "Resource K",
    "Resource L",
    "Resource M",
    "Resource N",
    "Resource O",
  ];

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events") || "{}");
    setEvents(savedEvents);
  }, []);

  const saveEvents = (newEvents) => {
    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedEvents = { ...events };

    const sourceEvents = updatedEvents[source.droppableId] || [];
    const [movedEvent] = sourceEvents.splice(source.index, 1);

    const destEvents = updatedEvents[destination.droppableId] || [];
    destEvents.splice(destination.index, 0, movedEvent);

    const [year, month, day, resource] = destination.droppableId.split("-");
    movedEvent.date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    movedEvent.resource = resource;

    if (sourceEvents.length === 0) {
      delete updatedEvents[source.droppableId];
    } else {
      updatedEvents[source.droppableId] = sourceEvents;
    }
    updatedEvents[destination.droppableId] = destEvents;

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