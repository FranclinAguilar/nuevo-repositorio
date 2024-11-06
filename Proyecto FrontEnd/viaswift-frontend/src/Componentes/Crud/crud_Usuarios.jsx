import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import conector from '../../Servicios/conector';
import './Crud_Usuarios.css';

const Crud_Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState('');
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
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    };

    // Eliminar Usuario (cambiar estado)
    // Eliminar Usuario (cambiar estado)
    const eliminarUsuario = async (nombre, id, estadoActual) => {
        const nuevoEstado = estadoActual === true ? false : true; // Alternar entre true y false
        const mensajeEstado = nuevoEstado ? 'activo' : 'inactivo';
        
        // Encontrar el usuario por ID y preparar el objeto actualizado con el nuevo estado
        const usuarioActualizado = usuarios.find(usuario => usuario.id === id);
        
        if (usuarioActualizado) {
            const usuarioConEstadoActualizado = { ...usuarioActualizado, estado: nuevoEstado };
            
            if (window.confirm(`¿Estás seguro de que deseas cambiar el estado del usuario ${nombre} a ${mensajeEstado}?`)) {
                try {
                    const respuestaActualizacion = await conector.put(`/update/${id}`, usuarioConEstadoActualizado);
                    if (respuestaActualizacion.status === 200) {
                        listarUsuarios(); // Recargar la lista de usuarios después de la actualización
                        alert(`El estado del usuario ${nombre} ha sido cambiado a ${mensajeEstado} exitosamente`);
                    }
                } catch (error) {
                    alert(error.response?.status === 404 ? 'Usuario no encontrado' : 'Error al cambiar el estado del usuario');
                }
            }
        } else {
            alert("Usuario no encontrado en la lista");
        }
    };
    

    

    useEffect(() => {
        listarUsuarios(); // Llamar a la función al cargar el componente
    }, []);

    // Filtrar usuarios según la búsqueda
    const filtrarUsuarios = () => {
        return usuarios.filter(usuario =>
            `${usuario.nombre} ${usuario.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
        );
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Gestión de Usuarios</h2>

            <img src="../../assets/header-image.jpg" alt="Gestión de Usuarios" className="img-fluid mb-4" />

            <div className="d-flex justify-content-between mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar usuarios..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
                <div>
                    <button className="refresh" onClick={listarUsuarios} disabled={cargando}>
                        {cargando ? 'Cargando...' : 'Refrescar'}
                    </button>
                    <button className="add-user" onClick={añadirUsuario}>
                        Crear Usuario
                    </button>
                </div>
            </div>

            {error && <div className="alert alert-danger">Error: No se pudo cargar los usuarios</div>}
            {cargando && <div className="text-center">Cargando usuarios...</div>}

            <div className="table-responsive">
                <table className="table table-bordered table-hover shadow-sm table-fixed">
                    <thead className="table-dark text-center">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">CI</th>
                            <th scope="col">Fecha de Nacimiento</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Email</th>
                            <th scope="col">Estado</th>
                            <th scope="col" className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrarUsuarios().length > 0 ? (
                            filtrarUsuarios().map((usuario) => (
                                <tr key={usuario.id} className="text-center">
                                    <td>{`${usuario.nombre || 'N/A'} ${usuario.apellido || 'N/A'}`}</td>
                                    <td>{usuario.ci}</td>
                                    <td>{usuario.fecha_nacimiento || 'N/A'}</td>
                                    <td>{usuario.telefono || 'N/A'}</td>
                                    <td>{usuario.direccion || 'N/A'}</td>
                                    <td>{usuario.email || 'N/A'}</td>
                                    <td>{usuario.estado === true ? 'Activo' : 'Inactivo'}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-1"
                                            onClick={() => modificarUsuario(usuario)}
                                            title="Editar Usuario"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => eliminarUsuario(usuario.nombre, usuario.id, usuario.estado)}
                                            title="Eliminar Usuario"
                                        >
                                            Borrar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">No hay usuarios disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Crud_Usuarios;
