import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

interface WishlistContextProps {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
}

const WishlistContext = createContext<WishlistContextProps>({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    console.log('Initial Wishlist:', wishlist);
  }, []);

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.find((p) => p.id === product.id)) {
        console.log('Product already in Wishlist:', product);
        return prevWishlist;
      }
      const updatedWishlist = [...prevWishlist, product];
      console.log('Product to be added:', product);
      console.log('Added to Wishlist:', updatedWishlist);
      return updatedWishlist;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter((product) => product.id !== productId);
      console.log('Product ID to be removed:', productId);
      console.log('Removed from Wishlist:', updatedWishlist);
      return updatedWishlist;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
