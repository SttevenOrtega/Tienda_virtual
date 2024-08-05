import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/productService';
import '../styles/styles.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <main className="contenedor">
        <h1>Nuestros Productos</h1>
        <div className="grid">
          {products.map((product) => (
            <div className="producto" key={product._id}>
              <Link to={`/producto/${product._id}`}>
                <img className="producto__imagen" src={product.image} alt={product.name} />
                <div className="producto__informacion">
                  <p className="producto__nombre">{product.name}</p>
                  <p className="producto__precio">${product.price.toFixed(3)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
