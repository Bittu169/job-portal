import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import Header from "./components/Header";

export default function ApplicationDetailsPage() {
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/application/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setApplication(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Application Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

     {/* Header  */}
     < Header />

      <main className="max-w-5xl mx-auto px-6 py-8">

        <div className="bg-white rounded-xl border shadow-sm p-8">

          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold">
                {application.job_title}
              </h2>

              <p className="text-gray-600 mt-2">
                {application.company}
              </p>
            </div>

            <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-medium">
              {application.status}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-8">

            <div className="border rounded-lg p-4">
              <p className="text-gray-500">Location</p>
              <p className="font-semibold">
                {application.location}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500">Salary</p>
              <p className="font-semibold">
                {application.salary_range}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500">Applicant</p>
              <p className="font-semibold">
                {application.applicant}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500">Applied On</p>
              <p className="font-semibold">
                {new Date(
                  application.applied_on
                ).toLocaleDateString()}
              </p>
            </div>

          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-3">
              Job Description
            </h3>

            <p className="text-gray-700 leading-relaxed">
              {application.description}
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}