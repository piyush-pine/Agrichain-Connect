
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { mockProducts } from '@/lib/data';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('agrichain-products');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        // Load mock products if no saved data
        setProducts(mockProducts);
      }
    } catch (error) {
      console.error("Failed to parse products from localStorage", error);
      setProducts(mockProducts);
    }
  }, []);

  useEffect(() => {
    try {
      if (products.length > 0) {
        localStorage.setItem('agrichain-products', JSON.stringify(products));
      }
    } catch (error) {
       console.error("Failed to save products to localStorage", error);
    }
  }, [products]);


  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [product, ...prevProducts]);
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
