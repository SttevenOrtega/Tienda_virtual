import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/productService';
import { useCarrito } from '../context/CarritoContext';
import '../styles/styles.css';

const Producto = () => {
  const { id } = useParams();
  const { agregarProducto } = useCarrito();
  const [product, setProduct] = useState(null);
  const [talla, setTalla] = useState('');
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductById(id);
      setProduct(productData);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Cargando...</div>;

  const handleAgregarCarrito = (e) => {
    e.preventDefault();
    agregarProducto({
      productId: product._id,
      quantity: parseInt(cantidad),
      talla: talla
    });
  };

  return (
    <main className="contenedor">
      <h1>{product.name}</h1>
      <div className="camisa">
        <img className="camisa__imagen" src={product.image} alt={product.name} />
        <div className="camisa__contenido">
          <p>{product.description}</p>
          <p style={{ color: 'var(--secundario)' }}>Precio: ${product.price.toFixed(3)}</p>
          <form className="formulario" onSubmit={handleAgregarCarrito}>
            <div className="form-group">
              <label htmlFor="talla">Talla</label>
              <select
                id="talla"
                className="formulario__campo"
                value={talla}
                onChange={(e) => setTalla(e.target.value)}
                required
              >
                <option value="" disabled>-- Seleccionar Talla --</option>
                {product.stock.map((stockItem, index) => (
                  <option key={index} value={stockItem.talla}>
                    {stockItem.talla} (Disponible: {stockItem.cantidad})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cantidad">Cantidad</label>
              <input
                id="cantidad"
                className="formulario__campo"
                type="number"
                placeholder="Cantidad"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />
            </div>
            <button className="formulario__submit" type="submit">
              Agregar al Carrito
            </button>
            <button className="formulario__submit">
              <a href="/envio" style={{ color: 'white', textDecoration: 'none' }}>Comprar Ahora</a>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Producto;
