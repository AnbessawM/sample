import axios from 'axios';

const API_URL = 'https://backend-production-a887.up.railway.app/api/products';

// Fetch products with pagination and search functionality
export const getProducts = async (page = 1, limit = 10, keyword = '') => {
  try {
    console.log('Making API request to:', API_URL); // Added console log
    const response = await axios.get(API_URL, {
      params: { page, limit, keyword }, // Send parameters for pagination and keyword search
    });
    console.log('API response:', response.data); // Added console log
    return response.data; // Return the full response, including page, products, etc.
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};

const getProductById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw new Error('Failed to fetch product');
  }
};

const searchProducts = async (query: string, page = 1, limit = 10) => {
  try {
    const response = await axios.get(API_URL, {
      params: { search: query, page, limit },
    });
    return response.data.products;
  } catch (error) {
    console.error('Failed to search products:', error);
    throw new Error('Failed to search products');
  }
};

const productService = {
  getProducts,
  getProductById,
  searchProducts,
};

export default productService;
