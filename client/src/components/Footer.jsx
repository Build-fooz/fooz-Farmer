import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#201c2c] text-white">
      <div className="flex px-32 py-10">
        <div className="flex-1">
          <img src="/logo.png" alt="Fooz logo" className="h-20" />
          <p className="text-slate-400">
            Connecting farmers with consumers for a sustainable future.
          </p>
        </div>
        <div className="flex-1">
          <div className="text-xl font-bold">Contact us</div>
          <p className="my-2 flex items-center text-gray-300">
            <img src="/phone.svg" alt="Phone icon" className="h-5" />
            &nbsp;+1 (555) 123-4567
          </p>
          <p className="my-2 flex items-center text-gray-300">
            <img src="/mail.svg" alt="Phone icon" className="h-4" />
            &nbsp; partners@foozfood.com
          </p>
          <p className="my-2 flex items-center text-gray-300">
            <img src="/location-pin.svg" alt="Phone icon" className="h-4" />
            &nbsp; 123 Farming Street, Agricultural District, CA 90210
          </p>
        </div>
        <div className="flex-1 text-gray-400">
          <div className="mb-3 text-xl font-bold text-white">Quick Links</div>
          <p className="w-max hover:underline">
            <a href="">About us</a>
          </p>
          <p className="w-max hover:underline">
            <a href="">Products</a>
          </p>
          <p className="w-max hover:underline">
            <a href="">Partner Benefits</a>
          </p>
          <p className="w-max hover:underline">
            <a href="">FAQs</a>
          </p>
        </div>
        <div className="flex-1">
          <div className="mb-3 text-xl font-bold text-white">Follow Us</div>
          <p className="my-2 flex">
            <a href="" className="mx-1">
              <img src="/facebook.svg" alt="Facebook" className="h-4" />
            </a>
            <a href="" className="mx-1">
              <img src="/twitter.svg" alt="Twitter" className="h-4" />
            </a>
            <a href="" className="mx-1">
              <img src="/instagram.svg" alt="Instagram" className="h-4" />
            </a>
            <a href="" className="mx-1">
              <img src="/linkedin.svg" alt="LinkedIn" className="h-4" />
            </a>
          </p>
        </div>
      </div>
      <div className="mx-40 flex items-center justify-center border-t border-gray-700 py-6 text-gray-400">
        &copy;&nbsp;2024 FoozFood. All rights reserved.
      </div>
    </footer>
  );
}
