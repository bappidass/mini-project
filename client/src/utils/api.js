const API_URL = 'https://mini-project-2arn.onrender.com/api';

// const API_URL ='http://localhost:5000/api'

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const searchProducts = async (query) => {
  const response = await fetch(`${API_URL}/products/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search products');
  return response.json();
};

export const addProduct = async (product) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to add product');
  return response.json();
};

export const deleteProduct = async (id) => {
  console.log(id)
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete product');
  return response.json();
};
