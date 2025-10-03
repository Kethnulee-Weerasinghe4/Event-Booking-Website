import React, { useState } from "react";
import Link from "next/link";

export default function AboutPage() {
  const carouselImages = [
    "/images/about1.jpg",
    "/images/about2.jpg",
    "/images/about3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
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
            <Link href="/account" className="px-4 py-2 rounded-full bg-gradient-to-r from-[#A6A09B] to-[#F4F4F5] text-black font-semibold cursor-pointer">My Account</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <img
          src="/images/hero-about.jpg"
          alt="About EventPulse"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            About EventPulse
          </h1>
        </div>
      </section>

      {/* History + Carousel Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* History Text */}
        <div>
          <h2 className="text-3xl font-bold mb-6">History</h2>
          <p className="text-gray-300 leading-relaxed">
            EventPulse since 2019
          </p>
          <p className="text-gray-400 mt-4 leading-relaxed">
            Founded with the vision of simplifying event experiences, EventPulse has grown into a trusted booking management system for festivals, concerts, and live events around the globe.
            What began as a small tool to streamline ticketing and reservations has evolved into a powerful platform that connects organizers and attendees seamlessly.
            <br /><br />
            Over the years, we’ve embraced cutting-edge technologies like real-time analytics, mobile-first ticketing, and integrated payment solutions to empower event organizers and enhance attendee experiences. Today, EventPulse continues to redefine how events are booked and managed, creating a future where technology amplifies the magic of live experiences.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative w-full h-72 md:h-[400px] overflow-hidden rounded-xl">
          <img
            src={carouselImages[currentIndex]}
            alt="Carousel Slide"
            className="w-full h-full object-cover transition-all duration-500"
          />
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black/70 transition"
          >
            &lt;
          </button>
          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black/70 transition"
          >
            &gt;
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer
      className="text-gray-400 py-20"
      style={{ backgroundColor: '#0A0A0A' }}
    >
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
