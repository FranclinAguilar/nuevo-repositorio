import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import conector from '../../Servicios/conector';
import './Crud_Usuarios.css';

const Crud_Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  //---------métodos crud para usuarios----------//

  //creación de usuario----------------
  const Añadir = () => {
    navigate('/registro_usuarios');
  };


  //edición---------------------------------
  const Modificar = (usuario) => {
    //envío de datos de Usuario al Formulario.jsx
    navigate('/registro_usuarios', { state: { usuario: usuario } });
  };

  //Consulta
  const listar_usuarios = async () => {
    setCargando(true);
    setError(null);
    
    try {
      const respuesta = await conector.get("/all");
      setUsuarios(respuesta.data);
      setCargando(false);
    } catch (error) {
      setError(error.message);
      setCargando(false);
    }
  };
  

  //eliminar_usuarios---------------------------
  const Eliminar = async (nombre, id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar al usuario ' + nombre + '?')) {
      try {
        const respuesta = await conector.delete('/delete/' + id);
        if (respuesta.status === 200) {
          listar_usuarios();
          alert('Usuario eliminado exitosamente');
        }
      } catch (error) {
        alert(error.response?.status === 404 ? 'Usuario no encontrado' : 'Error al eliminar el usuario');
      }
    }
  };



  return (
    <div className="container">
      <h2>Gestión de Usuarios</h2>

      <div className="button-group">
        <button onClick={listar_usuarios} disabled={cargando}>
          {cargando ? 'Cargando...' : 'Cargar Usuarios'}
        </button>
        <button onClick={Añadir}>
          Crear Usuario
        </button>
      </div>

      {error && <div className="alert error">Error: {"No se pudo cargar los Usuarios"}</div>}

      <table>
        <thead>
          <tr>
            <th className='th-esquina1'>N°</th>
            <th>ci</th>
            <th>Nombre</th>
            <th>apellido</th>
            <th>fecha de nacimiento</th>
            <th>telefono</th>
            <th>dirección</th>
            <th>email</th>
            <th>Estado</th>
            <th className='th-esquina2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario, index) => (
              <tr key={usuario.id}>
                <td>{index + 1}</td>
                <td>{usuario.ci}</td>
                <td>{usuario.nombre || 'N/A'}</td>
                <td>{usuario.apellido || 'N/A'}</td>
                <td>{usuario.f_nacimiento || 'N/A'}</td>
                <td>{usuario.telefono || 'N/A'}</td>
                <td>{usuario.direccion || 'N/A'}</td>
                <td>{usuario.email || 'N/A'}</td>
                <td>{usuario.estado === 1 ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <button className="btn-warning" onClick={() => Modificar(usuario)}> Editar</button>

                  <button className="btn-danger" onClick={() => Eliminar(usuario.nombre, usuario.id)}>Borrar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">No hay usuarios disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Crud_Usuarios;
