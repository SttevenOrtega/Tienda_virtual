import React from 'react';
import '../styles/styles.css';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom

const Contacto = () => {
  return (
    <>
      <main className="contenedor">
        <section>
          <h2>Contacto</h2>
          <form className="formulario_contacto">
            <fieldset>
              <legend>Contactános llenando todos los campos</legend>
              <div className="contenedor_contacto-campos">
                <div className="campo">
                  <label>Nombre</label>
                  <input className="input-text" type="text" placeholder="Tu Nombre" />
                </div>
                <div className="campo">
                  <label>Teléfono</label>
                  <input className="input-text" type="tel" placeholder="Tu Teléfono" />
                </div>
                <div className="campo">
                  <label>Correo</label>
                  <input className="input-text" type="email" placeholder="Tu Email" />
                </div>
                <div className="campo">
                  <label>Mensaje</label>
                  <textarea className="input-text"></textarea>
                </div>
              </div>
              <div className="alinear-derecha flex">
                <input className="boton w-sm-100" type="submit" value="Enviar" />
              </div>
            </fieldset>
          </form>
        </section>
      </main>
    </>
  );
};

export default Contacto;
