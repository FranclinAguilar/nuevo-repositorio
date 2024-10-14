import React, { useState } from 'react';
import conector_unidades from '../../Servicios/conector_unidades';

const Conductores = ({ setUnidadSeleccionada }) => {
    const [unidades, setUnidades] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const listar_unidades = async () => {
        setCargando(true);
        setError(null);
        try {
            const respuesta_conductores = await conector_unidades.get("/all");
            setUnidades(respuesta_conductores.data);
            setCargando(false);
        } catch (error) {
            setError(error.message);
            setCargando(false);
        }
    };

    return (
        <div className="container">
            <div className="button-group">
                <button onClick={listar_unidades} disabled={cargando}>
                    {cargando ? 'Cargando...' : 'Cargar Conductores'}
                </button>
            </div>

            {error && <div className="alert error">Error: No se pudo cargar los conductores</div>}

            <table>
                <thead>
                    <tr>
                        <th className='th-esquina1'>N°</th>
                        <th>Nombre</th>
                        <th>Marca Vehículo</th>
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
                                <td>{unidad.vehiculo ? unidad.vehiculo.marca : 'N/A'}</td>
                                <td>{unidad.vehiculo ? unidad.vehiculo.capacidad : 'N/A'}</td>
                                <td>
                                    <button onClick={() => setUnidadSeleccionada(unidad)}>
                                        Añadir a la cola
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No hay conductores disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Conductores;
