// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MisCompras from "./pages/MisCompras";
import Configuracion from "./pages/Configuracion";
import Carrito from "./pages/Carrito";
import Nosotros from "./pages/Nosotros";
import EditarPerfil from "./pages/EditarPerfil";
import EditarEnvio from "./pages/EditarEnvio";
import Navegacion from "./components/Navegacion";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Producto from './pages/Producto';
import AdminProductos from './pages/AdminProductos';
import ProductoForm from './pages/ProductoForm';
import AdminRoute from './components/AdminRoute';
import Envio from './pages/Envio';
import MetodoPago from './pages/MetodoPago';
import Confirmacion from './pages/Confirmacion';
import Gracias from './pages/Gracias';

const App = () => {
  return (
    <>
      <Header />
      <Navegacion />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/admin/productos" element={<AdminRoute><AdminProductos /></AdminRoute>} />
        <Route path="/admin/nuevo-producto" element={<AdminRoute><ProductoForm /></AdminRoute>} />
        <Route path="/admin/editar-producto/:id" element={<AdminRoute><ProductoForm /></AdminRoute>} />
        <Route path="/miscompras" element={<PrivateRoute><MisCompras /></PrivateRoute>} />
        <Route path="/configuracion" element={<PrivateRoute><Configuracion /></PrivateRoute>} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/editar-perfil" element={<PrivateRoute><EditarPerfil /></PrivateRoute>} />
        <Route path="/editar-envio" element={<PrivateRoute><EditarEnvio /></PrivateRoute>} />
        <Route path="/envio" element={<PrivateRoute><Envio /></PrivateRoute>} />
        <Route path="/metodo-pago" element={<PrivateRoute><MetodoPago /></PrivateRoute>} />
        <Route path="/confirmacion" element={<PrivateRoute><Confirmacion /></PrivateRoute>} />
        <Route path="/gracias" element={<PrivateRoute><Gracias /></PrivateRoute>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
