import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';
import '../styles/styles.css';
import '../styles/normalize.css';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Navegacion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signout } = useAuth();
  const { carrito, eliminarProducto, calcularTotal } = useCarrito();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setShowCart(false);
  }, [location]);

  const isActive = (paths) => paths.includes(location.pathname);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  const toggleCart = () => setShowCart(!showCart);

  const handleCarritoClick = (e) => {
    e.stopPropagation();
  };

  const handleComprar = () => {
    navigate('/envio');
  };

  return (
    <nav className="navegacion">
      <div className="navegacion__contenedor">
        <div className="navegacion__izquierda">
          <Link className={`navegacion__enlace ${isActive(['/']) ? 'navegacion__enlace--activo' : ''}`} to="/">Tienda</Link>
          <Link className={`navegacion__enlace ${isActive(['/nosotros']) ? 'navegacion__enlace--activo' : ''}`} to="/nosotros">Nosotros</Link>
          <Link className={`navegacion__enlace ${isActive(['/contacto']) ? 'navegacion__enlace--activo' : ''}`} to="/contacto">Contacto</Link>
        </div>
        <div className="navegacion__derecha">
          <div className="navegacion__carrito" onClick={toggleCart}>
            <FaShoppingCart className="navegacion__carrito-icon" />
            {carrito.length > 0 && <span className="navegacion__carrito-count">{carrito.length}</span>}
            {showCart && (
              <div className="navegacion__carrito-dropdown" onClick={handleCarritoClick}>
                {carrito.length > 0 ? (
                  <div>
                    {carrito.map((item, index) => (
                      <div key={index} className="carrito-item">
                        <img src={item.productId.image} alt={item.productId.name} className="carrito-item-imagen" />
                        <div className="carrito-item-info">
                          <p>{item.productId.name}</p>
                          <p>Talla: {item.talla}</p>
                          <p>${item.productId.price.toFixed(3)} x {item.quantity}</p>
                        </div>
                        <button className="carrito-item-eliminar" onClick={() => eliminarProducto(item.productId._id, item.talla)}>Eliminar</button>
                      </div>
                    ))}
                    <div className="carrito-total">
                      <strong>Total: ${calcularTotal()}</strong>
                    </div>
                    <button className="comprar-button" onClick={handleComprar}>Comprar</button>
                  </div>
                ) : (
                  <div className="carrito-vacio">El carrito está vacío</div>
                )}
              </div>
            )}
          </div>
          {isAuthenticated ? (
            <div className="navegacion__usuario" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <span className="navegacion__enlace navegacion__enlace--activo">{user?.username || 'Cargando...'}</span>
              {showDropdown && (
                <div className="navegacion__dropdown">
                  <Link className="navegacion__dropdown-enlace" to="/MisCompras">Mis compras</Link>
                  {user?.role === 'admin' && (
                    <Link className="navegacion__dropdown-enlace" to="/admin/productos">Administrar Productos</Link>
                  )}
                  <Link className="navegacion__dropdown-enlace" to="/Configuracion">Configuración</Link>
                  <button className="navegacion__dropdown-enlace" onClick={signout}>Cerrar sesión</button>
                </div>
              )}
            </div>
          ) : (
            <Link className={`navegacion__enlace ${isActive(['/login', '/register']) ? 'navegacion__enlace--activo' : ''}`} to="/login">
              <FaUser /> {/* Aquí se reemplaza el texto por el ícono de usuario */}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navegacion;
