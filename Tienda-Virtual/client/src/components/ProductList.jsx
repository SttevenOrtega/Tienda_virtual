import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/productService';
import '../styles/styles.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product._id} className="product">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
