import React, { useState, useEffect } from "react";
import { generatePastelColor } from '../utils/colorUtils'; // Add this import

function AddEventForm({ onAddEvent, onClose, initialDate, initialResource }) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (initialDate) {
      const formattedDate = `${initialDate.getFullYear()}-${(
        initialDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${initialDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      setStartTime(`${formattedDate}T09:00`);
      setEndTime(`${formattedDate}T10:00`);
    }
  }, [initialDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      startTime,
      endTime,
      resource: initialResource,
      color: generatePastelColor(), // Add this line to generate a color
    };
    onAddEvent(newEvent);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Add New Event</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <label className="block mb-2">
          <span className="text-gray-700">Start Time</span>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">End Time</span>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </label>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEventForm;