import { useState } from 'react';

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
}

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.find((p) => p.id === product.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((product) => product.id !== productId));
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  };
};
