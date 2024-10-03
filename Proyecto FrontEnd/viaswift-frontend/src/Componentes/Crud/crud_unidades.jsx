import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import conector from '../../Servicios/conector';
import './Crud_unidades.css';

const Crud_Unidades = () => {

    const [unidades, setUnidades] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Añadir Unidades
    const AñadirUnidad = () => {
        navigate("/registro_unidad");
    };

    // Modificar Unidad
    const ModificarUnidad = (unidad) => {
        navigate("/registro_unidad", { state: { unidad } });
    };

    // Consulta de Unidades
    const listar_unidades = async () => {
        setCargando(true);
        setError(null);
        try {
            const respuesta_unidades = await conector.get("/all");
            setUnidades(respuesta_unidades.data);
            setCargando(false); 
        } catch (error) {
            setError(error.message);
            setCargando(false);
        }
    };

    // Eliminar Unidades
    const eliminar_unidades = async (nombre, id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar la unidad ' + nombre + '?' )) {
            try {
                const respuesta_unidades = await conector.delete('/delete/' + id);
                if(respuesta_unidades.status === 200){
                    listar_unidades();
                    alert("Unidad eliminada correctamente");
                }
            } catch (error) {
                alert("Error al eliminar la unidad");
            }
        }
    };

    return (
        <div className="container">
            <h2>Gestión de Unidades</h2>

            <div className="button-group">
                <button onClick={listar_unidades} disabled={cargando}>
                    {cargando ? 'Cargando...' : 'Cargar Unidades'}
                </button>
                <button onClick={AñadirUnidad}>
                    Añadir Unidad
                </button>
            </div>

            {error && <div className="alert error">Error: {"No se pudo cargar las unidades"}</div>}

            <table>
                <thead>
                    <tr>
                        <th className='th-esquina1'>N°</th>
                        <th>ci</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha de nacimiento</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Email</th>
                        <th>Estado</th>
                        <th className='th-esquina2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {unidades.length > 0 ? (
                        unidades.map((unidad, index) => (
                            <tr key={unidad.id}>
                                <td>{index + 1}</td>
                                <td>{unidad.ci}</td>
                                <td>{unidad.nombre || 'N/A'}</td>
                                <td>{unidad.apellido || 'N/A'}</td>
                                <td>{unidad.f_nacimiento || 'N/A'}</td>
                                <td>{unidad.telefono || 'N/A'}</td>
                                <td>{unidad.direccion || 'N/A'}</td>
                                <td>{unidad.email || 'N/A'}</td>
                                <td>{unidad.estado === 1 ? 'Activo' : 'Inactivo'}</td>
                                <td>
                                    <button className="btn-warning" onClick={() => ModificarUnidad(unidad)}>Editar</button>
                                    <button className="btn-danger" onClick={() => eliminar_unidades(unidad.nombre, unidad.id)}>Borrar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">No hay unidades disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Crud_Unidades;
