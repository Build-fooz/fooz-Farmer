import React from "react";
import Logo from "../../assets/images/HomePage/logo.png";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between px-10">
      <a href="/">
        <img src={Logo} alt="Fooz logo" className="h-12 w-auto" />
      </a>
      <nav>
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
          href="#register"
          className="ml-6 rounded bg-black px-6 py-2 text-white"
        >
          Join now
        </a>
      </nav>
    </header>
  );
}
