import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ImageUpload from './ImageUpload';
import { useAuth } from '../context/AuthContext';
import { getAuthTokens } from '../utils/storage';
import { productAPI } from '../services/api';

const ProductForm = ({ 
  initialData = {}, 
  onSuccess, 
  onCancel,
  mode = 'add', // 'add', 'edit', or 'draft'
  productId = null
}) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    unit: 'kg',
    size: 'medium',
    sellingPrice: '',
    specialNotes: '',
    sellTo: 'anyone',
    ...initialData
  });
  const [image, setImage] = useState(initialData.image || null);
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  // Handle image upload
  const handleImageUpload = (imageData) => {
    setImage(imageData);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }
    
    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(formData.quantity) || Number(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be a positive number";
    }
    
    if (!formData.unit) {
      newErrors.unit = "Unit is required";
    } else if (!['kg', 'g', 'lb'].includes(formData.unit)) {
      newErrors.unit = "Please select a valid unit (kg, g, or lb)";
    }
    
    if (!formData.size) {
      newErrors.size = "Size is required";
    } else if (!['small', 'medium', 'large'].includes(formData.size)) {
      newErrors.size = "Please select a valid size (small, medium, or large)";
    }
    
    if (!formData.sellingPrice) {
      newErrors.sellingPrice = "Selling price is required";
    } else if (isNaN(formData.sellingPrice) || Number(formData.sellingPrice) <= 0) {
      newErrors.sellingPrice = "Selling price must be a positive number";
    }
    
    if (!formData.sellTo) {
      newErrors.sellTo = "Sell To field is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Get user ID from auth context
  const getUserId = () => {
    if (!user) {
      throw new Error("User ID not found. Please log in again.");
    }
    const userId = user._id || user.id;
    if (!userId) {
      throw new Error("User ID not found. Please log in again.");
    }
    return userId;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For draft mode, no validation is needed
    if (mode !== 'draft' && !validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }
    
    // For draft mode, check if at least one field is filled
    if (mode === 'draft') {
      const hasContent = Object.values(formData).some(value => 
        typeof value === 'string' ? value.trim() !== "" : value !== null && value !== undefined
      );
      
      if (!hasContent && !image) {
        toast.info("Please fill at least one field to save a draft");
        return;
      }
    }
    
    try {
      setIsLoading(true);
      
      // Get user ID and authentication token
      const userId = getUserId();
      
      // Prepare data for API request
      const productData = {
        ...formData,
        userId,
        image: image
      };
      
      let response;
      
      // Use appropriate API method based on mode
      if (mode === 'draft') {
        response = await productAPI.saveDraft(productData);
      } else if (mode === 'edit' && productId) {
        try {
          response = await productAPI.updateProduct(productId, productData);
        } catch (error) {
          console.error("Error updating product, trying alternative method:", error);
          
          // If the first method fails, try the patch method as a fallback
          if (error.response?.status === 404) {
            response = await productAPI.updateProductStatus(productId, productData);
          } else {
            throw error;
          }
        }
      } else {
        // Default is 'add' mode
        response = await productAPI.createProduct(productData);
      }
      
      // Handle successful response based on different possible formats
      if (response.data) {
        const actionType = mode === 'add' ? 'added' : mode === 'edit' ? 'updated' : 'saved as draft';
        toast.success(`Product ${actionType} successfully!`);
        
        // Prepare callback data based on the response format
        let callbackData;
        
        if (response.data.success) {
          // Server returns { success: true, product/draft: {...} }
          callbackData = response.data;
        } else if (mode === 'edit') {
          // Create a product object from the updated data for consistent callback
          callbackData = {
            success: true,
            product: {
              ...productData,
              uuid: productId
            }
          };
        } else {
          // For any other format
          callbackData = {
            success: true,
            product: response.data
          };
        }
        
        // Call the success callback with the response data
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(callbackData);
        }
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      
      // Handle specific error responses
      if (error.response) {
        const { status, data } = error.response;
        
        if (status === 401) {
          toast.error("Authentication required. Please log in again.");
        } else if (status === 400) {
          toast.error(data.message || "Please check your form inputs");
          if (data.required) {
            const newErrors = {};
            data.required.forEach(field => {
              newErrors[field] = `${field} is required`;
            });
            setErrors(newErrors);
          }
        } else {
          toast.error(data?.message || `Failed to ${mode === 'edit' ? 'update' : 'submit'} product. Please try again.`);
        }
      } else {
        toast.error(error.message || "Network error. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-6">
        <ImageUpload onImageUpload={handleImageUpload} currentImage={image} />
      </div>
      
      <div>
        <label htmlFor="productName" className="block text-gray-700 font-medium mb-2">
          Product Name*
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.productName ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter product name"
        />
        {errors.productName && (
          <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
            Quantity*
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter quantity"
            min="0"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="unit" className="block text-gray-700 font-medium mb-2">
            Unit*
          </label>
          <select
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select unit</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="g">Grams (g)</option>
            <option value="lb">Pounds (lb)</option>
          </select>
          {errors.unit && (
            <p className="text-red-500 text-sm mt-1">{errors.unit}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="size" className="block text-gray-700 font-medium mb-2">
            Size*
          </label>
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          {errors.size && (
            <p className="text-red-500 text-sm mt-1">{errors.size}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="sellingPrice" className="block text-gray-700 font-medium mb-2">
            Selling Price (₹)*
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.sellingPrice ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter selling price"
            min="0"
            step="0.01"
          />
          {errors.sellingPrice && (
            <p className="text-red-500 text-sm mt-1">{errors.sellingPrice}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="specialNotes" className="block text-gray-700 font-medium mb-2">
          Special Notes (optional)
        </label>
        <textarea
          id="specialNotes"
          name="specialNotes"
          value={formData.specialNotes}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          rows="3"
          placeholder="Add any special notes about your product"
        ></textarea>
      </div>
      
      <div>
        <label htmlFor="sellTo" className="block text-gray-700 font-medium mb-2">
          Sell To*
        </label>
        <select
          id="sellTo"
          name="sellTo"
          value={formData.sellTo}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="anyone">Anyone</option>
          <option value="retail">Retailers</option>
          <option value="wholesale">Wholesalers</option>
          <option value="processor">Food Processors</option>
          <option value="restaurant">Restaurants</option>
        </select>
        {errors.sellTo && (
          <p className="text-red-500 text-sm mt-1">{errors.sellTo}</p>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        {mode === 'add' && (
          <>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Product"}
            </button>
            
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit({ ...e, target: { mode: 'draft' } });
              }}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save as Draft"}
            </button>
          </>
        )}
        
        {mode === 'edit' && (
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        )}
        
        {mode === 'draft' && (
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Draft"}
          </button>
        )}
        
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 text-gray-600 px-6 py-2 rounded hover:bg-gray-100 transition duration-200"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm; 