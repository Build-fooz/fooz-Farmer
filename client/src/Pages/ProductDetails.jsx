import React, { useState } from "react";
import Header from "../Components/HomePage/Header";
import Footer from "../Components/HomePage/Footer";

const ProductDetails = () => {
  const product = {
    id: 1,
    title: "Organic Cumin Seeds (Jeera) - 500g",
    price: 199,
    mrp: 299,
    imageList: [
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Cumin_seeds.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4f/Cumin_Seeds_Closeup.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e2/Cumin_powder_and_seeds.jpg",
    ],
    rating: 4.6,
    reviewsCount: 345,
    description: `Premium quality organic cumin seeds sourced directly from farms. Adds rich flavor and aroma to your dishes. Packed hygienically to retain freshness and natural oils.`,
    offers: [
      "5% Instant Discount on SBI Credit Cards",
      "Get extra 10% off on orders above ₹500",
      "Buy 2 Get 1 Free on select spices",
    ],
    delivery: "Get it by Tomorrow, FREE Delivery over ₹499",
    stock: "In stock",
  };

  const [selectedImage, setSelectedImage] = useState(product.imageList[0]);

  // Reviews State
  const [reviews, setReviews] = useState([
    {
      name: "Anjali",
      rating: 5,
      text: "Very fresh and aromatic! Using it daily in my cooking.",
    },
    { name: "Ravi", rating: 4, text: "Good quality seeds. Packaging was nice too." },
  ]);

  const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" });

  const handleAddToCart = () => alert("Added to cart!");
  const handleBuyNow = () => alert("Proceed to buy!");

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) {
      alert("Please fill in all fields");
      return;
    }
    setReviews([...reviews, newReview]);
    setNewReview({ name: "", rating: 5, text: "" });
  };

  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto p-4 text-sm text-gray-600 mb-4">
        <a href="#" className="hover:underline">Home</a> &gt; 
        <a href="#" className="hover:underline ml-1">Grocery & Gourmet Foods</a> &gt; 
        <span className="ml-1 text-gray-800">{product.title}</span>
      </div>

      {/* Main Product Section */}
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-12 bg-white rounded-lg shadow-md border">
        
        {/* Left: Images */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-72 h-72 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="flex gap-3">
            {product.imageList.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumb ${idx + 1}`}
                className={`w-16 h-16 object-cover border rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-110 ${selectedImage === img ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">{product.title}</h2>

          {/* Ratings */}
          <p className="flex items-center gap-2 text-yellow-500">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < Math.floor(product.rating) ? "⭐" : "☆"}</span>
            ))}
            <span className="text-gray-600 text-sm">({product.reviewsCount} ratings)</span>
          </p>

          {/* Price */}
          <div className="space-y-2">
            <p className="text-3xl font-bold text-red-600">₹ {product.price}</p>
            <p className="text-gray-500 line-through">₹ {product.mrp}</p>
            <p className="text-green-600 font-medium">
              You save ₹ {product.mrp - product.price} ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}% Off)
            </p>
          </div>

          {/* Offers */}
          <div>
            <h4 className="font-semibold text-lg">Available Offers</h4>
            <ul className="list-disc ml-5 text-green-700 space-y-1">
              {product.offers.map((offer, idx) => (
                <li key={idx} className="text-sm">{offer}</li>
              ))}
            </ul>
          </div>

          {/* Delivery */}
          <p className="font-medium text-blue-700">{product.delivery}</p>

          {/* Stock */}
          <p className="text-green-600 font-medium">{product.stock}</p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
            >
              Buy Now
            </button>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-lg mt-8 mb-2">Product Description</h4>
            <p className="text-gray-700 text-sm">{product.description}</p>
          </div>

          {/* Customer Reviews */}
          <div className="mt-10">
            <h4 className="text-2xl font-bold mb-4">Customer Reviews</h4>

            {/* Existing Reviews */}
            <div className="space-y-4 mb-6">
              {reviews.map((rev, idx) => (
                <div key={idx} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                  <p className="font-semibold">{rev.name}</p>
                  <p className="text-yellow-500">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>{i < rev.rating ? "⭐" : "☆"}</span>
                    ))}
                  </p>
                  <p className="text-gray-700">{rev.text}</p>
                </div>
              ))}
            </div>

            {/* Add New Review */}
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <h5 className="font-semibold">Add Your Review</h5>

              <input
                type="text"
                placeholder="Your Name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="w-full border p-3 rounded-lg"
              />

              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                className="w-full border p-3 rounded-lg"
              >
                {[5, 4, 3, 2, 1].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 ? "s" : ""}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Write your review..."
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                className="w-full border p-3 rounded-lg"
                rows="4"
              />

              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
