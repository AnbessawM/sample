import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Order {
  id: number;
  date: string;
  total: number;
  items: Array<{ 
    id: number;
    title: string; 
    quantity: number;
    price: number;
    image: string;
  }>;
}

interface OrderHistoryContextProps {
  orders: Order[];
  addOrder: (order: Order) => void;
  clearOrderHistory: () => void;
  removeOrder: (orderId: number) => void; // Add this line
}

const OrderHistoryContext = createContext<OrderHistoryContextProps | undefined>(undefined);

interface OrderHistoryProviderProps {
  children: React.ReactNode;
}

export const OrderHistoryProvider: React.FC<OrderHistoryProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderHistory = JSON.parse(await AsyncStorage.getItem('orderHistory') || '[]');
      setOrders(orderHistory);
    };

    fetchOrders();
  }, []);

  const addOrder = async (order: Order) => {
    const updatedOrders = [...orders, { ...order, date: new Date(order.date).toLocaleString() }];
    setOrders(updatedOrders);
    await AsyncStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
  };

  const clearOrderHistory = async () => {
    setOrders([]);
    await AsyncStorage.removeItem('orderHistory');
  };

  const removeOrder = async (orderId: number) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    await AsyncStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
  };

  return (
    <OrderHistoryContext.Provider value={{ orders, addOrder, clearOrderHistory, removeOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};

export const useOrderHistory = () => {
  const context = useContext(OrderHistoryContext);
  if (!context) {
    throw new Error('useOrderHistory must be used within an OrderHistoryProvider');
  }
  return context;
};
