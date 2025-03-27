import React, { useEffect, useState } from "react";
import DeliveryCard from "../Components/Delivery/DeliveryCard";
import RecentDeliveries from "../Components/Delivery/RecentDeliveries";

const DeliveryDashboard = ({ deliveryId }) => {
  const [deliveryData, setDeliveryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/deliveries/${deliveryId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch delivery data");
        }
        const data = await response.json();
        setDeliveryData(data);
      } catch (error) {
        console.error("Error fetching delivery data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryData();
  }, [deliveryId]);

  if (loading) return <p>Loading delivery details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-6">
      <header className="w-full max-w-3xl text-center mb-6">
        <h1 className="text-3xl font-bold text-black">Delivery Status</h1>
        <p className="text-black">Track your product deliveries in real-time</p>
      </header>

      {deliveryData ? (
        <>
          <DeliveryCard deliveryData={deliveryData} />
          <RecentDeliveries deliveries={deliveryData.recentDeliveries} />
        </>
      ) : (
        <p>No delivery data available</p>
      )}
    </div>
  );
};

export default DeliveryDashboard;
