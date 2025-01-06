import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Order {
  id: number;
  date: string;
  total: number;
  items: Array<{ title: string; quantity: number }>;
}

interface OrderHistoryContextProps {
  orders: Order[];
  addOrder: (order: Order) => void;
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
    const updatedOrders = [...orders, order];
    setOrders(updatedOrders);
    await AsyncStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
  };

  return (
    <OrderHistoryContext.Provider value={{ orders, addOrder }}>
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
