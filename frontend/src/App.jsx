import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import JobListPage from "./JobListPage";
import ApplyJobPage from "./ApplyJobPage";
import ApplicationPage from "./ApplicationPage";
import ApplicationDetailsPage from "./ApplicationDetailsPage";

import ProtectedRoute from "./config/ProtectedRoute";
import PublicRoute from "./config/PublicRoute";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/apply/:jobId"
          element={
            <ProtectedRoute>
              <ApplyJobPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <ApplicationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/application/:id"
          element={
            <ProtectedRoute>
              <ApplicationDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* Invalid URL */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;