
import Header from "../Components/HomePage/Header";
import { useState,useEffect } from "react";
import Logo from "../assets/images/logo.png";
import { BiHeadphone } from "react-icons/bi";
import middalware from "../Utils/middalware";
import DraftCard from "../Components/DraftCard"

export default function ProductListing() {
  const userId = localStorage.getItem("user_id");
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    unit: "kg",
    size: "large",
    sellingPrice: "",
    specialNotes: "",
    sellTo: "fooz",
  });
  const resetForm = () => {
    setFormData({
      productName: "",
      quantity: "",
      unit: "kg",
      size: "large",
      sellingPrice: "",
      specialNotes: "",
      sellTo: "fooz",
    });
  };
  const handleEdit = (draft) => {
    console.log("Editing draft:", draft);
    setFormData({
      productName: draft.productName,
      quantity: draft.quantity,
      unit: draft.unit,
      size: draft.size,
      sellingPrice: draft.sellingPrice,
      specialNotes: draft.specialNotes,
      sellTo: draft.sellTo,
    });
  };
  
  const stats = [
    { label: "Products Listed", value: "12", bg: "bg-blue-100" },
    { label: "Total Sales", value: "₹24,500", bg: "bg-green-100" },
    { label: "Active Orders", value: "5", bg: "bg-purple-100" },
    { label: "Draft Listings", value: "3", bg: "bg-yellow-100" },

  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "sellingPrice" || name === "quantity"
          ? value.replace(/[^0-9]/g, "")
          : value,
    }));
  };
  const handleSaveDraft = async () => {
    const userId = localStorage.getItem("user_id");
  
    if (!userId) {
      console.error("No user_id found in localStorage");
      return;
    }
  
    const draftData = {
      id: Date.now(), // Unique ID based on timestamp
      userId,
      ...formData,
    };
  
    try {
      const response = await middalware.post("/products/draft", draftData);
      console.log("Draft saved to database:", response.data);
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ✅ Retrieve user_id from localStorage
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("No user_id found in localStorage");
      return;
    }
  
    try {
      // ✅ Include userId in formData
      const dataToSubmit = { ...formData, userId };
  
      // ✅ Debugging: Log the payload to confirm userId is included
      console.log("Data to submit:", dataToSubmit);
  
      // ✅ Use the custom Axios instance to send the POST request
      const response = await middalware.post("/products", dataToSubmit);
      console.log("Response from server:", response.data);
  
      // ✅ Reset the form after success
      resetForm(); 
    } catch (error) {
      console.error(
        "Error submitting form data:",
        error.response?.data?.message || error.message
      );
    }
  };
  

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

          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-3">
              {/* Product Name Dropdown */}
              <div className="w-4/6">
                <label className="block">Product Name</label>
                <select
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full border border-black p-2 rounded"
                >
                  <option value="">Select a spice</option>
                  <option value="Cinnamon">Cinnamon</option>
                  <option value="Turmeric">Turmeric</option>
                  <option value="Cardamom">Cardamom</option>
                  <option value="Cloves">Cloves</option>
                </select>
              </div>

              {/* Quantity Available */}
              <div className="w-3/6">
                <label className="block">Quantity Available</label>
                <input
                  type="number"
                  className="w-full border border-black p-2 rounded"
                  placeholder="Units"
                  min="0"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
      }}
                />
              </div>


              <div>
                <label className="block text-gray-700 font-medium mb-2">Unit</label>
                <select
                  name="unit"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                  value={formData.unit}
                  onChange={handleChange}
                >
                  {["kg", "g", "lb"].map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>


            {/* Size/Grade and Selling Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Size/Grade</label>
                <select
                  name="size"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                  value={formData.size}
                  onChange={handleChange}

                >
                  <option value="large">Large</option>
                  <option value="medium">Medium</option>
                  <option value="small">Small</option>
                </select>
              </div>

              <div>

                <label className="block text-gray-700 font-medium mb-2">Selling Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="sellingPrice"
                    placeholder="0"
                    min="0"
                    className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

                    }}
                  />
                </div>
              </div>
            </div>


            {/* Special Notes */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Special Notes</label>
              <textarea
                rows={3}
                placeholder="E.g., Organic certification, harvest date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                value={formData.specialNotes}
                onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
              />
            </div>

            {/* Sell To and Current Market Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Sell To</label>
                <select
                  name="sellTo"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                  value={formData.sellTo}
                  onChange={handleChange}
                >
                  <option value="fooz">Fooz Company</option>
                </select>
              </div>

              <div className="bg-blue-100 p-4 rounded-lg">
                <label className="block text-gray-700 font-medium mb-2">Current Market Price</label>
                <span className="text-gray-800 font-semibold">₹45-55/kg</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                className="w-full bg-gray-200 text-gray-800 p-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >

                List Product
              </button>
            </div>
          </form>
        


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