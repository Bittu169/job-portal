import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function JobListPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const username = localStorage.getItem("username");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/jobs/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return res.json();
      })
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.company?.toLowerCase().includes(search.toLowerCase()) ||
        job.location?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredJobs(filtered);
  }, [search, jobs]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* HEADER */}
      <Header />

      {/* MAIN */}
      <main className="mx-auto w-full max-w-7xl px-6 py-8 flex-1">

        {/* WELCOME CARD */}
        <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white shadow-lg">
          <h2 className="text-3xl font-bold">
            Welcome back, {username || "User"} 👋
          </h2>

          <p className="mt-2 text-blue-100">
            Discover new opportunities and apply to your dream jobs today.
          </p>
        </div>

        {/* TOP SECTION */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h2 className="text-2xl font-bold">
              Recommended Jobs
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredJobs.length} jobs available
            </p>
          </div>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search jobs, company, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-20">
            <div className="text-blue-700 text-lg font-medium">
              Loading jobs...
            </div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white border rounded-xl p-10 text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              No Jobs Found 😔
            </h3>

            <p className="text-gray-500 mt-2">
              Try changing your search keywords.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-xl border bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* TITLE */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                  <div>
                    <h3 className="text-xl font-bold text-blue-700">
                      {job.title}
                    </h3>

                    <p className="text-gray-700 mt-1 font-medium">
                      {job.company}
                    </p>
                  </div>

                  <div className="text-xs text-gray-500">
                    Posted:
                    {" "}
                    {job.posted_on
                      ? new Date(job.posted_on).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )
                      : "N/A"}
                  </div>
                </div>

                {/* TAGS */}
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    📍 {job.location}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    💰 {job.salary_range || "Not disclosed"}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    🕒 Full Time
                  </span>
                </div>

                {/* DESCRIPTION */}
                <div className="mt-4">
                  <p className="text-gray-700 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="mt-6 flex justify-end">
                  <NavLink
                    to={`/apply/${job.id}`}
                    className="rounded-lg bg-blue-700 px-5 py-2 text-white font-medium hover:bg-blue-800 transition"
                  >
                    Apply Now →
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      < Footer />
    </div>
  );
}