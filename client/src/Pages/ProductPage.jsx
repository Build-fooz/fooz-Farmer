import React, { useEffect, useState } from 'react';
import Header from '../Components/HomePage/Header';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Form Data for Add/Edit Product
  const [formData, setFormData] = useState({
    name: '',
    category: 'Spices',
    price: '',
    stock: '',
    description: '',
  });

  // Mock Data (Replace with API Call)
  useEffect(() => {
    const fetchProducts = async () => {
      setTimeout(() => {
        const mockProducts = [
          {
            id: 1,
            name: 'Kashmiri Saffron',
            category: 'Spices',
            price: 1200,
            stock: 20,
            description: 'Pure Kashmiri Saffron, 1gm',
          },
          {
            id: 2,
            name: 'Malabar Black Pepper',
            category: 'Spices',
            price: 350,
            stock: 50,
            description: 'Organic Black Pepper, 100gm',
          },
          {
            id: 3,
            name: 'Darjeeling Green Tea',
            category: 'Tea',
            price: 450,
            stock: 30,
            description: 'Premium Green Tea Leaves, 50gm',
          },
        ];
        setProducts(mockProducts);
        setLoading(false);
      }, 1000);
    };
    fetchProducts();
  }, []);

  // Filter Products by Search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Input Change for Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add New Product
  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };
    setProducts([...products, newProduct]);
    setIsAddModalOpen(false);
    setFormData({ name: '', category: 'Spices', price: '', stock: '', description: '' });
  };

  // Edit Product
  const handleEditProduct = () => {
    const updatedProducts = products.map((product) =>
      product.id === currentProduct.id ? { ...product, ...formData } : product
    );
    setProducts(updatedProducts);
    setIsEditModalOpen(false);
  };

  // Delete Product
  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (₹)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setCurrentProduct(product);
                          setFormData({
                            name: product.name,
                            category: product.category,
                            price: product.price,
                            stock: product.stock,
                            description: product.description,
                          });
                          setIsEditModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.name}
                onChange={handleInputChange}
              />
              <select
                name="category"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="Spices">Spices</option>
                <option value="Coffee">Coffee</option>
                <option value="Tea">Tea</option>
                <option value="Honey">Honey</option>
                <option value="Herbal Gel">Herbal Gel</option>
                <option value="Essential Oils">Essential Oils</option>
                <option value="Papads">Papads</option>
                <option value="Pickles">Pickles</option>
                <option value="Sharbats">Sharbats</option>
                <option value="Seeds">Seeds</option>
              </select>
              <input
                type="number"
                name="price"
                placeholder="Price (₹)"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.price}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock Quantity"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.stock}
                onChange={handleInputChange}
              />
              <textarea
                name="description"
                placeholder="Description"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.name}
                onChange={handleInputChange}
              />
              <select
                name="category"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="Spices">Spices</option>
                <option value="Coffee">Coffee</option>
                <option value="Tea">Tea</option>
                <option value="Honey">Honey</option>
                <option value="Herbal Gel">Herbal Gel</option>
                <option value="Essential Oils">Essential Oils</option>
                <option value="Papads">Papads</option>
                <option value="Pickles">Pickles</option>
                <option value="Sharbats">Sharbats</option>
                <option value="Seeds">Seeds</option>
              </select>
              <input
                type="number"
                name="price"
                placeholder="Price (₹)"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.price}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock Quantity"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.stock}
                onChange={handleInputChange}
              />
              <textarea
                name="description"
                placeholder="Description"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;