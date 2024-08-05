import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CarritoContext = createContext();

export const useCarrito = () => {
  return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cart', { withCredentials: true });
        setCarrito(response.data.items || []);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCarrito([]);
      }
    };

    fetchCart();
  }, []);

  const agregarProducto = async (producto) => {
    try {
      const response = await axios.post('http://localhost:4000/api/cart/add', producto, { withCredentials: true });
      setCarrito(response.data.items);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const eliminarProducto = async (productId, talla) => {
    try {
      const response = await axios.post('http://localhost:4000/api/cart/remove', { productId, talla }, { withCredentials: true });
      setCarrito(response.data.items);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const vaciarCarrito = async () => {
    try {
      await axios.post('http://localhost:4000/api/cart/clear', {}, { withCredentials: true });
      setCarrito([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.productId.price || 0) * item.quantity, 0).toFixed(3);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, eliminarProducto, vaciarCarrito, calcularTotal }}>
      {children}
    </CarritoContext.Provider>
  );
};
