// Local storage keys
const STORAGE_KEYS = {
  PRODUCTS: 'products'
};

// Initialize products in localStorage if not exists
if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([]));
}

export const getProducts = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString()
  };
  products.push(newProduct);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  window.dispatchEvent(new Event('storage'));
};

export const searchProducts = (query) => {
  const products = getProducts();
  const lowercaseQuery = query.toLowerCase();
  
  return products
    .filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    )
    .map(({ id, name, category }) => ({ id, name, category }))
    .slice(0, 5);
};