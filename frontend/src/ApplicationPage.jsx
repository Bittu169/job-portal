import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function ApplicationPage() {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/my_applications/${userId}/`)
            .then((res) => res.json())
            .then((data) => {
                setApplications(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [userId]);

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case "shortlisted":
                return "bg-green-100 text-green-700";

            case "rejected":
                return "bg-red-100 text-red-700";

            case "hired":
                return "bg-blue-100 text-blue-700";

            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-lg">
                Loading Applications...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <Header />

            {/* Main */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl p-8 text-white mb-8">
                    <h2 className="text-3xl font-bold">
                        My Applications
                    </h2>

                    <p className="mt-2 text-blue-100">
                        Track all your job applications and stay updated with recruiter responses.
                    </p>

                    <div className="mt-6 flex gap-4 flex-wrap">
                        <div className="bg-white/20 px-5 py-3 rounded-lg">
                            <p className="text-sm">Total Applied</p>
                            <h3 className="text-2xl font-bold">
                                {applications.length}
                            </h3>
                        </div>

                        <div className="bg-white/20 px-5 py-3 rounded-lg">
                            <p className="text-sm">Shortlisted</p>
                            <h3 className="text-2xl font-bold">
                                {
                                    applications.filter(
                                        (a) => a.status === "shortlisted"
                                    ).length
                                }
                            </h3>
                        </div>

                        <div className="bg-white/20 px-5 py-3 rounded-lg">
                            <p className="text-sm">Pending</p>
                            <h3 className="text-2xl font-bold">
                                {
                                    applications.filter(
                                        (a) => a.status === "pending"
                                    ).length
                                }
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="mb-6 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-800">
                        Application History
                    </h3>

                    <NavLink
                        to="/jobs"
                        className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                    >
                        Browse More Jobs
                    </NavLink>
                </div>

                {/* Empty State */}
                {applications.length === 0 ? (
                    <div className="bg-white rounded-xl border p-12 text-center">
                        <div className="text-6xl mb-4">📄</div>

                        <h3 className="text-xl font-bold text-gray-800">
                            No Applications Yet
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Start applying to jobs and track them here.
                        </p>

                        <NavLink
                            to="/jobs"
                            className="inline-block mt-4 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
                        >
                            Explore Jobs
                        </NavLink>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {applications.map((application) => (
                            <div
                                key={application.id}
                                className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition p-6"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900">
                                            {application.job_title}
                                        </h4>

                                        <p className="text-gray-600 mt-1">
                                            {application.company}
                                        </p>
                                    </div>

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                                            application.status
                                        )}`}
                                    >
                                        {application.status}
                                    </span>
                                </div>

                                <div className="mt-4 space-y-2 text-sm text-gray-600">
                                    <p>📍 {application.location}</p>
                                    <p>💰 {application.salary_range}</p>

                                    <p>
                                        📅 Applied On:{" "}
                                        {new Date(
                                            application.applied_on
                                        ).toLocaleDateString()}
                                    </p>

                                    <p>
                                        🆔 Application ID: #{application.id}
                                    </p>
                                </div>

                                <NavLink
                                    to={`/application/${application.id}`}
                                    className="block text-center mt-5 w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition"
                                >
                                    View Details
                                </NavLink>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}