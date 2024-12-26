import React, { useState, useEffect, useRef } from 'react';
import { searchProducts, fetchProducts } from '../utils/api';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const [products, setProducts] = useState([]);
  const [productError, setProductError] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const debounceTimer = useRef(null);

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setProductError('Failed to load products.');
      }
    };
    loadProducts();
  }, []);

  // Handle search input
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const search = async () => {
      setIsLoading(true);
      setSearchError(null);
      try {
        const data = await searchProducts(query);
        setResults(data);
      } catch (err) {
        setSearchError('Failed to fetch search results.');
      } finally {
        setIsLoading(false);
      }
    };

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(search, 300);

    return () => clearTimeout(debounceTimer.current);
  }, [query]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setQuery('');
    setResults([]);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Section */}
      <div className="mb-8 relative">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 pl-10 pr-10 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <div className="absolute left-3 top-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m2.65-6.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {query && (
            <div
              onClick={handleClear}
              className="absolute right-3 top-2.5 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 hover:text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}

          {query.length >= 2 && (
            <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border transition-all duration-200">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">Loading...</div>
              ) : searchError ? (
                <div className="p-4 text-center text-red-500">{searchError}</div>
              ) : results.length > 0 ? (
                <ul>
                  {results.map((result) => (
                    <li
                      key={result.id}
                      onClick={() => handleSelectProduct(result)}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                    >
                      <div className="font-medium">{result.name}</div>
                      <div className="text-sm text-gray-500">{result.category}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500">No products found</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Display */}
      {selectedProduct ? (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <img
            src={selectedProduct.image_url}
            alt={selectedProduct.name}
            className="w-64 h-64 object-cover rounded-md"
          />
          <div className="mt-4">
            <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
            <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-2xl font-bold">₹{selectedProduct.price}</span>
              <span className="text-sm text-gray-500">{selectedProduct.category}</span>
            </div>
          </div>
          <button
            onClick={() => setSelectedProduct(null)}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to All Products
          </button>
        </div>
      ) : productError ? (
        <div className="text-red-500 text-center">{productError}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className=" h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-bold">₹{product.price}</span>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
