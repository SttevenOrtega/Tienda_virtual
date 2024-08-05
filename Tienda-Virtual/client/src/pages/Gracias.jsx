// src/pages/Gracias.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const Gracias = () => {
  return (
    <main className="contenedor">
      <section className="gracias">
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu orden ha sido procesada exitosamente.</p>
        <Link to="/" className="boton">Volver a la tienda</Link>
      </section>
    </main>
  );
};

export default Gracias;
