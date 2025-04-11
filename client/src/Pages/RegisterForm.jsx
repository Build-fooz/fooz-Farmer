import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faSeedling
} from "@fortawesome/free-solid-svg-icons";
import Header from "../Components/HomePage/Header";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // Validation rules
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full Name is required";
        else if (!/^[A-Za-z\s]+$/.test(value)) error = "Name should only contain alphabets and spaces";
        break;
      case "phone":
        if (!value.trim()) error = "Phone Number is required";
        else if (!/^\d{10}$/.test(value)) error = "Invalid Phone Number (10 digits required)";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid Email";
        break;
      // Password field removed
      case "location":
        if (!value.trim()) error = "Location is required";
        break;
      case "farmSize":
        if (!value.trim()) error = "Farm Size is required";
        else if (!/^\d+$/.test(value)) error = "Farm Size must be a whole number";
        else if (parseInt(value) <= 0) error = "Farm Size must be greater than 0";
        break;
      case "products":
        if (value.length === 0) error = "Please select at least one product";
        break;
      case "file":
        if (!value) error = "Farm Certificate is required";
        break;
      default:
        break;
    }
    return error;
  };

  // Restrict input for name field (only alphabets and spaces)
  const handleNameInput = (e) => {
    const { value } = e.target;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setFormData({ ...formData, fullName: value });
    }
  };

  // Restrict input for phone field (only digits)
  const handlePhoneInput = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, phone: value });
    }
  };

  // Restrict input for farm size field (only digits)
  const handleFarmSizeInput = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, farmSize: value });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate field on change
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Validate field on blur
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      products: checked
        ? [...prev.products, value]
        : prev.products.filter((item) => item !== value),
    }));

    // Validate products on change
    const updatedProducts = checked
      ? [...formData.products, value]
      : formData.products.filter((item) => item !== value);
    const error = validateField("products", updatedProducts);
    setErrors((prev) => ({ ...prev, products: error }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      setFilePreview(URL.createObjectURL(file));

      // Clear file error if a file is uploaded
      setErrors((prev) => ({ ...prev, file: "" }));
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

      // Clear file error if a file is uploaded
      setErrors((prev) => ({ ...prev, file: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    // Validate all fields before submission
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      try {
        // Create FormData object for file upload
        const formDataToSend = new FormData();
        formDataToSend.append("fullName", formData.fullName);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("email", formData.email);
        // Password field removed
        formDataToSend.append("location", formData.location);
        formDataToSend.append("farmSize", formData.farmSize);
        formDataToSend.append("products", JSON.stringify(formData.products));
        formDataToSend.append("certificate", formData.file);

        // Send the registration request
        const response = await fetch('http://localhost:3000/farmer/register', {
          method: 'POST',
          body: formDataToSend,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        // Registration successful, redirect to login page
        alert("Registration successful! Please login to continue.");
        navigate("/auth");
      } catch (error) {
        console.error("Registration error:", error);
        setServerError(error.message || "Registration failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      <Header />

      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Heading and Subheading outside the card */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black">
            Register as a Partner Farmer
          </h2>
          <p className="text-black">
            Join our growing community of sustainable farmers
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          {serverError && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleNameInput}
                  onBlur={handleBlur}
                  className={`w-full pl-10 p-3 border ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-green-300`}
                  required
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your 10-digit phone number"
                  value={formData.phone}
                  onChange={handlePhoneInput}
                  onBlur={handleBlur}
                  className={`w-full pl-10 p-3 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-green-300`}
                  required
                  maxLength="10"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 p-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-green-300`}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password field removed */}

            {/* Farm Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farm Location <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </span>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter your farm location"
                  value={formData.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 p-3 border ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-green-300`}
                  required
                />
              </div>
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            {/* Farm Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farm Size (in acres) <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FontAwesomeIcon icon={faSeedling} />
                </span>
                <input
                  type="text"
                  name="farmSize"
                  placeholder="Enter your farm size in acres"
                  value={formData.farmSize}
                  onChange={handleFarmSizeInput}
                  onBlur={handleBlur}
                  className={`w-full pl-10 p-3 border ${
                    errors.farmSize ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-green-300`}
                  required
                />
              </div>
              {errors.farmSize && (
                <p className="text-red-500 text-sm mt-1">{errors.farmSize}</p>
              )}
            </div>

            {/* Products */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Products <span className="text-red-600">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Select all products you currently harvest
              </p>
              <div
                className={`grid grid-cols-2 md:grid-cols-3 gap-2 ${
                  errors.products ? "border-red-500" : ""
                }`}
              >
                {["Rice", "Wheat", "Pulses", "Fruits", "Vegetables", "Other"].map(
                  (product) => (
                    <div key={product} className="flex items-center">
                      <input
                        type="checkbox"
                        id={product}
                        name="products"
                        value={product}
                        checked={formData.products.includes(product)}
                        onChange={handleCheckbox}
                        className="h-4 w-4 text-green-600 rounded"
                      />
                      <label
                        htmlFor={product}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {product}
                      </label>
                    </div>
                  )
                )}
              </div>
              {errors.products && (
                <p className="text-red-500 text-sm mt-1">{errors.products}</p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farm Certificate <span className="text-red-600">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Upload a scanned copy or photo of your farm certificate/document
              </p>

              <div
                className={`border-2 border-dashed rounded-lg p-4 ${
                  dragActive ? "border-green-500" : "border-gray-300"
                } ${errors.file ? "border-red-500" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  {filePreview ? (
                    <div className="mb-4">
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="mx-auto h-32 object-cover rounded"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        {formData.file?.name}
                      </p>
                    </div>
                  ) : (
                    <div className="py-4">
                      <p className="text-gray-500">
                        Drag and drop your file here, or
                      </p>
                    </div>
                  )}

                  <label className="inline-block bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded cursor-pointer">
                    Browse File
                    <input
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              {errors.file && (
                <p className="text-red-500 text-sm mt-1">{errors.file}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            {/* Login Link */}
            <div className="text-center mt-4">
              <p className="text-gray-600">Already have an account?</p>
              <button
                type="button"
                onClick={() => navigate("/auth")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;