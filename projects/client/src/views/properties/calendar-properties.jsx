import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link dari React Router

function CalendarTenants() {
  const [properties, setProperties] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch data dari backend menggunakan Axios
    axios.get('/properties')
      .then((response) => setProperties(response.data))
      .catch((error) => console.error(error));

    axios.get('/rooms')
      .then((response) => setRooms(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Konversi data kamar ke format yang diterima oleh react-date-range
  const roomEvents = rooms.map((room) => ({
    startDate: parseISO(room.start), // Ubah ke tipe Date
    endDate: parseISO(room.end), // Ubah ke tipe Date
    summary: room.name, // Nama kamar
  }));

  // Membuat fungsi untuk menentukan apakah suatu tanggal tersedia
  const isDateAvailable = (date) => {
    for (const room of roomEvents) {
      if (date >= room.startDate && date < room.endDate) {
        return true;
      }
    }
    return false;
  };

  // Mendefinisikan tampilan kustom jika suatu tanggal tidak tersedia
  const unavailableDayContent = (
    <div className="text-red-500">
      <i className="fas fa-times-circle" /> Not Available
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-semibold mb-4">Tenant Properties and Rooms Available Calendar</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Calendar
          date={new Date()}
          events={roomEvents}
          minDate={new Date()}
          onDateChange={() => {}}
          onEventClick={() => {}}
          dateContent={(date) => (
            isDateAvailable(date) ? date.getDate() : unavailableDayContent
          )}
        />
        <Link to="/dashboard"> {/* Tombol untuk kembali ke dashboard */}
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CalendarTenants;
