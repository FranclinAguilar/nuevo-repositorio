
import React, { useState } from 'react';
import conector from '../../Servicios/conector';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    if (!usuario || !contraseña) {
      return setError('Usuario y contraseña son obligatorios');
    }

    setCargando(true);

    try {
      const { data, status } = await conector.post('/login', { username: usuario, password: contraseña });
      if (status === 200) {
        localStorage.setItem('empresaId', data.empresaId);
        navigate(data.rol === '1' ? '/inicio_cliente' : '/inicio_oficina');
      }
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className='contenedor_login'>

      <h1 className='ViaSvel'>ViaSvel</h1>
      <br /> 
      <form onSubmit={manejarEnvio} className="login-form">
      <h2 className='iniciosesion'>Iniciar sesión</h2><br />
        <div className="form-group">
          <label htmlFor="usuario">Nombre de usuario</label>
          <input
            type="text"
            id="usuario"
            placeholder="Introduce tu nombre de usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            placeholder="Introduce tu contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-alert">{error}</div>}
        <button type="submit" disabled={cargando} className="submit-button">
          {cargando ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
};

export default Login;
