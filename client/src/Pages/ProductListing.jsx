import Header from "../Components/HomePage/Header";
import { useState, useEffect } from "react";
import Logo from "../assets/images/logo.png";
import { BiHeadphone } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import { getAuthTokens } from "../utils/storage";
import { toast } from "react-toastify";
import { productAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import ProductForm from "../Components/ProductForm";

export default function ProductListing() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from auth context
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  
  // Clear feedback after 3 seconds
  useEffect(() => {
    if (feedback.message) {
      const timer = setTimeout(() => {
        setFeedback({ type: "", message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);
  
  // Check authentication on component mount
  useEffect(() => {
    const { accessToken } = getAuthTokens();
    console.log("Auth token available:", !!accessToken);
    
    if (!accessToken) {
      toast.error("Please login to continue");
      navigate("/auth"); // Fix: Change to the correct auth route
    }
  }, [navigate]);

  // Handle form submission success
  const handleFormSuccess = (data) => {
    if (data.product) {
      toast.success("Product created successfully!");
      setFeedback({
        type: "success",
        message: "Product created successfully! Redirecting to dashboard..."
      });
      
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate("/userdashboard");
      }, 1500);
    } else if (data.draft) {
      toast.success("Draft saved successfully!");
      setFeedback({
        type: "success",
        message: "Draft saved successfully! Redirecting to drafts..."
      });
      
      // Navigate to drafts after a short delay
      setTimeout(() => {
        navigate("/drafts");
      }, 1500);
    }
  };
  
  const stats = [
    { label: "Products Listed", value: "12", bg: "bg-blue-100" },
    { label: "Total Sales", value: "₹24,500", bg: "bg-green-100" },
    { label: "Active Orders", value: "5", bg: "bg-purple-100" },
    { label: "Draft Listings", value: "3", bg: "bg-yellow-100" },
  ];

  return (
    <div>
      <Header />

      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Heading and Subheading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Product Listing</h1>
          <p className="text-black">Monitor your farm products performance</p>
        </div>

        {/* Form Card */}
        <div className="p-4 mb-4 shadow-md rounded-lg bg-white">
          <h2 className="text-lg font-semibold mb-3">Product Listing Overview</h2>
          <h5 className="text-md font-medium mb-3">Add New Product</h5>

          {feedback.message && (
            <div className={`p-3 mb-4 rounded-lg ${
              feedback.type === 'success' ? 'bg-green-100 text-green-800' : 
              feedback.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {feedback.message}
            </div>
          )}

          <ProductForm
            onSuccess={handleFormSuccess}
            onCancel={() => navigate(-1)}
            mode="add"
          />

          <hr className="border-gray-300 my-6" />

          {/* Photo Guidelines */}
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-3">Photo Guidelines</h5>
            <ul className="list-disc pl-5 text-gray-700">
              {[
                "Use natural lighting for best results",
                "Include size reference object",
                "Show product from multiple angles",
                "Ensure photos are clear and in focus",
                "Highlight any unique features or quality indicators",
              ].map((tip, index) => (
                <li key={index} className="mb-2">
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-gray-300 my-6" />

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className={`p-4 rounded-lg shadow ${stat.bg}`}>
                <small className="text-gray-600 block">{stat.label}</small>
                <h4 className="text-xl font-bold text-gray-800 mt-1">{stat.value}</h4>
              </div>
            ))}
          </div>

          <hr className="border-gray-300 my-6" />

          {/* Trending Products */}
          <div className="mb-6">
            <h5 className="font-semibold text-gray-800 mb-3">Trending Products</h5>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="text-gray-700">Organic Tomatoes</span>
                <span className="text-green-600 text-sm font-medium">High Demand</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-700">Fresh Spinach</span>
                <span className="text-green-600 text-sm font-medium">Trending</span>
              </li>
            </ul>
          </div>

          <hr className="border-gray-300 my-6" />

          {/* Chat Support */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-gray-800 mb-3">Chat Support</h4>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <BiHeadphone size={20} className="text-gray-700" />
                <div>
                  <h6 className="font-medium text-gray-800">Need Help?</h6>
                  <p className="text-gray-500 text-sm">Our team is here to assist you</p>
                </div>
              </div>
              <button className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                Start Chat
              </button>
            </div>
          </div>

          <hr className="border-gray-300 my-6" />

          {/* Analytics Insights */}
          <div>
            <h5 className="font-bold text-gray-800 mb-3">Analytics Insights</h5>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h6 className="font-semibold text-gray-700">Sales Trend</h6>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-1 border-gray-400 my-3" />
    </div>
  );
}