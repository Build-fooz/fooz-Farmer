import { useState } from "react";
import Logo from "../assets/images/logo.png";
import { BiHeadphone } from "react-icons/bi";

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
    { label: "Products Listed", value: "12",      bg: "bg-blue-200" },
    { label: "Total Sales",     value: "₹24,500", bg: "bg-green-200" },
    { label: "Active Orders",   value: "5",       bg: "bg-purple-200" },
    { label: "Draft Listings",  value: "3",       bg: "bg-yellow-200" },
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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white pb-4">
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <img src={Logo} alt="logo" width={100} height={100} className="mx-auto mb-3" />

        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="font-bold text-xl mb-2">Product Listing</h1>
          <p className="text-gray-500">Monitor your farm products performance</p>
        </div>

        {/* Form Card */}
        <div className="p-4 mb-4 shadow-md rounded-lg bg-white">
          <h2 className="text-lg font-semibold mb-3">Product Listing Overview</h2>
          <h5 className="text-md font-medium mb-3">Add New Product</h5>

          <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-3">
              {/* Product Name */}
              <div className="w-4/6">
                <label className="block">Product Name</label>
                <input type="text" name="productName" placeholder="Start typing for suggestions..." 
                      className="w-full border border-black p-2 rounded" 
                      value={formData.productName} onChange={handleChange} />
              </div>

              {/* Quantity Available */}
              <div className="w-3/6">
                <label className="block">Quantity Available</label>
                <input 
                      type="number" 
                      className="w-full border border-black p-2  rounded" 
                      placeholder="Units"
                      min="0"
                      name="quantity" 
                      value={formData.quantity} onChange={handleChange}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                    }}
                      />
              </div>

              {/* Unit Selection */}
              <div className="w-1/6">
                <label className="block font-medium">Unit</label>
                <select 
                className="w-full border border-black p-2 rounded" 
                value={formData.unit} 
                defaultValue="kg"
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}> 
                  {["kg", "g", "lb"].map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>


            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block">Size/Grade</label>
                <select className="w-full border border-black p-2 rounded " value={formData.size} 
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}>
                  <option value="large">Large</option>
                  <option value="medium">Medium</option>
                  <option value="small">Small</option>
                </select>
              </div>
              <div>
                <label className="block">Selling Price</label>
                <div className="relative w-full">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-700">₹</span>
                  <input 
                      type="number" 
                      className="w-full border border-black p-2 pl-6 rounded" 
                      placeholder="0"
                      min="0" 
                      value={formData.sellingPrice} 
                      onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                    }}
                      />
                      </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="block">Special Notes</label>
              <textarea rows={3} placeholder="E.g., Organic certification, harvest date" 
              className="w-full border border-black p-2 rounded"
              value={formData.specialNotes} 
              onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}>

              </textarea>
            </div>
            {/* Sell To & Current Market Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  {/* Sell To */}
                  <div>
                    <label className="block font-medium">Sell To</label>
                    <select className="w-full border border-black p-2 rounded" value={formData.sellTo} onChange={handleChange}>
                      <option value="fooz">Fooz Company</option>
                    </select>
                  </div>
                  {/* Current Market Price */}
                  <div className="bg-blue-100 font-bold text-black p-3 rounded">
                    <label className="block">Current Market Price</label>
                    <span className="block">₹45-55/kg</span>
                  </div>
                </div>
            <div className="flex gap-3 py-3 w-full">
              <button className="w-full bg-gray-200 rounded text-black font-semibold p-2">Save Draft</button>
              <button className="w-full bg-black text-white rounded p-2">List Product</button>
            </div>
          </form>

          <hr className="border-1 border-gray-400 my-4" />
          <h5 className="font-semibold mb-2">Photo Guidelines</h5>
          <div className="bg-yellow-100 p-3 rounded mb-4">
            <ul className="font-semibold list-disc pl-5">
              {["Use natural lighting for best results", "Include size reference object", "Show product from multiple angles", "Ensure photos are clear and in focus", "Highlight any unique features or quality indicators"].map((tip, index) => <li key={index}>{tip}</li>)}
            </ul>
          </div>
               <hr className="border-1 border-gray-400 my-4" />
               {/* Stats */}
               <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
           {stats.map((stat, index) => (
             <div key={index} className={`p-4 rounded-lg shadow ${stat.bg}`}>
               <small className="text-gray-600 text-center block">{stat.label}</small>
               <h4 className="text-xl font-bold text-center mt-1">{stat.value}</h4>
             </div>
           ))}
           <hr className="border-1 border-gray-400 my-4 col-span-full" />
         </div>

     
        {/* Trending Products */}
        <div className="mb-4">
          <h5 className="font-semibold mb-2">Trending Products</h5>
          <ul className="list-none">
            <li className="flex justify-between  py-2">
              <span>Organic Tomatoes</span>
              <span className="text-green-600 text-sm font-medium">High Demand</span>
            </li>
            <li className="flex justify-between  py-2">
              <span>Fresh Spinach</span>
              <span className="text-green-600 text-sm font-medium">Trending</span>
            </li>
          </ul>
        </div>
        <hr className="border-1 border-gray-400 my-3" />

        {/* Chat Support */}
        <div className="p-4 mb-4 border border-gray-300 shadow-md rounded-lg bg-white">
          <h4 className="font-semibold mb-3">Chat Support</h4>
          <div className="bg-gray-200 rounded p-3">
            <div className="flex items-center gap-2 mb-3">
              <BiHeadphone size={20} />
              <div>
                <h6 className="font-medium mb-0">Need Help?</h6>
                <p className="text-gray-500 text-sm mb-0">Our team is here to assist you</p>
              </div>
            </div>
            <button className="w-full bg-black text-white rounded p-2">Start Chat</button>
          </div>
        </div>
        <hr className="border-1 border-gray-400 my-3" />
          {/* Analytics Insights */}
            <div className="mb-4">
              <h5 className="font-bold mb-2">Analytics Insights</h5>
              <h6 className="font-semibold rounded bg-gray-200 p-3 pb-5">Sales Trend</h6>
            </div>
      </div>
    </div>
    </div>
  );
}
