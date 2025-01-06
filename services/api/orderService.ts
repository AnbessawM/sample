import axios from 'axios';

const API_URL = 'https://api.example.com/orders';

const getOrderHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/history`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching order history:', error.response ? error.response.data : error.message);
    } else {
      console.error('Error fetching order history:', (error as any).message);
    }
    throw new Error('Failed to fetch order history.');
  }
};

const orderService = {
  getOrderHistory,
};

export default orderService;
