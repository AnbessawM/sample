import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/carts';

export const getCart = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error('Error fetching cart');
  }
};

export const addToCart = async (productId: number, quantity: number) => {
  try {
    const response = await axios.post(API_URL, { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw new Error('Error adding to cart');
  }
};
