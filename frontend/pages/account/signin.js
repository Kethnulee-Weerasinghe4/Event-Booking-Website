import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/account/myaccount");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-6">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/5 p-6 rounded-xl shadow-lg border border-white/10"
      >
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-2 text-sm">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#ff7ac6]"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#ff7ac6]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-md bg-gradient-to-r from-[#e2c36b] to-[#ff7ac6] text-black font-semibold"
        >
          Sign In
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/account/register" className="text-[#ff7ac6] hover:underline">
            Create One
          </Link>
        </p>
      </form>
    </div>
  );
}
