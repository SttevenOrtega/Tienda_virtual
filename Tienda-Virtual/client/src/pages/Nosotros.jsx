import React from "react";
import "../styles/styles.css";
import "../styles/normalize.css";

const Nosotros = () => {
  return (
    <>
      <main className="contenedor">
        <h1 className="nosotros__titulo">Nosotros</h1>

        <div className="nosotros">
          <div className="nosotros__contenido">
            <p>Nam nec metus a risus auctor congue nec non felis...</p>
            <p>Vestibulum ante ipsum primis in faucibus orci...</p>
          </div>
          <img className="nosotros__imagen" src="/assets/img/nosotros.jpg" alt="imagen nosotros" />
        </div>
      </main>

      <section className="contenedor comprar">
        <h2 className="comprar__titulo">¿Porqué Comprar con nosotros?</h2>

        <div className="bloques">
          <div className="bloque">
            <img className="bloque__imagen" src="/assets/img/icono_1.png" alt="porque comprar" />
            <h3 className="bloque__titulo">El Mejor Precio</h3>
            <p className="bloque__descripcion">Vestibulum ante ipsum primis in faucibus...</p>
          </div>

          <div className="bloque">
            <img className="bloque__imagen" src="/assets/img/icono_2.png" alt="porque comprar" />
            <h3 className="bloque__titulo">Compra con confianza</h3>
            <p className="bloque__descripcion">Vestibulum ante ipsum primis in faucibus...</p>
          </div>

          <div className="bloque">
            <img className="bloque__imagen" src="/assets/img/icono_3.png" alt="porque comprar" />
            <h3 className="bloque__titulo">Envío Gratis</h3>
            <p className="bloque__descripcion">Vestibulum ante ipsum primis in faucibus...</p>
          </div>

          <div className="bloque">
            <img className="bloque__imagen" src="/assets/img/icono_4.png" alt="porque comprar" />
            <h3 className="bloque__titulo">La Mejor Calidad</h3>
            <p className="bloque__descripcion">Vestibulum ante ipsum primis in faucibus...</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nosotros;
