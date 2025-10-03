import React, { useState } from "react";
import Link from "next/link";
import TicketModal from "./TicketModal";

export default function EventCard({ event }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-black/30 border border-white/10 group hover:shadow-2xl hover:-translate-y-2 transition duration-300">
      {/* Hero Image */}
      <div
        className="h-72 bg-cover bg-center transform group-hover:scale-105 transition duration-500"
        style={{ backgroundImage: `url('${event.hero}')` }}
        role="img"
        aria-label={event.title}
      />

      {/* Event Details */}
      <div className="p-5 flex flex-col justify-between h-52">
        <div>
          <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
          <p className="text-gray-300 mb-2">{event.location}</p>
          <p className="text-gray-400 text-sm mb-4">{event.date}</p>
        </div>

        {/* Info & Tickets Buttons */}
        <div className="flex justify-center gap-3 mt-auto">
          <Link
            href={event.infoLink}
            aria-label={`More info about ${event.title}`}
            className="px-3 py-1 w-24 text-center border border-white/20 rounded-md hover:bg-white/10 transition"
          >
            Info
          </Link>

          {/* Tickets → opens modal */}
          <button
            onClick={() => setShowModal(true)}
            aria-label={`Buy tickets for ${event.title}`}
            className="px-3 py-1 w-24 text-center border border-white/30 rounded-md hover:bg-white/10 transition"
          >
            Tickets
          </button>
        </div>
      </div>
      <a
        onClick={() => handleOpenTickets(event)}
        aria-label={`Buy tickets for ${event.title}`}
        className="px-3 py-1 w-24 text-center border border-white/30 rounded-md hover:bg-white/10 transition cursor-pointer"
      >
        Tickets
      </a>

      {/* Ticket Modal */}
      {showModal && (
        <TicketModal
          event={event}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
