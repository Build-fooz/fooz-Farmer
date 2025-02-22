import React from "react";
import StatBox from "../Components/StatBox";
import TrendingItem from "../Components/TrendingItem";
import ChatSupport from "../Components/ChatSupport";

const Dashboard = () => {
    return (
      <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-6">
        <header className="w-full max-w-3xl text-center mb-6">
          <h1 className="text-3xl font-bold text-black">Dashboard Overview</h1>
          <p className="text-black">Monitor your farm products performance</p>
        </header>
  
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="font-semibold text-lg mb-4 text-black">Dashboard Overview</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatBox title="Products Listed" value="12" bgColor="bg-blue-100" />
            <StatBox title="Total Sales" value="₹24,500" bgColor="bg-green-100" />
            <StatBox title="Active Orders" value="5" bgColor="bg-purple-100" />
          </div>
  
          <div className="mb-6">
            <h3 className="font-semibold text-md mb-2 text-black">Trending Products</h3>
            <TrendingItem name="Organic Tomatoes" status="High Demand" />
            <TrendingItem name="Fresh Spinach" status="Trending" />
          </div>
  
          <ChatSupport />
  
          <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
            <h3 className="font-semibold text-md text-black">Analytics Insights</h3>
            <p className="text-black text-sm">Sales Trend</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;