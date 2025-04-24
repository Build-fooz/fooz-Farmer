import React from "react";
import { Link } from "react-router-dom";
import StatBox from "../Components/StatBox";
import TrendingItem from "../Components/TrendingItem";
import ChatSupport from "../Components/ChatSupport";
import Header from "../Components/HomePage/Header";
import { useAnalytics } from "../context/AnalyticsContext";

const Dashboard = () => {
  const { analyticsData, loading, error, refreshAnalytics, isMockData } = useAnalytics();

  return (
    <div>
      <Header />

      <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-6 ">
        <header className="w-full max-w-3xl text-center mb-6">
          <h1 className="text-3xl font-bold text-black">Dashboard Overview</h1>
          <p className="text-black">Monitor your farm products performance</p>
        </header>

        {/* Quick Navigation Links */}
        <div className="w-full max-w-3xl flex justify-center gap-4 mb-6">
          <Link 
            to="/products"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 text-center"
          >
            Manage Products
          </Link>
          <Link 
            to="/order"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-center"
          >
            View Orders
          </Link>
          <button 
            onClick={refreshAnalytics}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Refresh Data
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="font-semibold text-lg mb-4 text-black">
            Dashboard Overview
          </h2>
          
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          {isMockData && (
            <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg mb-4 text-sm">
              <p className="font-semibold">⚠️ Using mock data for demonstration</p>
              <p>The dashboard is currently displaying simulated data because the server connection was not available.</p>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <p className="text-gray-600">Loading analytics data...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-5 mb-6">
                {analyticsData && (
                  <>
                    <StatBox
                      title="Products Listed"
                      value={String(analyticsData.productsListed || 0)}
                      bgColor="bg-blue-100"
                    />
                    <StatBox
                      title="Total Sales"
                      value={`₹${analyticsData.totalSales || 0}`}
                      bgColor="bg-green-100"
                    />
                    <StatBox
                      title="Active Orders"
                      value={String(analyticsData.activeOrders || 0)}
                      bgColor="bg-purple-100"
                    />
                    <StatBox
                      title="Cancelled Orders"
                      value={String(analyticsData.cancelledOrders || 0)}
                      bgColor="bg-red-200"
                    />
                    <StatBox
                      title="Draft Listings"
                      value={String(analyticsData.draftListings || 0)}
                      bgColor="bg-yellow-100"
                    />
                  </>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-md mb-2 text-black">
                  Trending Products
                </h3>
                
                {analyticsData && analyticsData.trendingProducts && analyticsData.trendingProducts.length > 0 ? (
                  analyticsData.trendingProducts.map((product, index) => (
                    <TrendingItem
                      key={index}
                      name={product.name}
                      status={product.status}
                    />
                  ))
                ) : (
                  <p className="text-gray-600 italic p-2">No trending products data available</p>
                )}
              </div>
            </>
          )}

          <ChatSupport />

          <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
            <h3 className="font-semibold text-md text-black">
              Analytics Insights
            </h3>
            <p className="text-black text-sm">Sales Trend</p>
            {analyticsData && analyticsData.salesTrend && analyticsData.salesTrend.labels && (
              <div className="mt-2">
                <p className="text-black text-xs">
                  Showing sales data for the past {analyticsData.salesTrend.labels.length} periods
                </p>
                {/* Here you would integrate a chart component using Chart.js or similar */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
