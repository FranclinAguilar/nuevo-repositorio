import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import conector from '../../Servicios/conector'; 
import './Crud_Usuarios.css';

const Crud_Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchUsers = () => {
    setLoading(true);
    setError(null);

    conector.get('/all')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleEdit = (id) => {
    navigate(`/usuarios/CrearUsuario/${id}`);
  };
  
  const handleDelete = async (nombre, id) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${nombre}?`)) {
      try {
        const response = await conector.delete(`/delete/${id}`);
        if (response.status === 200) {
          fetchUsers();
          alert('Usuario eliminado exitosamente');
        }
      } catch (error) {
        alert(error.response?.status === 404 ? 'Usuario no encontrado' : 'Error al eliminar el usuario');
      }
    }
  };

  // Función para navegar a la página de creación de usuario
  const goToCreateUser = () => {
    navigate('/formulario_usuario');
  };

  return (
    <div className="container">
      <h2>Gestión de Usuarios</h2>

      <div className="button-group">
        <button onClick={fetchUsers} disabled={loading}>
          {loading ? 'Cargando...' : 'Cargar Usuarios'}
        </button>
        <button onClick={goToCreateUser}>
          Crear Usuario
        </button>
      </div>

      {error && <div className="alert error">Error: {"No se pudo cargar los Usuarios"}</div>}

      <table>
        <thead>
          <tr>
            <th className='th-esquina1'>No</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Empresa ID</th>
            <th>Estado</th>
            <th>Rol</th>
            <th className='th-esquina2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.nombre || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>{user.empresaId || 'N/A'}</td>
                <td>{user.estado === 1 ? 'Activo' : 'Inactivo'}</td>
                <td>{user.rol || 'N/A'}</td>
                <td>
                  <button className="btn-warning" onClick={() => handleEdit(user.id)}>
                    Modificar
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(user.nombre, user.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No hay usuarios disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Crud_Usuarios;
