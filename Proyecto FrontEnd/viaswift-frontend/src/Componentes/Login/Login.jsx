import React, { useState } from 'react';
import conector from '../../Servicios/conector';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [telefono, setTelefono] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    if (!telefono || !contraseña) {
      return setError('Número de teléfono y contraseña son obligatorios');
    }

    setCargando(true);

    try {
      const { data, status } = await conector.post('/login', { telefono, password: contraseña });
      if (status === 200) {
        // Almacenar el ID del usuario y el ID de la empresa en localStorage
        localStorage.setItem('usuarioId', data.usuarioId);  // Asumiendo que el ID del usuario se llama 'usuarioId'
        localStorage.setItem('empresaId', data.empresaId);

        // Redirigir según el rol
        navigate(data.rol === 'Pasajero' ? '/inicio_cliente' : '/inicio_oficina');
      }
    } catch (err) {
      setError('Número de teléfono o contraseña incorrectos');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className='contenedor-login'>
      <br />
      <form onSubmit={manejarEnvio} className="formulario-login">
        <h2 className='titulo-sesion'>Iniciar sesión</h2><br />
        <div className="grupo-formulario">
          <input
            className='entrada-login'
            type="text"
            id="telefono"
            placeholder="Número de teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div className="grupo-formulario">
          <input
            className='entrada-login'
            type="password"
            id="contraseña"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        {error && <div className="alerta-error">{error}</div>}
        <div className='contenedor-boton-login'>
          <button type="submit" disabled={cargando} className="boton-enviar">
            {cargando ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default Login;
