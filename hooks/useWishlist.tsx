import React, { createContext, useContext, useState } from 'react';

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

interface WishlistContextProps {
  wishlist: Product[];
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (id: number) => void;
}

export const WishlistContext = createContext<WishlistContextProps>({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (item: Product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
