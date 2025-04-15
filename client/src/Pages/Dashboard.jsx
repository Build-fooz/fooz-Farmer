import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatBox from "../Components/StatBox";
import TrendingItem from "../Components/TrendingItem";
import ChatSupport from "../Components/ChatSupport";
import Header from "../Components/HomePage/Header";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      // Clear any previous errors
      setError(null);

      // Check if we're in development mode and use mock data if needed
      const isDevelopment = import.meta.env.DEV || process.env.NODE_ENV === 'development';
      console.log("Dashboard: Environment:", isDevelopment ? "Development" : "Production");
      
      // Get user ID from auth context
      let userId = user?._id || user?.id;
      console.log("Dashboard: User from auth context:", userId);
      
      // Fallback to localStorage if needed
      if (!userId) {
        console.log("Dashboard: User ID not found in auth context, checking localStorage");
        const userDataStr = localStorage.getItem('userData');
        if (userDataStr) {
          try {
            const userData = JSON.parse(userDataStr);
            userId = userData._id || userData.id;
            console.log("Dashboard: User ID from localStorage:", userId);
          } catch (e) {
            console.error('Dashboard: Error parsing user data from localStorage:', e);
          }
        }
      }

      if (!userId) {
        console.error("Dashboard: No user ID found in auth context or localStorage");
        
        if (isDevelopment) {
          console.log("Dashboard: Using mock data with default ID for development");
          const mockData = generateMockAnalyticsData("dev-user-123");
          setAnalyticsData(mockData);
          setLoading(false);
        } else {
          setError("User ID not found. Please log in again.");
          setLoading(false);
        }
        return;
      }

      // Check for cached data first
      const cachedData = sessionStorage.getItem(`analytics_${userId}`);
      const cachedTimestamp = sessionStorage.getItem(`analytics_timestamp_${userId}`);
      
      // Use cached data if it's less than 5 minutes old
      if (cachedData && cachedTimestamp) {
        const now = new Date().getTime();
        const cacheTime = parseInt(cachedTimestamp, 10);
        const cacheAge = now - cacheTime;
        
        // Cache is valid for 5 minutes (300000 ms)
        if (cacheAge < 300000) {
          console.log("Dashboard: Using cached analytics data");
          setAnalyticsData(JSON.parse(cachedData));
          setLoading(false);
          return;
        } else {
          console.log("Dashboard: Cached data expired, fetching fresh data");
        }
      } else {
        console.log("Dashboard: No cached data found, fetching fresh data");
      }

      try {
        let data;
        
        if (isDevelopment) {
          try {
            // Try server connectivity test first
            console.log("Dashboard: Testing server connectivity...");
            const testResponse = await fetch('/api/analytics-test');
            
            if (testResponse.ok) {
              const testData = await testResponse.json();
              console.log("Dashboard: Server connectivity test succeeded:", testData);
              
              // If test successful, try to get real data
              console.log(`Dashboard: Fetching analytics for user ${userId}`);
              const response = await fetch(`/api/analytics/${userId}`, {
                headers: { 'Accept': 'application/json' }
              });
              
              if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                  data = await response.json();
                  console.log("Dashboard: Analytics data received:", data);
                } else {
                  throw new Error("Server returned non-JSON response");
                }
              } else {
                throw new Error(`Error fetching analytics: ${response.status}`);
              }
            } else {
              throw new Error("Server connectivity test failed");
            }
          } catch (apiError) {
            console.error("Dashboard: API error, using mock data:", apiError);
            // Use mock data in development mode if server call fails
            data = generateMockAnalyticsData(userId);
          }
        } else {
          // In production, always try to get real data
          const response = await fetch(`/api/analytics/${userId}`, {
            headers: { 'Accept': 'application/json' }
          });
          
          if (!response.ok) {
            throw new Error(`Error fetching analytics: ${response.status}`);
          }
          
          data = await response.json();
        }
        
        // Cache the data
        sessionStorage.setItem(`analytics_${userId}`, JSON.stringify(data));
        sessionStorage.setItem(`analytics_timestamp_${userId}`, new Date().getTime().toString());
        
        setAnalyticsData(data);
      } catch (error) {
        console.error("Dashboard: Error fetching analytics data:", error);
        setError(error.message || "Failed to load analytics data");
        
        // Always use mock data in development if real data fails
        if (isDevelopment) {
          console.log("Dashboard: Using mock data for development");
          const mockData = generateMockAnalyticsData(userId);
          setAnalyticsData(mockData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [user]);

  // Helper function to generate mock analytics data
  const generateMockAnalyticsData = (userId) => {
    console.log("Dashboard: Generating mock data for development");
    return {
      userId,
      productsListed: "12",
      totalSales: "24500",
      activeOrders: "5",
      cancelledOrders: "2",
      draftListings: "3",
      trendingProducts: [
        { name: "Organic Turmeric", status: "High Demand" },
        { name: "Ceylon Cinnamon", status: "Trending" },
        { name: "Green Cardamom", status: "Normal" }
      ],
      salesTrend: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [5000, 7500, 10000, 2000]
      },
      _isMockData: true
    };
  };

  // Function to force refresh analytics data
  const refreshAnalytics = () => {
    console.log("Dashboard: Manually refreshing analytics data");
    // Clear cache for this user
    if (user?._id || user?.id) {
      const userId = user._id || user.id;
      sessionStorage.removeItem(`analytics_${userId}`);
      sessionStorage.removeItem(`analytics_timestamp_${userId}`);
    }
    // Refetch data
    setAnalyticsData(null);
    setLoading(true);
    // The useEffect will run again
  };

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
            to="/productListing"
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
          
          {analyticsData && analyticsData._isMockData && (
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
