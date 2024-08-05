import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, deleteUser } from '../api/userService'; // Asegúrate de que esta ruta sea correcta
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Asegúrate de que el archivo de estilos esté importado

const Configuracion = () => {
  const { user, setUser, signout } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedUser = await updateProfile({ username, email, password });
      setUser(updatedUser);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    navigate('/editar-perfil');
  };

  const handleEditShipping = () => {
    navigate('/editar-envio');
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUser();
      setMessage(response.message);
      signout();
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleShowConfirm = () => {
    setShowConfirm(true);
  };

  const handleHideConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <div className="configuracion">
      <h1>Configuración de la Cuenta</h1>
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
      <div className="configuracion__contenedor">
        <button className="configuracion__boton" onClick={handleEditProfile}>
          Editar Perfil
        </button>
        <button className="configuracion__boton" onClick={handleEditShipping}>
          Datos de Envío
        </button>
        <button className="configuracion__boton configuracion__boton--eliminar" onClick={handleShowConfirm}>
          Eliminar Cuenta
        </button>
      </div>
      {showConfirm && (
        <div className="confirm-dialog">
          <p>¿Estás seguro de que quieres eliminar tu cuenta?</p>
          <button onClick={handleDeleteAccount}>Sí, eliminar</button>
          <button onClick={handleHideConfirm}>No, cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Configuracion;
