import React, { useEffect, useState } from 'react';
import Header from '../Components/HomePage/Header';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { getAuthTokens } from '../utils/storage';
import { productAPI } from '../services/api';
import { toast } from 'react-toastify';
import ProductForm from '../Components/ProductForm';
import { useAnalytics } from '../context/AnalyticsContext';

const ProductPage = () => {
  const { user } = useAuth();
  const { refreshAnalytics } = useAnalytics();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Fetch Products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Get user ID and auth tokens
        if (!user) {
          toast.error("Please login to view your products");
          return;
        }
        
        const userId = user._id || user.id;
        const { accessToken } = getAuthTokens();
        
        if (!accessToken) {
          toast.error("Authentication required");
          return;
        }
        
        // Make API request using the productAPI service
        const response = await productAPI.getUserProducts(userId);
        console.log(response);
        
        // The response format might be different, handle it accordingly
        if (response.data) {
          // Check different possible response formats
          if (response.data.success && response.data.products) {
            setProducts(response.data.products);
          } else if (Array.isArray(response.data)) {
            setProducts(response.data);
          } else {
            console.log("Unexpected response format:", response.data);
            setProducts([]);
            toast.warning("Received unexpected data format from server");
          }
        } else {
          toast.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error(error.response?.data?.message || "Error loading products");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [user]);

  // Filter Products by Search
  const filteredProducts = products.filter((product) =>
    product.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle successful product creation/update
  const handleProductSuccess = (data) => {
    if (data.product) {
      if (isEditModalOpen) {
        // Update the product in the list
        setProducts(products.map(p => 
          p.uuid === currentProduct.uuid ? data.product : p
        ));
        setIsEditModalOpen(false);
      } else if (isAddModalOpen) {
        // Add the new product to the list
        setProducts([...products, data.product]);
        setIsAddModalOpen(false);
      }
    } else if (data.draft && isAddModalOpen) {
      // Draft was saved
      setIsAddModalOpen(false);
      toast.info("Draft saved successfully. You can access it from the Drafts page.");
    }
  };

  // Delete Product
  const handleDeleteProduct = async (uuid) => {
    if (!window.confirm("Are you sure you want to remove this product?")) {
      return;
    }
    
    try {
      // Send API request to update status to 'removed' using the productAPI service
      const response = await productAPI.updateProductStatus(uuid, 'removed');
      
      // Handle various possible response formats
      if (response.data) {
        if (response.data.success || response.data.status === 'removed') {
          toast.success("Product removed successfully!");
          
          // Remove the product from the products list
          const updatedProducts = products.filter((product) => product.uuid !== uuid);
          setProducts(updatedProducts);
          
          // Refresh analytics to update product count
          refreshAnalytics();
        } else {
          console.log("Unexpected successful response:", response.data);
          toast.success("Product status updated");
          
          // Refresh product list to be safe
          const userId = user._id || user.id;
          const refreshResponse = await productAPI.getUserProducts(userId);
          if (refreshResponse.data.success && refreshResponse.data.products) {
            setProducts(refreshResponse.data.products);
          } else if (Array.isArray(refreshResponse.data)) {
            setProducts(refreshResponse.data);
          }
          
          // Refresh analytics
          refreshAnalytics();
        }
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error(error.response?.data?.message || "Failed to remove product");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-700">Loading products...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            <FiPlus className="mr-2" /> Add Product
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 w-full md:w-1/3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={product.uuid} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{product.sellingPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${product.status === 'active' ? 'bg-green-100 text-green-800' : 
                         product.status === 'sold' ? 'bg-blue-100 text-blue-800' : 
                         'bg-gray-100 text-gray-800'}`}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setCurrentProduct(product);
                            setIsEditModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.uuid)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No products found. Add your first product!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Product</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <ProductForm 
              mode="add" 
              onSuccess={handleProductSuccess} 
              onCancel={() => setIsAddModalOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Product</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <ProductForm 
              mode="edit" 
              initialData={{
                productName: currentProduct.productName,
                quantity: currentProduct.quantity,
                unit: currentProduct.unit,
                size: currentProduct.size,
                sellingPrice: currentProduct.sellingPrice,
                specialNotes: currentProduct.specialNotes || '',
                sellTo: currentProduct.sellTo,
                image: currentProduct.image
              }}
              productId={currentProduct.uuid}
              onSuccess={handleProductSuccess}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;