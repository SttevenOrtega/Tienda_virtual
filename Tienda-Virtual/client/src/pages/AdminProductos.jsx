import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../api/productService';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const AdminProductos = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter(product => product._id !== id));
    setMessage('Producto eliminado correctamente');
  };

  const handleEditProduct = (id) => {
    navigate(`/admin/editar-producto/${id}`);
  };

  const handleAddProduct = () => {
    navigate('/admin/nuevo-producto');
  };

  return (
    <div className="admin-productos">
      <h1>Administrar Productos</h1>
      {message && <p className="message">{message}</p>}
      <button onClick={handleAddProduct} className="add-product-button">Agregar Producto</button>
      <div className="productos">
        {products.map(product => (
          <div key={product._id} className="producto">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price.toFixed(3)}</p>
            <div className="button-container">
              <button onClick={() => handleEditProduct(product._id)}>Editar</button>
              <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductos;
