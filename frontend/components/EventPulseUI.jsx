import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import TicketModal from "./TicketModal";

const EVENTS = [
  {
    id: 1,
    title: "Terrra Solis: Mahmut Orhan",
    date: "September 20, 2025",
    location: "Terrra Solis - Dubai, UAE",
    hero: "/images/event1.jpg",
    infoLink: "/events/1",
    price: 150,
    image: "/images/event1.jpg",
  },
  {
    id: 2,
    title: "Dimitri Vegas & Like Mike",
    date: "September 24, 2025",
    location: "Ushuaïa Ibiza - Ibiza, Spain",
    hero: "/images/event2.jpg",
    infoLink: "/events/2",
    price: 200,
    image: "/images/event2.jpg",
  },
  {
    id: 3,
    title: "Terrra Solis: Arodes",
    date: "September 27, 2025",
    location: "Terrra Solis - Dubai, UAE",
    hero: "/images/event3.jpg",
    infoLink: "/events/3",
    price: 120,
    image: "/images/event3.jpg",
  },
  {
    id: 4,
    title: "Terrra Solis: Boris Brejcha",
    date: "October 4, 2025",
    location: "Terrra Solis - Dubai, UAE",
    hero: "/images/event4.jpg",
    infoLink: "/events/4",
    price: 180,
    image: "/images/event4.jpg",
  },
];

export default function EventPulseUI() {
  const { data: session } = useSession();
  const [isVideoSupported, setIsVideoSupported] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    const video = document.createElement("video");
    setIsVideoSupported(!!video && !!video.canPlayType);
  }, []);

  const filteredEvents = EVENTS.filter(
    (ev) =>
      ev.title.toLowerCase().includes(query.toLowerCase()) ||
      ev.location.toLowerCase().includes(query.toLowerCase())
  );

  const handlePurchase = (event, quantity, total) => {
    setUserTickets((prev) => [
      ...prev,
      { eventId: event.id, eventTitle: event.title, quantity, total },
    ]);
    console.log("Updated User Tickets:", userTickets);
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased relative">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#e2c36b] to-[#ff7ac6] flex items-center justify-center font-bold text-black">
              E
            </div>
            <h1 className="hidden md:block text-lg font-semibold tracking-wider">EventPulse</h1>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/"><button className="px-3 py-2 rounded-md hover:bg-white/10 transition">Home</button></Link>
            <Link href="/about"><button className="px-3 py-2 rounded-md hover:bg-white/10 transition">About</button></Link>
            <Link href="/events"><button className="px-3 py-2 rounded-md hover:bg-white/10 transition">Events</button></Link>
            <Link href={session ? "/account/myaccount" : "/account"}>
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#A6A09B] to-[#F4F4F5] text-black font-semibold cursor-pointer">
                My Account
              </span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {isVideoSupported ? (
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-80" poster="/images/hero-poster.jpg">
            <source src="/videos/hero-loop.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-poster.jpg')" }} />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6">
          <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold mb-4">Book Your Pulse Festival</h2>
          <p className="max-w-2xl mx-auto text-gray-300 mb-6">Where Every Booking Meets The Perfect Event</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e2c36b] to-[#ff7ac6] font-semibold shadow-lg"
            >
              Browse Events
            </button>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="flex justify-center mt-10 mb-10 px-6">
        <input
          type="text"
          placeholder="Search events by name or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-2/3 md:w-1/2 px-5 py-3 rounded-full border border-white/20 bg-black/40 text-center focus:outline-none focus:ring-2 focus:ring-[#ff7ac6]"
        />
      </div>

      {/* Events Section */}
      <main className="relative z-10 px-6 pb-20 max-w-6xl mx-auto" id="events">
        <section className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide scroll-smooth">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((ev) => <EventCard key={ev.id} event={ev} setSelectedEvent={setSelectedEvent} />)
            ) : (
              <p className="text-gray-400">No events found.</p>
            )}
          </div>
        </section>
      </main>

      {/* Ticket Modal */}
      {selectedEvent && (
        <TicketModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

// EventCard Component
function EventCard({ event, setSelectedEvent }) {
  return (
    <div className="min-w-full sm:min-w-[50%] md:min-w-[calc(100%/3-1rem)] flex-shrink-0 relative rounded-2xl overflow-hidden bg-black/20 border border-white/10 group hover:shadow-xl transition">
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
          <p className="text-gray-400 text-sm mb-2">{event.date}</p>
          <p className="text-[#e2c36b] font-semibold text-md">${event.price} per ticket</p>
        </div>
        <div className="flex justify-center gap-3 mt-auto">
          <a
            href={event.infoLink}
            aria-label={`More info about ${event.title}`}
            className="px-3 py-1 w-24 text-center border border-white/20 rounded-md hover:bg-white/10 transition"
          >
            Info
          </a>
          <button
            onClick={() => setSelectedEvent(event)}
            aria-label={`Buy tickets for ${event.title}`}
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
        <div>
          <h4 className="text-white font-semibold mb-3">PAYMENT</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">AMEX</a></li>
            <li><a href="#" className="hover:text-white transition">VISA/Master Card</a></li>
            <li><a href="#" className="hover:text-white transition">GooglePay</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">HEAD OFFICE</h4>
          <ul className="space-y-2">
            <li>UAE</li>
            <li>USA</li>
            <li>UK</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">EXPERIENCES</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">UNITY at Sphere</a></li>
            <li><a href="#" className="hover:text-white transition">Digital Music Adventures</a></li>
            <li><a href="#" className="hover:text-white transition">Zephyr</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">MORE</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Inquiry</a></li>
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
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
