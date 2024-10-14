import React, { useState } from 'react';
import conector from '../../Servicios/conector';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [telefono, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    if (!telefono || !contraseña) {
      return setError('Usuario y contraseña son obligatorios');
    }

    setCargando(true);

    try {
      const { data, status } = await conector.post('/login', { telefono: telefono, password: contraseña });
      if (status === 200) {
        // Almacenar el ID del usuario y el ID de la empresa en localStorage
        localStorage.setItem('usuarioId', data.usuarioId);  // Asumiendo que el ID del usuario se llama 'usuarioId'
        localStorage.setItem('empresaId', data.empresaId);
        
        // Redirigir según el rol
        navigate(data.rol === 'Pasajero' ? '/inicio_cliente' : '/inicio_oficina');
      }
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className='contenedor_login'>
      <br />
      <form onSubmit={manejarEnvio} className="login-form">
        <h2 className='iniciosesion'>Iniciar sesión</h2><br />
        <div className="form-group">
          <input
            className='input-login'
            type="text"
            id="usuario"
            placeholder="Número de teléfono"
            value={telefono}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className='input-login'
            type="password"
            id="contraseña"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-alert">{error}</div>}
        <div className='contenedor_boton_login'>
          <button type="submit" disabled={cargando} className="submit-button">
            {cargando ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default Login;
