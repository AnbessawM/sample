import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/carts';

const cartService = {
  getCart: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw new Error('Error fetching cart');
    }
  },

  addToCart: async (productId: number, quantity: number) => {
    try {
      const response = await axios.post(API_URL, { productId, quantity });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error('Error adding to cart');
    }
  },

  removeFromCart: async (productId: number) => {
    try {
      const response = await axios.delete(`${API_URL}/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw new Error('Error removing from cart');
    }
  }
};

export default cartService;
