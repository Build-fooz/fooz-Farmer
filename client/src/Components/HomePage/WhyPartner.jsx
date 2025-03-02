import React from "react";

import HandHoldingUSD from "../../assets/images/HomePage/hand-holding-usd.svg";
import GroupOfPeople from "../../assets/images/HomePage/group-of-people.svg";
import DeliveryTruck from "../../assets/images/HomePage/delivery-truck.svg";

export default function WhyPartner() {
  return (
    <section className="py-12">
      <p className="my-2 text-center text-3xl font-bold">
        Why partner with FoozFood?
      </p>
      <p className="my-2 text-center font-medium text-gray-500">
        We're committed to supporting sustainable farming and fair trade
        practices
      </p>
      <div className="my-10 flex justify-center px-2 md:px-40 flex-col md:flex-row">
        <div className="m-4 flex-1 rounded-lg bg-white p-4 shadow">
          <div className="w-max rounded-full bg-gray-200 p-2">
            <img src={HandHoldingUSD} alt="Savings icon" className="h-6" />
          </div>
          <p className="mt-2 text-lg font-bold">Better prices</p>
          <p className="font-medium text-gray-500">
            Get fair prices for your products through our direct-to-customer
            platform.
          </p>
        </div>
        <div className="m-4 flex-1 rounded-lg bg-white p-4 shadow">
          <div className="w-max rounded-full bg-gray-200 p-2">
            <img src={GroupOfPeople} alt="Savings icon" className="h-6" />
          </div>
          <p className="mt-2 text-lg font-bold">Wide Network</p>
          <p className="font-medium text-gray-500">
            Access a large customer base and grow your market react
            significantly.
          </p>
        </div>
        <div className="m-4 flex-1 rounded-lg bg-white p-4 shadow">
          <div className="w-max rounded-full bg-gray-200 p-2">
            <img src={DeliveryTruck} alt="Savings icon" className="h-6" />
          </div>
          <p className="mt-2 text-lg font-bold">Logistics Support</p>
          <p className="font-medium text-gray-500">
            We handle the delivery and distribution, you focus on farming.
          </p>
        </div>
      </div>
    </section>
  );
}
