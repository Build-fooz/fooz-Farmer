import React from "react";
import DeliveryStatus from "./DeliveyStatus";

// Component to display the current delivery details
const DeliveryCard = ({ deliveryData }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
    <h2 className="font-semibold text-lg mb-4 text-black">Current Deliveries</h2>
    {deliveryData ? (
      <div className="border p-4 rounded-lg mb-6">
        <div className="flex justify-between text-black">
          <div>
            <p className="font-bold">Order #{deliveryData.id}</p>
            <p>{deliveryData.product} - {deliveryData.quantity}</p>
            <p>Buyer: {deliveryData.buyer}</p>
          </div>
          <p className="font-bold">₹{deliveryData.price}</p>
        </div>
        {/* Display the list of status updates */}
        <div className="mt-4 space-y-2">
          {deliveryData.statuses.map((status, index) => (
            <DeliveryStatus key={index} status={status.name} date={status.date} />
          ))}
        </div>
        {/* Placeholder for delivery image */}
        <div className="bg-gray-300 h-32 mt-4 flex items-center justify-center">
          <p className="text-black">Image</p>
        </div>
        {/* Action buttons for support and tracking updates */}
        <div className="mt-4 flex space-x-4">
          <button className="bg-black text-white px-4 py-2 rounded-lg flex-1">☎ Contact Support</button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded-lg flex-1">🔔 Track Updates</button>
        </div>
      </div>
    ) : (
      <p className="text-black">Loading delivery data...</p>
    )}
  </div>
);

export default DeliveryCard;
