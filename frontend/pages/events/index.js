import React, { useState } from "react";
import Link from "next/link";
import TicketModal from "../../components/TicketModal";

const EVENTS = [
  {
    id: 1,
    title: "Terrra Solis: Mahmut Orhan",
    date: "September 20, 2025",
    location: "Terrra Solis - Dubai, UAE",
    hero: "/images/event1.jpg",
    infoLink: "/events/1",
    price: 150,
  },
  {
    id: 2,
    title: "Dimitri Vegas & Like Mike",
    date: "September 24, 2025",
    location: "Ushuaïa Ibiza - Ibiza, Spain",
    hero: "/images/event2.jpg",
    infoLink: "/events/2",
    price: 200,
  },
  {
    id: 3,
    title: "Terrra Solis: Arodes",
    date: "September 27, 2025",
    location: "Terrra Solis - Dubai, UAE",
    hero: "/images/event3.jpg",
    infoLink: "/events/3",
    price: 120,
  },
  {
    id: 4,
    title: "Terrra Solis: Boris Brejcha",
    date: "October 4, 2025",
    location: "Terrra Solis - Dubai, UAE",
    hero: "/images/event4.jpg",
    infoLink: "/events/4",
    price: 180,
  },
  {
    id: 5,
    title: "Tomorrowland Brasil",
    date: "October 10, 2025",
    location: "Parque Maeda - Itu, São Paulo",
    hero: "/images/event5.jpg",
    infoLink: "/events/5",
    price: 250,
  },
  {
    id: 6,
    title: "UNITY at Sphere",
    date: "October 18, 2025",
    location: "Sphere - Las Vegas, USA",
    hero: "/images/event6.jpg",
    infoLink: "/events/6",
    price: 220,
  },
  {
    id: 7,
    title: "Tomorrowland Expo",
    date: "October 22, 2025",
    location: "De Rode Hoed",
    hero: "/images/event7.jpg",
    infoLink: "/events/7",
    price: 200,
  },
  {
    id: 8,
    title: "Symphony of Unity",
    date: "November 11, 2025",
    location: "Antwerp Expo",
    hero: "/images/event8.jpg",
    infoLink: "/events/8",
    price: 170,
  },
  {
    id: 9,
    title: "Atmosphere Antwerp",
    date: "November 14, 2025",
    location: "Antwerp, Belgium",
    hero: "/images/event9.jpg",
    infoLink: "/events/9",
    price: 160,
  },
  {
    id: 10,
    title: "CORE Medellin",
    date: "February 21, 2026",
    location: "Medellin, Colombia",
    hero: "/images/event10.png",
    infoLink: "/events/10",
    price: 190,
  },
  {
    id: 11,
    title: "CORE Los Angeles",
    date: "May 3, 2026",
    location: "Los Angeles, USA",
    hero: "/images/event11.jpg",
    infoLink: "/events/11",
    price: 210,
  },
  {
    id: 12,
    title: "CORE Melbourne",
    date: "November 28, 2026",
    location: "Melbourne, Australia",
    hero: "/images/event12.png",
    infoLink: "/events/12",
    price: 180,
  },
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Video */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          src="/videos/event-hero.mp4"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            EventPulse
          </h1>
        </div>
      </section>

      {/* Calendar Button */}
      <div className="flex justify-center mt-12 mb-16 relative z-20">
        <Link
          href="/calendar"
          className="px-8 py-3 rounded-full bg-gradient-to-r from-[#A6A09B] to-[#F4F4F5] text-black font-semibold text-lg hover:scale-105 transition"
        >
          Open Calendar
        </Link>
      </div>

      {/* Events Section */}
      <main className="relative z-20 px-6 pb-20 max-w-6xl mx-auto -mt-8" id="events">
        <section className="relative grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {EVENTS.map((ev) => (
            <EventCard key={ev.id} event={ev} onTicketsClick={() => setSelectedEvent(ev)} />
          ))}
        </section>
      </main>

      {/* Ticket Modal */}
      {selectedEvent && (
        <TicketModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Header Component
function Header() {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#e2c36b] to-[#ff7ac6] flex items-center justify-center font-bold text-black">
            E
          </div>
          <h1 className="hidden md:block text-lg font-semibold tracking-wider">
            EventPulse
          </h1>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="px-3 py-2 rounded-md hover:bg-white/10 transition">Home</Link>
          <Link href="/about" className="px-3 py-2 rounded-md hover:bg-white/10 transition">About</Link>
          <Link href="/events" className="px-3 py-2 rounded-md hover:bg-white/10 transition">Events</Link>
          <Link
            href="/account"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#A6A09B] to-[#F4F4F5] text-black font-semibold cursor-pointer"
          >
            My Account
          </Link>
        </nav>
      </div>
    </header>
  );
}

// Event Card Component
function EventCard({ event, onTicketsClick }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden bg-black/30 border border-white/10 group hover:shadow-2xl hover:-translate-y-2 transition duration-300">
      <div
        className="h-72 bg-cover bg-center transform group-hover:scale-105 transition duration-500"
        style={{ backgroundImage: `url('${event.hero}')` }}
        role="img"
        aria-label={event.title}
      />
      <div className="p-5 flex flex-col justify-between h-52">
        <div>
          <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
          <p className="text-gray-300 mb-2">{event.location}</p>
          <p className="text-gray-400 text-sm mb-4">{event.date}</p>
          <p className="text-gray-200 font-semibold">${event.price} / ticket</p>
        </div>
        <div className="flex justify-center gap-3 mt-auto">
          <Link
            href={`/events/${event.id}`}
            className="px-3 py-1 w-24 text-center border border-white/20 rounded-md hover:bg-white/10 transition"
          >
            Info
          </Link>
          <button
            onClick={onTicketsClick}
            className="px-3 py-1 w-24 text-center border border-white/30 rounded-md hover:bg-white/10 transition"
          >
            Tickets
          </button>
        </div>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="text-gray-400 py-20" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <div>
          <h4 className="text-white font-semibold mb-3">TOMORROWLAND BELGIUM</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Welcome</a></li>
            <li><a href="#" className="hover:text-white transition">Practical</a></li>
            <li><a href="#" className="hover:text-white transition">Passes & Packages</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Coachella</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Welcome</a></li>
            <li><a href="#" className="hover:text-white transition">Practical</a></li>
            <li><a href="#" className="hover:text-white transition">Passes & Packages</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">ColdPlay</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Welcome</a></li>
            <li><a href="#" className="hover:text-white transition">Practical</a></li>
            <li><a href="#" className="hover:text-white transition">Passes & Packages</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Alan Walker Concert</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Welcome</a></li>
            <li><a href="#" className="hover:text-white transition">Practical</a></li>
            <li><a href="#" className="hover:text-white transition">Passes & Packages</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-10 border-t border-white/20 pt-6 text-gray-500 text-sm flex flex-col md:flex-row justify-between">
        <span>© {new Date().getFullYear()} EventPulse — Mock UI</span>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
