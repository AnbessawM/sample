import React, { createContext, useContext, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  increment: () => {},
  decrement: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      }
      return [...prev, item];
    });
  };

  const increment = (id: number) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decrement = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: quantity } : p
      ).filter((p) => p.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, increment, decrement, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);