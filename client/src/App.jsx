import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import HomePage from './pages/HomePage';
import AdminAddProduct from './pages/AdminAddProduct';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <ShoppingBag className="h-8 w-8 text-blue-500" />
                <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
              </Link>
              <Link
                to="/admin/add/product"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add Product
              </Link>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/add/product" element={<AdminAddProduct />} />
        </Routes>

        {/* ToastContainer to display toast notifications */}
        <ToastContainer
          position="top-right" // Position of the toast notifications
          autoClose={5000} // Time in ms before auto-closing the toast
          hideProgressBar={false} // Show or hide progress bar
          newestOnTop={false} // Show newest toast on top
          closeOnClick // Allow toast to be dismissed by clicking
          rtl={false} // If true, display right-to-left
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
