import React, { useState } from 'react';
import conector from '../../Servicios/conector';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, Alert } from 'reactstrap'; // Importa los componentes de reactstrap
import 'bootstrap/dist/css/bootstrap.min.css';
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
        localStorage.setItem('usuarioId', data.id);
        localStorage.setItem('empresaId', data.empresaId);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('apellido', data.apellido);
        localStorage.setItem('rol', data.rol);

        // Redirigir según el rol
        switch (data.rol) {
          case 'Pasajero':
            navigate('/inicio_cliente');
            break;
          case 'Oficina':
            navigate('/inicio_oficina');
            break;
          case 'Admin':
            navigate('/inicio_oficina');
            break;
          default:
            setError('Rol desconocido, contacte a soporte.');
        }
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setError('El usuario se encuentra inactivo');
      } else {
        setError('Número de teléfono o contraseña incorrectos');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className='fondo_login'>
      <div className='contenedor_login'>
        <h2 className='titulo_sesion'>Iniciar sesión</h2>
        <Form onSubmit={manejarEnvio}>
          <FormGroup floating>
            <Input
              type="text"
              id="telefono"
              placeholder="Número de teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
            <Label for="telefono">Número de teléfono</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="password"
              id="contraseña"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
            <Label for="contraseña">Contraseña</Label>
          </FormGroup>
          {error && <Alert color="danger">{error}</Alert>}
          <Button color="primary" type="submit" disabled={cargando}>
            {cargando ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
