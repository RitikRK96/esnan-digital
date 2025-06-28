import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  clearCartLocal: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};



export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const UID = user?.id;

  const API_BASE_URL = "https://us-central1-esnan-digital-10a7b.cloudfunctions.net/api";
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const storageKey = `cart_${UID}`;
      const cachedData = sessionStorage.getItem(storageKey);

      try {
        if (cachedData) {
          const parsedItems = JSON.parse(cachedData) as CartItem[];
          setItems(parsedItems);
        } else {
          const response = await axios.get(`${API_BASE_URL}/cart/${UID}`);
          if (response.status !== 200) throw new Error("Failed to fetch cart");

          const data = response.data || {};
          const fetchedItems = Object.values(data) as CartItem[];

          sessionStorage.setItem(storageKey, JSON.stringify(fetchedItems));
          setItems(fetchedItems);
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    if (UID) fetchCart();
  }, [UID]);




  const addToCart = async (product: Omit<CartItem, 'quantity'>) => {
    const existingItem = items.find(item => item.id === product.id);
    const updatedItem = existingItem
      ? { ...existingItem, quantity: existingItem.quantity + 1 }
      : { ...product, quantity: 1 };

    try {
      await axios.post(`${API_BASE_URL}/cart/${UID}/add`, updatedItem);
      sessionStorage.removeItem(`cart_${UID}`);

      setItems(prev =>
        existingItem
          ? prev.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
          : [...prev, updatedItem]
      );
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/${UID}/${productId}`);
      sessionStorage.removeItem(`cart_${UID}`);

      setItems(prev => prev.filter(item => item.id !== productId));
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    sessionStorage.removeItem(`cart_${UID}`);

    const item = items.find(i => i.id === productId);
    if (!item) return;

    const updatedItem = { ...item, quantity };
    try {
      await axios.post(`${API_BASE_URL}/cart/${UID}/add`, updatedItem);

      setItems(prev =>
        prev.map(item => item.id === productId ? updatedItem : item)
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/${UID}`);
      sessionStorage.removeItem(`cart_${UID}`);
      setItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const clearCartLocal = async () => {
    try {
      //have to add the api to clear the cart
      sessionStorage.removeItem(`cart_${UID}`);
      setItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };


  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      clearCartLocal,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
