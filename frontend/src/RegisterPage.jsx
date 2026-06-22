import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer";

async function registerAction(_, formData) {
  const json = Object.fromEntries(formData);
  const URL = import.meta.env.VITE_API_URL;

  try {
    const res = await fetch(`${URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });

    const data = await res.json();

    if (res.ok) {
      return { success: true, message: "Registration successful" };
    } else {
      return { success: false, message: data.message || "Registration failed" };
    }
  } catch (err) {
    console.error(err);
    return { success: false, message: "Server error" };
  }
}

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function passwordStrength(password) {
    if (password.length === 0) return "";
    if (password.length < 4) return "Weak";
    if (password.length < 8) return "Medium";
    return "Strong";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    const result = await registerAction(null, new FormData(e.target));

    setLoading(false);
    setMessage(result.message);
    setSuccess(result.success);

    if (result.success) {
      setForm({ username: "", email: "", password: "" });
    }
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* HEADER */}
      <Header showLoginPopup={true} />
      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* LEFT */}
        <section className="hidden md:block">
          <h1 className="text-3xl font-bold leading-snug">
            Find your dream job now
          </h1>

          <p className="mt-4 text-gray-600 max-w-md">
            Register with JobPortal and get matched with the right opportunities.
            Build your profile and apply to jobs in top companies.
          </p>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-700">
              🚀 Tip: Use a strong password for better account security.
            </p>
          </div>
        </section>

        {/* RIGHT FORM */}
        <section className="bg-white border rounded-lg p-8 max-w-md w-full mx-auto shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Create your JobPortal profile
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            {/* Username */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email ID
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none"
              />

              {form.password && (
                <p
                  className={`text-xs mt-1 ${
                    passwordStrength(form.password) === "Strong"
                      ? "text-green-600"
                      : passwordStrength(form.password) === "Medium"
                      ? "text-yellow-600"
                      : "text-red-500"
                  }`}
                >
                  Password strength: {passwordStrength(form.password)}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              type="submit"
              className="w-full cursor-pointer bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded transition disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Register Now"}
            </button>

            {/* MESSAGE */}
            {message && (
              <div
                className={`text-center text-sm p-2 rounded ${
                  success
                    ? "text-green-700 bg-green-50 border border-green-200"
                    : "text-red-600 bg-red-50 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* FOOTER LINKS */}
            <p className="text-sm text-center text-gray-600">
              Already registered?{" "}
              <NavLink
                to="/login"
                className="text-blue-700 font-medium hover:underline"
              >
                Login here
              </NavLink>
            </p>
          </form>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}