import { useState } from "react";
import { BiHeadphone } from "react-icons/bi";
import Header from "../Components/HomePage/Header";

export default function ProductListing() {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    unit: "kg",
    size: "large",
    sellingPrice: "",
    specialNotes: "",
    sellTo: "fooz",
  });

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
      [name]: name === "sellingPrice" || name === "quantity" ? value.replace(/[^0-9]/g, "") : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", JSON.stringify(formData, null, 2));
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
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Product Listing Overview</h2>
          <h5 className="text-lg font-semibold text-gray-700 mb-6">Add New Product</h5>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name, Quantity, and Unit */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  placeholder="Start typing for suggestions..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                  value={formData.productName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Quantity Available</label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Units"
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                  value={formData.quantity}
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
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
    </div>
  );
}