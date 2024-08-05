// src/pages/Confirmacion.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/styles.css';

const Confirmacion = () => {
  const { carrito, calcularTotal, vaciarCarrito } = useCarrito();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { paymentMethod, shippingInfo } = location.state;

  useEffect(() => {
    if (!paymentMethod || !shippingInfo) {
      navigate('/envio');
    }
  }, [paymentMethod, shippingInfo, navigate]);

  const handleConfirmar = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/orders', {
        shippingInfo,
        paymentMethod
      }, { withCredentials: true });

      if (response.status === 201) {
        vaciarCarrito();
        navigate('/gracias');
      } else {
        alert('Error al crear la orden.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error al crear la orden.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="contenedor">
      <section className="confirmacion">
        <h1>Confirmar Compra</h1>
        <h3>Resumen de la compra</h3>
        <ul className="carrito-lista">
          {carrito.map((item, index) => (
            <li key={index} className="carrito-item">
              <img src={item.productId.image} alt={item.productId.name} className="carrito-item-imagen" />
              <div className="carrito-item-detalle">
                <p>{item.productId.name}</p>
                <p>Talla: {item.talla}</p>
                <p>${item.productId.price.toFixed(3)} x {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="carrito-total">
          <strong>Total: ${calcularTotal()}</strong>
        </div>
        <h3>Método de pago</h3>
        <p>{paymentMethod}</p>
        <button className="boton" onClick={handleConfirmar} disabled={isLoading}>
          {isLoading ? 'Procesando...' : 'Confirmar'}
        </button>
      </section>
    </main>
  );
};

export default Confirmacion;
