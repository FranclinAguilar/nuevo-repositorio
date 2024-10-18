import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import conector_unidades from '../../Servicios/conector_unidades';
import './Crud_unidades.css';

const Crud_Unidades = () => {
    const [unidades, setUnidades] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
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
            setCargando(false);
        } catch (error) {
            setError(error.message);
            setCargando(false);
        }
    };

    // Eliminar Unidades (Conductores)
    const eliminarUnidad = async (nombre, id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar al conductor ' + nombre + '?')) {
            try {
                const respuesta = await conector_unidades.delete('/conductores/delete/' + id);
                if (respuesta.status === 200) {
                    listarUnidades();
                    alert("Conductor eliminado correctamente");
                }
            } catch (error) {
                alert("Error al eliminar el conductor");
            }
        }
    };

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

            {error && <div className="alerta error">Error: No se pudo cargar los conductores</div>}

            <table className="tabla-unidades">
                <thead>
                    <tr>
                        <th className='th-esquina1'>N°</th>
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
                    {unidades.length > 0 ? (
                        unidades.map((unidad, index) => (
                            <tr key={unidad.id}>
                                <td>{index + 1}</td>
                                <td>{unidad.nombre || 'N/A'}</td>
                                <td>{unidad.apellidos || 'N/A'}</td>
                                <td>{unidad.licencia || 'N/A'}</td>
                                <td>{unidad.telefono || 'N/A'}</td>
                                <td>{unidad.vehiculo ? unidad.vehiculo.marca : 'N/A'}</td>
                                <td>{unidad.vehiculo ? unidad.vehiculo.placa : 'N/A'}</td>
                                <td>{unidad.vehiculo ? unidad.vehiculo.capacidad : 'N/A'}</td>
                                <td>
                                    <button className="btn-warning" onClick={() => modificarUnidad(unidad)}>Editar</button>
                                    <button className="btn-danger" onClick={() => eliminarUnidad(unidad.nombre, unidad.id)}>Borrar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">No hay conductores disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Crud_Unidades;
