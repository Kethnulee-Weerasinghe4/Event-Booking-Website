import { useState } from "react";

export default function TicketModal({ event, onClose, onPurchase }) {
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);

  const total = event.price * quantity;

  const handlePurchase = () => {
    setSuccess(true);
    onPurchase(event, quantity, total);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-2xl shadow-lg p-8 w-[90%] max-w-lg relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* Ticket Image */}
        <div className="w-full h-40 mb-6 rounded-xl overflow-hidden">
          <img
            src="/images/ticket.png"
            alt="Ticket Preview"
            className="w-full h-full object-cover"
          />
        </div>


        {/* Event Info */}
        <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
        <p className="text-gray-400 mb-1">{event.location}</p>
        <p className="text-gray-500 mb-6">{event.date}</p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-3 mb-6">
          <label className="text-gray-300">Tickets:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 px-2 py-1 rounded bg-gray-700 text-white text-center"
          />
          <span className="ml-auto text-lg font-semibold">
            ${event.price} / ticket
          </span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-300 font-medium">Total:</span>
          <span className="text-xl font-bold">${total}</span>
        </div>

        {/* Button */}
        <button
          onClick={handlePurchase}
          className="w-full py-3 rounded-full bg-gradient-to-r from-[#e2c36b] to-[#ff7ac6] text-black font-semibold hover:scale-105 transition"
        >
          Buy
        </button>

        {/* Message */}
        {success && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-lg font-semibold rounded-2xl">
            Purchased!
          </div>
        )}
      </div>
    </div>
  );
}
