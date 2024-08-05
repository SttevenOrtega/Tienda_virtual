import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, createProduct, updateProduct } from '../api/productService';
import '../styles/styles.css';

const ProductoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: []
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const productData = await getProductById(id);
        setProduct(productData);
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleStockChange = (index, field, value) => {
    const newStock = [...product.stock];
    newStock[index][field] = value;
    setProduct({ ...product, stock: newStock });
  };

  const addStock = () => {
    setProduct({ ...product, stock: [...product.stock, { talla: '', cantidad: 0 }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(id, product);
      } else {
        await createProduct(product);
      }
      navigate('/admin/productos');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="producto-form">
      <h1>{id ? 'Editar Producto' : 'Agregar Producto'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">URL de la Imagen</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          {product.stock.map((item, index) => (
            <div key={index} className="stock-item">
              <select
                value={item.talla}
                onChange={(e) => handleStockChange(index, 'talla', e.target.value)}
                required
              >
                <option value="" disabled>Selecciona una talla</option>
                <option value="pequeña">Pequeña</option>
                <option value="mediana">Mediana</option>
                <option value="grande">Grande</option>
              </select>
              <input
                type="number"
                value={item.cantidad}
                onChange={(e) => handleStockChange(index, 'cantidad', e.target.value)}
                required
                className="stock-input"
              />
            </div>
          ))}
          <button type="button" onClick={addStock}>Agregar Talla</button>
        </div>
        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
};

export default ProductoForm;
