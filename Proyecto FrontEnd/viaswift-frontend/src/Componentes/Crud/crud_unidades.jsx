import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import conector from '../../Servicios/conector';
import './Crud_unidades.css';
import conector_unidades from '../../Servicios/conector_unidades';

const Crud_Unidades = () => {

    const [unidades, setUnidades] = useState([]); // Unidades aquí se refiere a conductores
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Añadir Unidades (Conductores)
    const AñadirUnidad = () => {
        navigate("/registro_unidad");  // Navega a la página de registro de conductores
    };

    // Modificar Unidad (Conductor)
    const ModificarUnidad = (unidad) => {
        navigate("/registro_unidad", { state: { unidad } });  // Envía los datos del conductor a la página de edición
    };

    // Consulta de Conductores
    const listar_unidades = async () => {
        setCargando(true);
        setError(null);
        try {
            const respuesta_conductores = await conector_unidades.get("/all");  // Asegúrate de que esta ruta coincida con el backend
            setUnidades(respuesta_conductores.data);  // Aquí asumimos que la respuesta es una lista de ConductorDTO
            setCargando(false);
        } catch (error) {
            setError(error.message);
            setCargando(false);
        }
    };

    // Eliminar Conductores
    const eliminar_unidades = async (nombre, id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar al conductor ' + nombre + '?' )) {
            try {
                const respuesta = await conector.delete('/conductores/delete/' + id);  // Actualiza el endpoint si es necesario
                if (respuesta.status === 200) {
                    listar_unidades();
                    alert("Conductor eliminado correctamente");
                }
            } catch (error) {
                alert("Error al eliminar el conductor");
            }
        }
    };

    return (
        <div className="container">
            <h2>Gestión de Conductores</h2>

            <div className="button-group">
                <button onClick={listar_unidades} disabled={cargando}>
                    {cargando ? 'Cargando...' : 'Cargar Conductores'}
                </button>
                <button onClick={AñadirUnidad}>
                    Añadir Conductor
                </button>
            </div>

            {error && <div className="alert error">Error: No se pudo cargar los conductores</div>}

            <table>
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
                                    <button className="btn-warning" onClick={() => ModificarUnidad(unidad)}>Editar</button>
                                    <button className="btn-danger" onClick={() => eliminar_unidades(unidad.nombre, unidad.id)}>Borrar</button>
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
}

export default Crud_Unidades;
