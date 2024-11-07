import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import conector_unidades from '../../Servicios/conector_unidades';
import './Crud_unidades.css';

const Crud_Unidades = () => {
    const [unidades, setUnidades] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Añadir Unidad
    const añadirUnidad = () => {
        navigate("/registro_unidad");
    };

    // Modificar Unidad (Conductor)
    const modificarUnidad = (unidad) => {
        navigate("/registro_unidad", { state: { unidad } });
    };

    // Listar Unidades (Conductores)
    const listarUnidades = async () => {
        setCargando(true);
        setError(null);
        try {
            const respuesta = await conector_unidades.get("/all");
            setUnidades(respuesta.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    };

    // Cambiar estado de Unidad (activar/inactivar)
    const cambiarEstadoUnidad = async (nombre, id, estadoActual) => {
        const nuevoEstado = !estadoActual;
        const mensajeEstado = nuevoEstado ? 'activo' : 'inactivo';

        const Estado = {
            "estado": nuevoEstado
        };

        if (window.confirm(`¿Estás seguro de que deseas cambiar el estado del conductor ${nombre} a ${mensajeEstado}?`)) {
            try {
                const respuestaActualizacion = await conector_unidades.put('/actualizarEstadoConductor/' + id, Estado);
                if (respuestaActualizacion.status === 200) {
                    listarUnidades();
                    alert(`El estado del conductor ${nombre} ha sido cambiado a ${mensajeEstado} exitosamente`);
                }
            } catch (error) {
                alert("Error al cambiar el estado del conductor");
            }
        }
    };

    // Filtrar conductores por nombre
    const filtrarUnidades = () => {
        return unidades.filter((unidad) =>
            (unidad.nombre && unidad.nombre.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (unidad.apellidos && unidad.apellidos.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    };

    useEffect(() => {
        listarUnidades(); // Llamar a la función al cargar el componente
    }, []);

    return (
        <div className="contenedor-lista-unidades">
            <h2 className="titulo">Gestión de Conductores</h2>

            <div className="boton-grupo">
                <button onClick={listarUnidades} disabled={cargando}>
                    {cargando ? 'Cargando...' : 'Cargar Conductores'}
                </button>
                <button onClick={añadirUnidad}>
                    Añadir Conductor
                </button>
            </div>

            <div className="busqueda">
                <input
                    type="text"
                    placeholder="Buscar conductor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {error && <div className="alerta error">Error: No se pudo cargar los conductores</div>}

            <table className="tabla-unidades">
                <thead>
                    <tr>
                        <th className='th-esquina1'>N°</th>
                        <th>Estado</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Licencia</th>
                        <th>Teléfono</th>
                        <th>Marca Vehículo</th>
                        <th>Placa Vehículo</th>
                        <th>Capacidad Vehículo</th>
                        <th className='th-esquina2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrarUnidades().length > 0 ? (
                        filtrarUnidades().map((unidad, index) => (
                            <tr key={unidad.id}>
                                <td>{index + 1}</td>
                                <td>{unidad.estado ? 'Activo' : 'Inactivo'}</td>
                                <td>{unidad.nombre || 'N/A'}</td>
                                <td>{unidad.apellidos || 'N/A'}</td>
                                <td>{unidad.licencia || 'N/A'}</td>
                                <td>{unidad.telefono || 'N/A'}</td>
                                <td>{unidad.vehiculo ? unidad.vehiculo.marca : 'N/A'}</td>
                                <td>{unidad.vehiculo ? unidad.vehiculo.placa : 'N/A'}</td>
                                <td>{unidad.vehiculo ? unidad.vehiculo.capacidad : 'N/A'}</td>
                                <td>
                                    <button className="btn-warning" onClick={() => modificarUnidad(unidad)}>Editar</button>
                                    <button
                                        className={`btn-${unidad.estado ? 'danger' : 'success'}`}
                                        onClick={() => cambiarEstadoUnidad(unidad.nombre, unidad.id, unidad.estado)}
                                    >
                                        {unidad.estado ? 'Suspender' : 'Activar'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="text-center">No hay conductores disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Crud_Unidades;
