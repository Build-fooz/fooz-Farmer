import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/HomePage/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showSignupOptions, setShowSignupOptions] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  // Refs to handle outside clicks
  const loginDropdownRef = useRef(null);
  const signupDropdownRef = useRef(null);

  // Function to close dropdowns on outside click
  const handleClickOutside = (event) => {
    if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target)) {
      setShowLoginOptions(false);
    }
    if (signupDropdownRef.current && !signupDropdownRef.current.contains(event.target)) {
      setShowSignupOptions(false);
    }
  };

  useEffect(() => {
    // Add event listener on mount
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loginOptions = (
    <div
      ref={loginDropdownRef}
      className="absolute top-12 right-0 md:right-auto md:left-0 w-48 bg-white border shadow-md z-50 rounded-md origin-top-right transition-all duration-150 ease-in-out"
    >
      <Link
        to="/UserLogin"
        className="block px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm"
      >
        Login as User
      </Link>
      <Link
        to="/auth"
        className="block px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm"
      >
        Login as Partner
      </Link>
    </div>
  );

  const signupOptions = (
    <div
      ref={signupDropdownRef}
      className="absolute top-12 right-0 md:right-auto md:left-0 w-48 bg-white border shadow-md z-50 rounded-md origin-top-right transition-all duration-150 ease-in-out"
    >
      <Link
        to="/UserSignup"
        className="block px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm"
      >
        Signup as User
      </Link>
      <Link
        to="/register"
        className="block px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm"
      >
        Signup as Partner
      </Link>
    </div>
  );

  return (
    <header className="flex h-20 w-screen items-center justify-between px-5 md:px-10 relative bg-white shadow-sm">
      {showSidebar && (
        <div
          className={`fixed z-20 top-0 left-0 w-screen h-screen bg-white text-black flex md:hidden justify-center items-center flex-col transition-transform duration-300 transform ${
            showSidebar ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="absolute top-4 right-4">
            <RxCross1
              onClick={() => setShowSidebar(false)}
              className="cursor-pointer text-3xl"
            />
          </div>
          <Link to="/about" className="mx-4 my-4 text-xl" onClick={() => setShowSidebar(false)}>
            About us
          </Link>
          <a className="mx-4 my-4 text-xl" href="#products" onClick={() => setShowSidebar(false)}>
            Products
          </a>
          <a className="mx-4 my-4 text-xl" href="#testimonials" onClick={() => setShowSidebar(false)}>
            Testimonials
          </a>
          <a className="mx-4 my-4 text-xl" href="#footer" onClick={() => setShowSidebar(false)}>
            Contact
          </a>

          {isAuthenticated ? (
            <>
              <Link to="/userdashboard" className="mx-4 my-4 text-xl" onClick={() => setShowSidebar(false)}>
                Dashboard
              </Link>
              <button
                onClick={() => { logout(); setShowSidebar(false); }}
                className="mx-4 my-4 text-xl text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="relative">
                <button
                  onClick={() => {
                    setShowLoginOptions(!showLoginOptions);
                    setShowSignupOptions(false);
                  }}
                  className="mx-4 my-4 text-xl text-blue-600"
                >
                  Login
                </button>
                {showLoginOptions && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border shadow-md z-50 rounded-md">
                    <Link to="/UserLogin" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowSidebar(false)}>Login as User</Link>
                    <Link to="/auth" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowSidebar(false)}>Login as Partner</Link>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    setShowSignupOptions(!showSignupOptions);
                    setShowLoginOptions(false);
                  }}
                  className="ml-6 rounded bg-black px-6 py-2 text-white text-xl"
                >
                  JOIN NOW
                </button>
                {showSignupOptions && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border shadow-md z-50 rounded-md">
                    <Link to="/UserSignup" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowSidebar(false)}>Signup as User</Link>
                    <Link to="/register" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowSidebar(false)}>Signup as Partner</Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
      <Link to="/">
        <img src={Logo} alt="Fooz logo" className="h-12 w-auto" />
      </Link>
      <nav className="hidden md:flex items-center relative">
        <Link to="/about" className="mx-4 hover:text-gray-600">
          About us
        </Link>
        <a className="mx-4 hover:text-gray-600" href="#products">
          Products
        </a>
        <a className="mx-4 hover:text-gray-600" href="#testimonials">
          Testimonials
        </a>
        <a className="mx-4 hover:text-gray-600" href="#footer">
          Contact
        </a>

        {isAuthenticated ? (
          <>
            <div className="flex items-center">
              {user && (
                <span className="mr-4 font-medium text-gray-700">
                  Welcome, {user.fullName?.split(' ')[0] || 'Farmer'}
                </span>
              )}
              <Link
                to="/userdashboard"
                className="mx-2 px-4 py-2 rounded text-blue-600 border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="ml-2 px-4 py-2 rounded text-red-600 border border-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="relative" ref={loginDropdownRef}>
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission or navigation
                  setShowLoginOptions(!showLoginOptions);
                  setShowSignupOptions(false);
                }}
                className="mx-2 px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                Login
              </button>
              {showLoginOptions && loginOptions}
            </div>
            <div className="relative" ref={signupDropdownRef}>
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission or navigation
                  setShowSignupOptions(!showSignupOptions);
                  setShowLoginOptions(false);
                }}
                className="ml-2 rounded bg-black px-6 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                JOIN NOW
              </button>
              {showSignupOptions && signupOptions}
            </div>
          </>
        )}
      </nav>

      <button
        className="md:hidden focus:outline-none"
        onClick={() => setShowSidebar(true)}
      >
        <RxHamburgerMenu className="text-3xl" />
      </button>
    </header>
  );
}