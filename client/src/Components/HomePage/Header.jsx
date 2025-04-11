import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/HomePage/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

import { useAuth } from "../../context/AuthContext";
export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="flex h-20 w-screen items-center justify-between px-10 relative">
      {showSidebar && (
        <div
          className={`absolute z-10 py-20 bg-white text-black flex md:hidden justify-center top-0 items-center flex-col border w-screen left-0`}
        >
          <div className="w-full flex justify-end px-10">
            <RxCross1
              onClick={() => setShowSidebar(!showSidebar)}
              className="cursor-pointer"
            />
          </div>
          <a className="mx-4 my-8" href="/about">
            About us
          </a>
          <a className="mx-4 my-8" href="#products">
            Products
          </a>
          <a className="mx-4 my-8" href="#testimonials">
            Testimonials
          </a>
          <a className="mx-4 my-8" href="#footer">
            Contact
          </a>
          
          {isAuthenticated ? (
            <>
              <Link to="/userdashboard" className="mx-4 my-8">
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="mx-4 my-8 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/auth" 
                className="mx-4 my-8 text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="ml-6 rounded bg-black px-6 py-2 text-white"
              >
                JOIN NOW
              </Link>
            </>
          )}
        </div>
      )}
      <Link to="/">
        <img src={Logo} alt="Fooz logo" className="h-12 w-auto" />
      </Link>
      <nav className="hidden md:flex items-center">
        <a className="mx-4" href="/about">
          About us
        </a>
        <a className="mx-4" href="#products">
          Products
        </a>
        <a className="mx-4" href="#testimonials">
          Testimonials
        </a>
        <a className="mx-4" href="#footer">
          Contact
        </a>

        
        {isAuthenticated ? (
          <>
            <div className="flex items-center">
              {user && (
                <span className="mr-4 font-medium">
                  Welcome, {user.fullName?.split(' ')[0] || 'Farmer'}
                </span>
              )}
              <Link 
                to="/userdashboard" 
                className="mx-2 px-4 py-2 rounded text-blue-600 border border-blue-600"
              >
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="ml-2 px-4 py-2 rounded text-red-600 border border-red-600"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link 
              to="/auth" 
              className="mx-2 px-4 py-2 rounded border border-blue-600 text-blue-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="ml-2 rounded bg-black px-6 py-2 text-white"
            >
              JOIN NOW
            </Link>
          </>
        )}

      </nav>
      
      <button
        className="md:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <RxHamburgerMenu />
      </button>
    </header>
  );
}
