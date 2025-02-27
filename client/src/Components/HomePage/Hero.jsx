import React from "react";
import FarmerWithTablet from "../../assets/images/HomePage/farmer-with-tablet.png";

export default function Hero() {
  return (
    <section className="flex items-center">
      <div className="flex-1 px-10">
        <h2 className="text-6xl font-bold">
          Grow Your Farm Business with FoozFoods
        </h2>
        <h4 className="font my-6 text-xl font-medium text-gray-500">
          Join our network of successful farmers and reach more customers. We
          provide the platform, you provide the quality produce.
        </h4>
        <button className="rounded bg-black px-4 py-2 text-lg text-white">
          Start Partnership&nbsp;&nbsp;&rarr;
        </button>
      </div>
      <div className="flex-1">
        <img
          src={FarmerWithTablet}
          alt="Farmer with tablet stock image"
          className="p-8 rounded-[3rem]"
        />
      </div>
    </section>
  );
}
