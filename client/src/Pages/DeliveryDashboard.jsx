import React, { useEffect, useState } from "react";
import DeliveryCard from "../Components/Delivery/DeliveryCard";
import RecentDeliveries from "../Components/Delivery/RecentDeliveries";
import Header from "../Components/HomePage/Header";

// Sample delivery data for testing before integrating with backend
const sampleDeliveryData = {
  id: "12345",
  product: "Organic Tomatoes",
  quantity: "100kg",
  buyer: "John Smith",
  price: "4500",
  statuses: [
    { name: "Order Processed", date: "Oct 15, 2023 - 9:00 AM" },
    { name: "Picked Up", date: "Oct 15, 2023 - 11:30 AM" },
    { name: "In Transit", date: "Estimated Delivery: Oct 16, 2023" }
  ],
  recentDeliveries: [
    { id: "12345", date : "Oct 15, 2023 - 9:00 AM", status :"Completed" },
  ]
};

// Main component to fetch and display delivery details based on ID
const DeliveryDashboard = ({ deliveryId }) => {
  const [deliveryData, setDeliveryData] = useState(sampleDeliveryData); // Using sample data for now

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const response = await fetch(`/api/deliveries/${deliveryId}`); // Fetch delivery data from API
        const data = await response.json();
        setDeliveryData(data);
      } catch (error) {
        console.error("Error fetching delivery data:", error);
      }
    };
    
    // Commenting out API call for now since we are using sample data
    // fetchDeliveryData();
  }, [deliveryId]); // Re-fetch if deliveryId changes

  return (
      
<div>
<Header />


    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-6">
      {/* Header Section */}
      <header className="w-full max-w-3xl text-center mb-6">
        <h1 className="text-3xl font-bold text-black">Delivery Status</h1>
        <p className="text-black">Track your product deliveries in real-time</p>
      </header>
      {/* Render the delivery card with fetched data */}
      <DeliveryCard deliveryData={deliveryData} />
      {/* Render recent deliveries section */}
      <RecentDeliveries deliveries={deliveryData.recentDeliveries} />
    </div>
    </div>
  );
};

export default DeliveryDashboard;
