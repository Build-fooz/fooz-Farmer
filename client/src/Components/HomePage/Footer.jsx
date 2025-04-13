import React from "react";

import Facebook from "../../assets/images/HomePage/facebook.svg";
import Instagram from "../../assets/images/HomePage/instagram.svg";
import LinkedIn from "../../assets/images/HomePage/linkedin.svg";
import LocationPin from "../../assets/images/HomePage/location-pin.svg";
import Mail from "../../assets/images/HomePage/mail.svg";
import Logo from "../../assets/images/HomePage/logo.png";
import Phone from "../../assets/images/HomePage/phone.svg";
import Twitter from "../../assets/images/HomePage/twitter.svg";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#201c2c] text-white">
      <div className="flex flex-col md:flex-row px-4 md:px-32 py-10 text-center md:text-left">
        <div className="flex-1">
          <img src={Logo} alt="Fooz logo" className="h-20 mx-auto md:mx-0" />
          <p className="text-slate-400">
            Connecting farmers with consumers for a sustainable future.
          </p>
        </div>
        <div className="flex-1 px-10 md:px-0">
          <div className="text-xl font-bold">Contact us</div>
          <p className="my-2 flex items-center justify-center md:justify-start text-gray-300">
            <img src={Phone} alt="Phone icon" className="h-5" />
            &nbsp;+1 (555) 123-4567
          </p>
          <p className="my-2 flex items-center justify-center md:justify-start text-gray-300">
            <img src={Mail} alt="Mail icon" className="h-4" />
            &nbsp; partners@foozfood.com
          </p>
          <p className="my-2 flex items-center justify-center md:justify-start text-gray-300">
            <img src={LocationPin} alt="Location icon" className="h-4" />
            &nbsp; 123 Farming Street, Agricultural District, CA 90210
          </p>
        </div>
        <div className="flex-1 text-gray-400 flex flex-col items-center md:items-start">
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
          <p className="my-2 flex justify-center md:justify-start">
            <a href="https://www.facebook.com/profile.php?id=61567381451953" className="mx-1">
              <img src={Facebook} alt="Facebook" className="h-4" />
            </a>
            <a href="https://x.com/foozfoods" className="mx-1">
              <img src={Twitter} alt="Twitter" className="h-4" />
            </a>
            <a href="https://www.instagram.com/fooz_food_/" className="mx-1">
              <img src={Instagram} alt="Instagram" className="h-4" />
            </a>
            <a href="https://www.linkedin.com/company/fooz-food-spices/posts/?feedView=all&viewAsMember=true" className="mx-1">
              <img src={LinkedIn} alt="LinkedIn" className="h-4" />
            </a>
          </p>
        </div>
      </div>
      <div className="md:mx-40 flex items-center justify-center border-t border-gray-700 py-6 text-gray-400">
        &copy;&nbsp;2024 FoozFood. All rights reserved.
      </div>
    </footer>
  );
}
