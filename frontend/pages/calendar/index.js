import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import "react-calendar/dist/Calendar.css";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

const EVENTS = [
  { id: 1, title: "Terrra Solis: Mahmut Orhan", date: "September 20, 2025", location: "Terrra Solis - Dubai, UAE", hero: "/images/event1.jpg" },
  { id: 2, title: "Dimitri Vegas & Like Mike", date: "September 24, 2025", location: "Ushuaïa Ibiza - Ibiza, Spain", hero: "/images/event2.jpg" },
  { id: 3, title: "Terrra Solis: Arodes", date: "September 27, 2025", location: "Terrra Solis - Dubai, UAE", hero: "/images/event3.jpg" },
  { id: 4, title: "Terrra Solis: Boris Brejcha", date: "October 4, 2025", location: "Terrra Solis - Dubai, UAE", hero: "/images/event4.jpg" },
  { id: 5, title: "Tomorrowland Brasil", date: "October 10, 2025", location: "Parque Maeda - Itu, São Paulo", hero: "/images/event5.jpg" },
  { id: 6, title: "UNITY at Sphere", date: "October 18, 2025", location: "Sphere - Las Vegas, USA", hero: "/images/event6.jpg" },
  { id: 7, title: "Tomorrowland Expo", date: "October 22, 2025", location: "De Rode Hoed", hero: "/images/event7.jpg" },
  { id: 8, title: "Symphony of Unity", date: "November 11, 2025", location: "Antwerp Expo", hero: "/images/event8.jpg" },
  { id: 9, title: "Atmosphere Antwerp", date: "November 14, 2025", location: "Antwerp, Belgium", hero: "/images/event9.jpg" },
  { id: 10, title: "CORE Medellin", date: "February 21, 2026", location: "Medellin, Colombia", hero: "/images/event10.png" },
  { id: 11, title: "CORE Los Angeles", date: "May 3, 2026", location: "Los Angeles, USA", hero: "/images/event11.jpg" },
  { id: 12, title: "CORE Melbourne", date: "November 28, 2026", location: "Melbourne, Australia", hero: "/images/event12.png" },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);

  const eventDates = EVENTS.map(ev => ({
    ...ev,
    dateObj: new Date(ev.date),
  }));

  const eventsForDate = selectedDate
    ? eventDates.filter(ev => ev.dateObj.toDateString() === selectedDate.toDateString())
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-700 to-gray-200 flex justify-center items-start py-16 px-6">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-12">
        {/* Events Panel */}
        <div className="flex-1 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <Link href="/events">
            <button className="bg-gradient-to-r from-[#e2c36b] to-[#ff7ac6] text-black font-semibold px-4 py-2 rounded-full shadow-lg hover:scale-105 transition mb-4 col-span-full">
              ← Back to Events
            </button>
          </Link>
          {eventsForDate.length > 0 ? (
            eventsForDate.map(ev => (
              <div
                key={ev.id}
                className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:shadow-pink-500/30 transition"
              >
                <img src={ev.hero} alt={ev.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-pink-400">{ev.title}</h2>
                  <p className="text-gray-300 text-sm">{ev.location}</p>
                  <p className="text-gray-400 text-xs mt-1">{ev.date}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic col-span-full text-center mt-12">
              Select a date from the calendar on the right to see events.
            </p>
          )}
        </div>

        {/* Calendar Panel */}
        <div className="flex-1 bg-black/30 backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-white/20">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            locale="en-US"
            next2Label={null}
            prev2Label={null}
            className="glass-calendar"
            tileContent={({ date, view }) => {
              if (view === "month") {
                const hasEvent = eventDates.find(ev => ev.dateObj.toDateString() === date.toDateString());
                return hasEvent ? (
                  <div className="w-2 h-2 mx-auto mt-1 rounded-full bg-gradient-to-r from-[#e2c36b] to-[#ff7ac6]" />
                ) : null;
              }
              return null;
            }}
            showNeighboringMonth={false}
          />
        </div>
      </div>

      <style jsx global>{`
        .glass-calendar {
          width: 100%;
          font-size: 1rem;
          background: transparent;
          color: white;
          border: none;
        }
        .glass-calendar .react-calendar__tile {
          border-radius: 12px;
          margin: 4px;
          padding: 15px 0;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(6px);
          transition: all 0.2s ease;
          text-align: center;
          color: white !important; /* remove red or gray for out-of-month dates */
        }
        .glass-calendar .react-calendar__tile:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        .glass-calendar .react-calendar__tile--active {
          background: linear-gradient(to right, #e2c36b, #ff7ac6) !important;
          color: black !important;
          font-weight: bold;
        }
        .glass-calendar .react-calendar__month-view__weekdays {
          font-size: 0.85rem;
          font-weight: bold;
          color: #ff7ac6;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .glass-calendar .react-calendar__navigation button {
          color: white;
          font-weight: bold;
          min-width: 60px;
        }
        .glass-calendar .react-calendar__navigation button:hover {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
