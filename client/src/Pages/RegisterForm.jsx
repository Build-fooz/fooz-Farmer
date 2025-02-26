
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo.png";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    farmSize: "",
    products: [],
    file: null,
  });

  const [filePreview, setFilePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      products: checked
        ? [...prev.products, value]
        : prev.products.filter((item) => item !== value),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData({ ...formData, file });
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="absolute top-0 left-3">
        <img src={logo} alt="Farmer Connect Logo" className="w-24" />
      </div>

      <div className="bg-white shadow-lg rounded-xl p-14 max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register as a Partner Farmer
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join our growing community of sustainable farmers
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                required
              />
            </div>

            <div className="relative">
              <FontAwesomeIcon
                icon={faPhone}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                required
              />
            </div>

            <div className="relative">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="location"
                placeholder="Farm Location (City, State)"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                required
              />
            </div>
          </div>

          <div className="relative">
            <FontAwesomeIcon
              icon={faSeedling}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="farmSize"
              placeholder="Farm Size (in Acres)"
              value={formData.farmSize}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
              required
            />
          </div>

          <fieldset className="border border-gray-300 p-4 rounded-lg">
            <legend className="text-gray-700 font-semibold">
              Products You Grow
            </legend>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {["Organic Vegetables", "Red Chilli", "Honey", "Coffee", "Cloves", "Other Spices"].map((product, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input type="checkbox" value={product} onChange={handleCheckbox} className="rounded" />
                  <span>{product}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition ${dragActive ? "border-green-600 bg-green-100" : "border-gray-300"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input type="file" id="fileUpload" className="hidden" onChange={handleFileChange} />
            <label htmlFor="fileUpload" className="cursor-pointer">
              <div className="text-gray-500">
                {filePreview ? (
                  <img src={filePreview} alt="Preview" className="w-32 h-32 object-cover mx-auto rounded-lg shadow-md" />
                ) : (
                  <>
                    <p className="text-lg font-semibold">Drag & Drop or Click to Upload</p>
                    <p className="text-sm text-gray-400">Upload Farm Certificates (PNG, JPG, PDF)</p>
                  </>
                )}
              </div>
            </label>
          </div>

          <button type="submit" className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition">
            Submit Registration
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <button onClick={() => navigate("/")} className="mt-2 text-black font-semibold hover:text-gray-700">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
