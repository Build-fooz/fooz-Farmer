import React from "react";

// Component to display recent deliveries
const RecentDeliveries = ({ deliveries }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mt-6">
    <h2 className="font-semibold text-lg mb-4 text-black">Recent Deliveries</h2>
    <div className="border p-4 rounded-lg space-y-2">
      {deliveries.map((delivery) => (
        <div key={delivery.id} className="flex justify-between text-black">
          <p>Order #{delivery.id} - Delivered {delivery.date}</p>
          <span className="text-green-500">✔ {delivery.status}</span>
        </div>
      ))}
    </div>
  </div>
);

export default RecentDeliveries;
