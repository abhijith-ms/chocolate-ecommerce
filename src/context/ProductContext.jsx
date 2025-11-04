import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { products as initialProducts } from '../data/products.js';

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null
      };
    case 'ADD_PRODUCT':
      const newProduct = {
        ...action.payload,
        id: Math.max(...state.products.map(p => p.id), 0) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      return {
        ...state,
        products: [...state.products, newProduct]
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id
            ? { ...product, ...action.payload, updatedAt: new Date() }
            : product
        )
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

const initialState = {
  products: [],
  loading: true,
  error: null
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    // Simulate loading initial products
    setTimeout(() => {
      dispatch({ type: 'SET_PRODUCTS', payload: initialProducts });
    }, 100);
  }, []);

  const addProduct = (productData) => {
    dispatch({ type: 'ADD_PRODUCT', payload: productData });
  };

  const updateProduct = (id, productData) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: { id, ...productData } });
  };

  const deleteProduct = (id) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  const getProduct = (id) => {
    return state.products.find(product => product.id === parseInt(id));
  };

  const searchProducts = (query) => {
    if (!query) return state.products;
    return state.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filterByCategory = (category) => {
    if (!category) return state.products;
    return state.products.filter(product => product.category === category);
  };

  const value = {
    ...state,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    searchProducts,
    filterByCategory
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};