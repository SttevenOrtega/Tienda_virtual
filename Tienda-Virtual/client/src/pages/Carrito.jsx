import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const Carrito = () => {
  const { carrito, eliminarProducto, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.price * item.cantidad, 0).toFixed(3);
  };

  const handleComprarNuevo = () => {
    try {
      console.log("Botón 'Comprar Nuevo' presionado");
      console.log("Contenido del carrito:", carrito);
      if (carrito.length > 0) {
        console.log("Redirigiendo a /envio");
        navigate('/envio');
      } else {
        console.log("Carrito vacío");
      }
    } catch (error) {
      console.error("Error en handleComprarNuevo:", error);
    }
  };

  const handleCarritoClick = (e) => {
    e.stopPropagation(); // Evita que el evento se propague al contenedor padre
  };

  return (
    <div className="contenedor">
      <h1>Carrito de Compras</h1>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <div onClick={handleCarritoClick}>
          <ul className="carrito-lista">
            {carrito.map((producto) => (
              <li key={producto.id} className="carrito-item">
                <img src={producto.image} alt={producto.name} className="carrito-item-imagen" />
                <div>
                  <p>{producto.name}</p>
                  <p>${producto.price.toFixed(3)} x {producto.cantidad}</p>
                </div>
                <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <p>Total: ${calcularTotal()}</p>
          <button onClick={vaciarCarrito}>Vaciar Carrito</button>
          <button onClick={handleComprarNuevo}>Comprar Nuevo</button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
