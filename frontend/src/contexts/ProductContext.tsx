import React, { createContext, useContext, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { IFilters } from '@/types/product.list.type';
import { IProductCard } from '@/types/product.card.type';

interface CartItem extends IProductCard {
  quantity: number;
}

interface ProductContextType {
  filters: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  debouncedFilters: IFilters;
  setDebouncedFilters: (filters: IFilters) => void;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filtersOpen: boolean;
  setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cart: CartItem[];
  addToCart: (product: IProductCard) => void;
  removeFromCart: (productId: number | string) => void;
  updateCartItemQuantity: (productId: number | string, quantity: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<IFilters>({
    query: '',
    categoryIds: [],
    minPrice: undefined,
    maxPrice: undefined,
    page: 1,
    pageSize: 10,
  });

  const [debouncedFilters, setDebouncedFilters] = useState<IFilters>(filters);
  const [modalOpen, setModalOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const debouncedSetFilters = useCallback(
    debounce((newFilters: IFilters) => {
      setDebouncedFilters(newFilters);
    }, 300),
    []
  );

  const addToCart = useCallback((product: IProductCard) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number | string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const updateCartItemQuantity = useCallback((productId: number | string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter((item) => item.quantity > 0)
    );
  }, []);

  return (
    <ProductContext.Provider
      value={{
        filters,
        setFilters,
        debouncedFilters,
        setDebouncedFilters: debouncedSetFilters,
        modalOpen,
        setModalOpen,
        filtersOpen,
        setFiltersOpen,
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};