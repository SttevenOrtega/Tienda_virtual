import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import '../styles/styles.css';

const MetodoPago = () => {
  const navigate = useNavigate();
  const { carrito, calcularTotal } = useCarrito();
  const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      shippingInfo,
      paymentMethod: 'Credit Card',
      paymentInfo,
      carrito
    };
    // Aquí puedes hacer la solicitud para crear la orden
    // navigate('/gracias');
  };

  return (
    <main className="contenedor__envio">
      <div className="formulario__envio-container">
        <form className="formulario__envio" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Datos de Pago</legend>
            <div className="contenedor-campos">
              <div className="campo">
                <label htmlFor="cardNumber">Número de Tarjeta</label>
                <input 
                  type="text" 
                  id="cardNumber" 
                  name="cardNumber" 
                  className="input-text" 
                  value={paymentInfo.cardNumber}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="campo">
                <label htmlFor="cardName">Nombre en la Tarjeta</label>
                <input 
                  type="text" 
                  id="cardName" 
                  name="cardName" 
                  className="input-text" 
                  value={paymentInfo.cardName}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="campo">
                <label htmlFor="expiryDate">Fecha de Expiración</label>
                <input 
                  type="text" 
                  id="expiryDate" 
                  name="expiryDate" 
                  className="input-text" 
                  value={paymentInfo.expiryDate}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="campo">
                <label htmlFor="cvv">CVV</label>
                <input 
                  type="text" 
                  id="cvv" 
                  name="cvv" 
                  className="input-text" 
                  value={paymentInfo.cvv}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
          </fieldset>
          <button type="submit" className="boton">Pagar</button>
        </form>
      </div>
      <div className="carrito__envio-container">
        <h3>Resumen de Compra</h3>
        <ul className="carrito-lista">
          {carrito.map((item, index) => (
            <li key={index} className="carrito-item">
              <img src={item.productId.image} alt={item.productId.name} className="carrito-item-imagen" />
              <div className="carrito-item-detalle">
                <p>{item.productId.name}</p>
                <p>Talla: {item.talla || 'N/A'}</p>
                <p>${item.productId.price ? item.productId.price.toFixed(3) : 'N/A'} x {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="carrito-total">
          <p>Total: ${carrito.length > 0 ? calcularTotal() : '0.000'}</p>
        </div>
      </div>
      <div className="carrito__envio-container">
        <h3>Datos de Envío</h3>
        <ul className="carrito-lista">
          <li className="carrito-item-detalle" style={{ marginBottom: '1rem' }}>
            <p>Nombre: {shippingInfo.nombre} {shippingInfo.apellidos}</p>
            <p>Correo electrónico: {shippingInfo.email}</p>
            <p>Dirección: {shippingInfo.address}</p>
            <p>Referencias adicionales de dirección: {shippingInfo.referencias}</p>
            <p>Ciudad: {shippingInfo.city}</p>
            <p>Región: {shippingInfo.region}</p>
            <p>País: {shippingInfo.country}</p>
            <p>Código postal: {shippingInfo.postalCode}</p>
            <p>Teléfono: {shippingInfo.telefono}</p>
            <p>Número de cédula: {shippingInfo.cedula}</p>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default MetodoPago;
