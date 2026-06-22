import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const menuRef = useRef(null);

  const username = localStorage.getItem("username");
  const isAuthenticated = !!localStorage.getItem("userId");

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleProtectedClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowPopup(true);
    }
  };

  return (
    <>
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <NavLink
            to={isAuthenticated ? "/jobs" : "/login"}
            className="text-2xl font-bold text-blue-700"
          >
            JobPortal
          </NavLink>

          {/* NAVIGATION */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">

            <NavLink
              to={isAuthenticated ? "/jobs" : "#"}
              onClick={handleProtectedClick}
              className="hover:text-blue-700 cursor-pointer" 
            >
              Jobs
            </NavLink>

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  setShowPopup(true);
                }
              }}
              className="hover:text-blue-700 cursor-pointer"
            >
              Companies
            </button>

            {isAuthenticated ? (
              <NavLink
                to="/applications"
                className="hover:text-blue-700 cursor-pointer"
              >
                My Applications
              </NavLink>
            ) : (
              <button
                onClick={() => setShowPopup(true)}
                className="hover:text-blue-700 cursor-pointer"
              >
                My Applications
              </button>
            )}
          </nav>

          {/* USER PROFILE */}
          <div
            className="relative"
            ref={menuRef}
          >
            <div
              onClick={() => {
                if (isAuthenticated) {
                  setShowMenu(!showMenu);
                } else {
                  setShowPopup(true);
                }
              }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <span className="hidden md:block text-sm text-gray-600">
                {isAuthenticated
                  ? `Hello, ${username}`
                  : "Guest User"}
              </span>

              <div className="h-10 w-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-semibold">
                {isAuthenticated
                  ? username?.charAt(0)?.toUpperCase()
                  : "G"}
              </div>
            </div>

            {/* DROPDOWN MENU */}
            {isAuthenticated && showMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl border shadow-lg overflow-hidden">

                <div className="px-4 py-3 border-b">
                  <p className="font-semibold">
                    {username}
                  </p>

                  <p className="text-xs text-gray-500">
                    JobPortal User
                  </p>
                </div>

                <NavLink
                  to="/applications"
                  onClick={() => setShowMenu(false)}
                  className="block cursor-pointer px-4 py-3 hover:bg-gray-100"
                >
                  📄 My Applications
                </NavLink>

                <NavLink
                  to="/jobs"
                  onClick={() => setShowMenu(false)}
                  className="block cursor-pointer px-4 py-3 hover:bg-gray-100"
                >
                  💼 Browse Jobs
                </NavLink>

                <button
                  onClick={logout}
                  className="w-full cursor-pointer text-left px-4 py-3 hover:bg-red-50 text-red-600"
                >
                  🚪 Logout
                </button>

              </div>
            )}
          </div>
        </div>
      </header>

      {/* LOGIN REQUIRED POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">

          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-xl">

            <div className="text-center">

              <div className="text-6xl mb-4">
                🔒
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                Login Required
              </h2>

              <p className="text-gray-600 mt-3">
                Please login first to access jobs,
                applications and other features.
              </p>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 py-2 cursor-pointer border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    if (location.pathname === "/login") {
                      setShowPopup(false);
                    } else {
                      navigate("/login");
                    }
                  }}
                  className="flex-1 py-2 cursor-pointer bg-blue-700 text-white rounded-lg hover:bg-blue-800"
                >
                  Login
                </button>

              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
}