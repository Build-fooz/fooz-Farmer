import React from "react";
import Logo from "../../assets/images/HomePage/logo.png";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between px-10">
      <img src={Logo} alt="Fooz logo" className="h-12 w-auto" />
      <nav>
        <a className="mx-4" href="">
          About us
        </a>
        <a className="mx-4" href="">
          Products
        </a>
        <a className="mx-4" href="">
          Testimonials
        </a>
        <a className="mx-4" href="">
          Contact
        </a>
        <button className="ml-6 rounded bg-black px-6 py-2 text-white">
          Join now
        </button>
      </nav>
    </header>
  );
}
