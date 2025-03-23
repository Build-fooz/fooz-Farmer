import React, { useState } from "react";
import Logo from "../../assets/images/HomePage/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import AuthForm from "../../Pages/AuthForm";
export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
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
          <a
            href="#register"
            className="ml-6 rounded bg-black px-6 py-2 text-white"
          >
            Join now
          </a>
        </div>
      )}
      <a href="/">
        <img src={Logo} alt="Fooz logo" className="h-12 w-auto" />
      </a>
      <nav className="hidden md:block">
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
        <a
          href="auth"
          className="ml-6 rounded bg-black px-6 py-2 text-white"
        >
          Join now 
        </a>
      </nav>
      {
        <button
          className="md:hidden"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <RxHamburgerMenu />
        </button>
      }
    </header>
  );
}
