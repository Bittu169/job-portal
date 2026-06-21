import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer";

export default function LoginPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const json = Object.fromEntries(formData);

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("userId", data.user_id);
        localStorage.setItem("username", data.username);

        setMessage("Login successful ✔");

        setTimeout(() => {
          navigate("/jobs");
        }, 500);
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800">

      {/* HEADER */}
      <Header showLoginPopup={true} />

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div className="hidden md:block">
          <h1 className="text-4xl font-bold leading-tight text-gray-900">
            Find your <span className="text-blue-700">dream job</span> faster 🚀
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Connect with top companies, apply instantly, and track your applications in real-time.
          </p>

          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <p>✔ Verified recruiters</p>
            <p>✔ Instant job matching</p>
            <p>✔ Easy apply system</p>
          </div>
        </div>

        {/* RIGHT LOGIN CARD */}
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border p-8">

          <h2 className="text-2xl font-bold text-center text-gray-900">
            Welcome Back 👋
          </h2>

          <p className="text-center text-sm text-gray-500 mt-1">
            Login to continue your job journey
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            {/* USERNAME */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                name="username"
                required
                placeholder="Enter your username"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-600 outline-none transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-600 outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-xs text-blue-600 font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className={`w-full py-2.5 rounded-lg font-semibold transition ${loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
                } text-white`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* MESSAGE BOX */}
            {message && (
              <div
                className={`text-center text-sm p-2 rounded-lg ${message.includes("successful")
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                  }`}
              >
                {message}
              </div>
            )}

            {/* REGISTER LINK */}
            <p className="text-center text-sm text-gray-600">
              New here?{" "}
              <NavLink
                to="/register"
                className="text-blue-700 font-medium hover:underline"
              >
                Create account
              </NavLink>
            </p>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}