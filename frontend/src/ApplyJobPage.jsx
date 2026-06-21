import React, { useActionState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Header from "./components/Header";

export default function ApplyJobPage() {
  const { jobId } = useParams();

  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  async function applyJobAction() {
    try {
      if (!userId) {
        return {
          success: false,
          message: "Please login before applying.",
        };
      }

      const response = await fetch(
        "http://127.0.0.1:8000/apply/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            applicant: Number(userId),
            job: Number(jobId),
          }),
        }
      );

      const data = await response.json();

      return {
        success: response.ok,
        message:
          data.message ||
          (response.ok
            ? "Application Submitted Successfully"
            : "Application Failed"),
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        message: "Unable to connect to server.",
      };
    }
  }

  const [result, formAction, isPending] =
    useActionState(applyJobAction, null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HEADER */}
     < Header />

      {/* MAIN */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">

        <NavLink
          to="/jobs"
          className="inline-flex items-center gap-2 text-blue-700 hover:underline mb-6"
        >
          ← Back to Jobs
        </NavLink>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-xl border shadow-sm p-6">

              <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Apply for Job
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Submit your application and get noticed by recruiters.
                  </p>
                </div>

                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium">
                  Job ID: #{jobId}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-8">

                <div className="border rounded-lg p-4">
                  <p className="text-gray-500 text-sm">
                    Applicant
                  </p>

                  <p className="font-semibold text-lg">
                    {username}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <p className="text-gray-500 text-sm">
                    Applicant ID
                  </p>

                  <p className="font-semibold text-lg">
                    #{userId}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <p className="text-gray-500 text-sm">
                    Status
                  </p>

                  <p className="font-semibold text-yellow-600">
                    Ready to Apply
                  </p>
                </div>

              </div>

              <div className="mt-8 bg-gray-50 rounded-lg p-5 border">
                <h3 className="font-semibold text-gray-900 mb-3">
                  📌 Application Summary
                </h3>

                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>✔ Your application will be submitted instantly.</li>
                  <li>✔ Recruiters can review your profile.</li>
                  <li>✔ Duplicate applications are automatically prevented.</li>
                  <li>✔ Shortlisted candidates will be contacted directly.</li>
                </ul>
              </div>

              <form action={formAction} className="mt-8">
                <button
                  disabled={isPending}
                  type="submit"
                  className="w-full py-4 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-lg transition disabled:opacity-50"
                >
                  {isPending
                    ? "Submitting Application..."
                    : "🚀 Apply Now"}
                </button>
              </form>

              {result && (
                <div
                  className={`mt-5 p-4 rounded-lg text-center font-medium ${
                    result.success
                      ? "bg-green-50 border border-green-200 text-green-700"
                      : "bg-red-50 border border-red-200 text-red-700"
                  }`}
                >
                  {result.message}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-5">

            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-lg">
                💼 Recruiter Tips
              </h3>

              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>✓ Complete your profile information.</li>
                <li>✓ Keep your resume updated.</li>
                <li>✓ Highlight your technical skills.</li>
                <li>✓ Mention relevant projects.</li>
                <li>✓ Apply only to suitable positions.</li>
              </ul>
            </div>

            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-lg">
                📈 Hiring Process
              </h3>

              <div className="mt-4 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    1
                  </div>
                  <span>Application Submitted</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    2
                  </div>
                  <span>Recruiter Review</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    3
                  </div>
                  <span>Interview Round</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    4
                  </div>
                  <span>Final Selection</span>
                </div>

              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-xl p-5">
              <h3 className="font-bold text-lg">
                🌟 Career Advice
              </h3>

              <p className="mt-3 text-sm">
                Consistently applying and improving your profile
                increases your chances of getting shortlisted.
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          © 2026 JobPortal.com | All rights reserved
        </div>
      </footer>
    </div>
  );
}

