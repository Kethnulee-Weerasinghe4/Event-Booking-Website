import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function MyAccount() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("personal");
  const [avatar, setAvatar] = useState("/images/default-avatar.png");

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Please sign in to view your account.</p>
      </div>
    );
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    { id: "personal", label: "Personal Details" },
    { id: "tickets", label: "Purchased Tickets" },
    { id: "payment", label: "Payment Summary" },
    { id: "history", label: "Event History" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="bg-white/5 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
            <p className="mb-2"><span className="font-medium">Name:</span> {session.user.name}</p>
            <p><span className="font-medium">Email:</span> {session.user.email}</p>
          </div>
        );
      case "tickets":
        // Retrieve purchased tickets from localStorage
        const purchasedTickets = JSON.parse(
          typeof window !== "undefined" ? localStorage.getItem("tickets") || "[]" : "[]"
        );

        return (
          <div className="bg-white/5 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Purchased Tickets</h2>
            {purchasedTickets.length === 0 ? (
              <p>No tickets purchased yet.</p>
            ) : (
              <ul className="list-disc pl-5">
                {purchasedTickets.map((ticket, idx) => (
                  <li key={idx}>
                    Event ID: {ticket.eventId}, Quantity: {ticket.quantity}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case "payment":
        return (
          <div className="bg-white/5 p-6 rounded-lg shadow-md flex flex-col items-center gap-3">
            <h2 className="text-xl font-semibold mb-2">Payment Summary</h2>
            <p>Total Spent: $0</p>
            <button className="mt-2 px-6 py-2 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition">
              Download Bill
            </button>
          </div>
        );
      case "history":
        return (
          <div className="bg-white/5 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Event History</h2>
            <p>No events attended yet.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">My Account</h1>
        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-left px-4 py-2 rounded-md transition ${activeTab === item.id
                  ? "bg-gradient-to-r from-[#e2c36b] to-[#ff7ac6] text-black font-semibold"
                  : "hover:bg-white/10"
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          {/* Glass-like Sign Out button */}
          <button
            onClick={() => signOut({ callbackUrl: "/account/signin" })}
            className="w-full mt-6 px-4 py-3 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Back to Home */}
      <Link href="/">
        <button className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded bg-gradient-to-r from-[#A6A09B] to-[#F4F4F5] text-black font-semibold hover:opacity-90 transition">
          <FaHome /> Home
        </button>
      </Link>

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col items-center gap-8">
        {/* Centered Avatar */}
        <div className="flex flex-col items-center gap-4">
          <label htmlFor="avatarUpload" className="cursor-pointer">
            <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-[#e2c36b] to-[#ff7ac6] flex items-center justify-center overflow-hidden border-4 border-white/20 shadow-lg">
              <img
                src={avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </label>
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        {/* User Info */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">{session.user.name}</h2>
          <p className="text-gray-300">{session.user.email}</p>
        </div>

        {/* Dynamic Content */}
        <div className="w-full max-w-3xl">{renderContent()}</div>
      </main>
    </div>
  );
}
