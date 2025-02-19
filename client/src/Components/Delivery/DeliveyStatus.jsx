import React from "react";

// Component to display each delivery status update
const DeliveryStatus = ({ status, date }) => (
  <div className="flex items-center space-x-2">
    <span className="text-green-500">✔</span>
    <div>
      <p className="font-semibold text-black">{status}</p>
      <p className="text-sm text-black">{date}</p>
    </div>
  </div>
);

export default DeliveryStatus;
