import { useState } from "react";
import { useRouter } from "next/router";
import { EVENTS } from "../../data/events";
import TicketModal from "../../components/TicketModal";

export default function EventInfo() {
  const router = useRouter();
  const { id } = router.query;
  const event = EVENTS.find((e) => e.id === parseInt(id));

  const [showTickets, setShowTickets] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading event...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Split layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left: Hero Image */}
        <div className="h-[400px] md:h-screen w-full">
          <img
            src={event.hero}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Event Info */}
        <div className="flex flex-col justify-center px-8 py-12 bg-black/80 md:bg-transparent">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{event.title}</h1>
          <p className="text-lg text-gray-300 mb-2">{event.location}</p>
          <p className="text-md text-gray-400 mb-2">{event.date}</p>
          <p className="text-lg text-[#e2c36b] font-semibold mb-8">
            Ticket Price: ${event.price}
          </p>

          <div className="space-y-4 mb-8 text-gray-300 leading-relaxed">
            <p>
              Step into an unforgettable night of music and magic. Join us for{" "}
              <span className="font-semibold">{event.title}</span>, set in the
              heart of {event.location}.
            </p>
            <p>
              Experience world-class performances, breathtaking visuals, and an
              electrifying atmosphere that brings people together from around
              the globe.
            </p>
            <p>
              Don’t miss your chance to be part of this once-in-a-lifetime
              event. Celebrate music, life, and unity in an incredible setting.
            </p>
            <p>{event.description}</p>
          </div>

          <button
            onClick={() => setShowTickets(true)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#A6A09B] to-[#F4F4F5] text-black font-semibold hover:scale-105 transition transform"
          >
            Buy Tickets
          </button>
        </div>
      </div>

      {/* Tickets Modal */}
      {showTickets && (
        <TicketModal event={event} onClose={() => setShowTickets(false)} />
      )}
    </div>
  );
}
