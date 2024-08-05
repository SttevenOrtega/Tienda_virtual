import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import '../styles/styles.css';

const Envio = () => {
  const navigate = useNavigate();
  const { carrito, calcularTotal } = useCarrito();
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    novedades: false,
    address: '',
    city: '',
    postalCode: '',
    country: '',
    region: '',
    nombre: '',
    apellidos: '',
    cedula: '',
    referencias: '',
    departamento: '',
    telefono: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
    navigate('/metodo-pago');
  };

  return (
    <main className="contenedor__envio">
      <div className="formulario__envio-container">
        <form className="formulario__envio" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Datos para el Envío</legend>
            <div className="contenedor-campos">
              <div className="campo">
                <label htmlFor="email">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="input-text" 
                  value={shippingInfo.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="campo">
                <label htmlFor="novedades">
                  <input 
                    type="checkbox" 
                    id="novedades" 
                    name="novedades" 
                    checked={shippingInfo.novedades}
                    onChange={handleChange}
                  />
                  Enviarme novedades y ofertas por correo electrónico
                </label>
              </div>
              <div className="campo">
                <label htmlFor="country">País</label>
                <input 
                  type="text" 
                  id="country" 
                  name="country" 
                  className="input-text" 
                  value={shippingInfo.country}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="campo">
                <label htmlFor="region">Región</label>
                <input 
                  type="text" 
                  id="region" 
                  name="region" 
                  className="input-text" 
                  value={shippingInfo.region}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="campo">
                <label htmlFor="nombre">Nombre</label>
                <input 
                  type="text" 
                  id="nombre" 
                  name="nombre" 
                  className="input-text" 
                  value={shippingInfo.nombre}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="campo">
                <label htmlFor="apellidos">Apellidos</label>
                <input 
                  type="text" 
                  id="apellidos" 
                  name="apellidos" 
                  className="input-text" 
                  value={shippingInfo.apellidos}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="campo">
                <label htmlFor="cedula">Número de cédula</label>
                <input 
                  type="text" 
                  id="cedula" 
                  name="cedula" 
                  className="input-text" 
                  value={shippingInfo.cedula}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="campo">
                <label htmlFor="address">Dirección</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  className="input-text" 
                  value={shippingInfo.address}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="campo">
                <label htmlFor="referencias">Referencias adicionales de dirección</label>
                <input 
                  type="text" 
                  id="referencias" 
                  name="referencias" 
                  className="input-text" 
                  value={shippingInfo.referencias}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="campo">
                <label htmlFor="city">Ciudad</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city" 
                  className="input-text" 
                  value={shippingInfo.city}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="campo">
                <label htmlFor="departamento">Departamento</label>
                <input 
                  type="text" 
                  id="departamento" 
                  name="departamento" 
                  className="input-text" 
                  value={shippingInfo.departamento}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="campo">
                <label htmlFor="postalCode">Código postal</label>
                <input 
                  type="text" 
                  id="postalCode" 
                  name="postalCode" 
                  className="input-text" 
                  value={shippingInfo.postalCode}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="campo">
                <label htmlFor="telefono">Teléfono</label>
                <input 
                  type="text" 
                  id="telefono" 
                  name="telefono" 
                  className="input-text" 
                  value={shippingInfo.telefono}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
          </fieldset>
          <button type="submit" className="boton">Continuar</button>
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
    </main>
  );
};

export default Envio;
