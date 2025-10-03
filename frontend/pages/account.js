import React from "react";
import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-6">My Account</h1>
      <p className="text-gray-300 max-w-xl text-center mb-8">
        Manage your profile, bookings, and personalized festival experiences.
      </p>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link href="/account/signin">
          <button className="w-full px-4 py-3 rounded-md bg-gradient-to-r from-[#ff6ea1] to-[#e2c36b] text-black font-semibold">
            Sign In
          </button>
        </Link>
        <Link href="/account/register">
          <button className="w-full px-4 py-3 rounded-md border border-white/20 hover:bg-white/10 transition">
            Create an Account
          </button>
        </Link>
      </div>
    </div>
  );
}
