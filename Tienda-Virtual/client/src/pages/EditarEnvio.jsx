// src/pages/EditarEnvio.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateShipping } from '../api/userService'; // Asegúrate de que esta ruta sea correcta
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Asegúrate de que el archivo de estilos esté importado

const EditarEnvio = () => {
  const { user } = useAuth();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Cargar los datos de envío del usuario
    }
  }, [user]);

  const handleUpdateShipping = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateShipping({ address, city, state, zip });
      navigate('/configuracion');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="editar-envio">
      <h1>Datos de Envío</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleUpdateShipping}>
        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Ciudad</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">Estado</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zip">Código Postal</label>
          <input
            type="text"
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
};

export default EditarEnvio;
