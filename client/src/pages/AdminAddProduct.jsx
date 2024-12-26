import React, { useState, useEffect } from 'react';
import { Upload, Trash2 } from 'lucide-react'; // Import Trash2 icon for delete
import { addProduct, deleteProduct, fetchProducts } from '../utils/api'; // Ensure you have deleteProduct and fetchProducts utility functions
import { toast } from 'react-toastify'; // Import toast

export default function AdminAddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);

  // Fetch the list of products when the component mounts
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products.');
      }
    };
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await addProduct({
        ...formData,
        price: parseFloat(formData.price)
      });

      // After adding the product, re-fetch the products to show the new product
      const data = await fetchProducts();
      setProducts(data);

      setFormData({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category: ''
      });

      toast.success('Product added successfully!'); // Show success toast
    } catch (err) {
      setError(err.message);
      toast.error('Failed to add product.'); // Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id); // Delete the product by its ID
      setProducts(products.filter((product) => product._id !== id)); // Remove deleted product from state
      toast.success('Product deleted successfully!'); // Show success toast
    } catch (err) {
      toast.error('Failed to delete product.'); // Show error toast
    }
  };

  return (
    <div className="min-h-screen  bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-500 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Upload className="h-5 w-5" />
            {isLoading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>

      {/* Display Products */}
      <div className="mt-12 max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl font-bold">Existing Products</h2>
        <div className="space-y-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-sm text-gray-500">${product.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(product._id)} // Pass _id as the product identifier
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
