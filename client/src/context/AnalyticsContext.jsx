import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getAnalyticsData, storeAnalyticsData, clearAnalyticsData } from '../utils/storage';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch analytics data on mount or when user changes
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (!user) {
        setAnalyticsData(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      // Get user ID
      const userId = user._id || user.id;
      if (!userId) {
        setError('User ID not found');
        setLoading(false);
        return;
      }

      // Check if we're in development mode
      const isDevelopment = import.meta.env.DEV || process.env.NODE_ENV === 'development';
      
      // Try to get cached data first
      const cachedData = getAnalyticsData(userId);
      if (cachedData) {
        setAnalyticsData(cachedData);
        setLoading(false);
        return;
      }

      try {
        let data;
        
        // Try to fetch from API
        try {
          console.log(`Analytics: Fetching data for user ${userId}`);
          const response = await fetch(`/api/analytics/${userId}`, {
            headers: { 'Accept': 'application/json' }
          });
          
          if (!response.ok) {
            throw new Error(`Error fetching analytics: ${response.status}`);
          }
          
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Server returned non-JSON response");
          }
          
          data = await response.json();
          console.log("Analytics: Data received from API", data);
        } catch (apiError) {
          console.error("Analytics: API error:", apiError);
          
          if (isDevelopment) {
            // Use mock data in development
            console.log("Analytics: Using mock data for development");
            data = generateMockData(userId);
          } else {
            throw apiError; // Re-throw in production
          }
        }
        
        // Store the data
        storeAnalyticsData(userId, data);
        setAnalyticsData(data);
      } catch (error) {
        console.error("Analytics: Error fetching data:", error);
        setError(error.message || "Failed to load analytics data");
        
        // For development, always provide mock data
        if (isDevelopment) {
          const mockData = generateMockData(userId);
          setAnalyticsData(mockData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [user]);

  // Generate mock data for development
  const generateMockData = (userId) => {
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

  // Force refresh analytics data
  const refreshAnalytics = async () => {
    if (!user) return;
    
    const userId = user._id || user.id;
    if (!userId) return;
    
    // Clear current data
    clearAnalyticsData(userId);
    setAnalyticsData(null);
    setLoading(true);
    
    try {
      // Fetch fresh data from API
      const response = await fetch(`/api/analytics/${userId}`, {
        headers: { 'Accept': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`Error refreshing analytics: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Store and update state
      storeAnalyticsData(userId, data);
      setAnalyticsData(data);
      setError(null);
    } catch (error) {
      console.error("Error refreshing analytics:", error);
      setError("Failed to refresh analytics data");
      
      // In development, fall back to mock data
      if (import.meta.env.DEV) {
        const mockData = generateMockData(userId);
        setAnalyticsData(mockData);
      }
    } finally {
      setLoading(false);
    }
  };

  // Create context value
  const contextValue = {
    analyticsData,
    loading,
    error,
    refreshAnalytics,
    isMockData: analyticsData?._isMockData || false
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Custom hook to use analytics context
export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}; 