import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import conector from '../../Servicios/conector';
import './Crud_unidades.css';

const Crud_Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Añadir Usuario
    const añadirUsuario = () => {
        navigate('/registro_usuarios');
    };

    // Modificar Usuario
    const modificarUsuario = (usuario) => {
        navigate('/registro_usuarios', { state: { usuario } });
    };

    // Listar Usuarios
    const listarUsuarios = async () => {
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

    // Eliminar Usuario
    const eliminarUsuario = async (nombre, id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar al usuario ' + nombre + '?')) {
            try {
                const respuesta = await conector.delete('/delete/' + id);
                if (respuesta.status === 200) {
                    listarUsuarios();
                    alert('Usuario eliminado exitosamente');
                }
            } catch (error) {
                alert(error.response?.status === 404 ? 'Usuario no encontrado' : 'Error al eliminar el usuario');
            }
        }
    };

    return (
        <div className="contenedor-lista-usuarios">
            <h2 className="titulo">Gestión de Usuarios</h2>

            <div className="boton-grupo">
                <button onClick={listarUsuarios} disabled={cargando}>
                    {cargando ? 'Cargando...' : 'Cargar Usuarios'}
                </button>
                <button onClick={añadirUsuario}>
                    Crear Usuario
                </button>
            </div>

            {error && <div className="alerta error">Error: No se pudo cargar los usuarios</div>}

            <table className="tabla-usuarios">
                <thead>
                    <tr>
                        <th className='th-esquina1'>N°</th>
                        <th>CI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Email</th>
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
                                    <button className="btn-warning" onClick={() => modificarUsuario(usuario)}>Editar</button>
                                    <button className="btn-danger" onClick={() => eliminarUsuario(usuario.nombre, usuario.id)}>Borrar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="text-center">No hay usuarios disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Crud_Usuarios;
