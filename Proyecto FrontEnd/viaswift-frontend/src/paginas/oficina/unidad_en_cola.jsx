import React, { useState } from "react";
import axios from "axios";
import { Spinner } from "reactstrap";

const UnidadEnCola = () => {
    const [unidad, setUnidad] = useState(null); // Estado para almacenar los datos de la unidad
    const [mostrarInfoUnidad, setMostrarInfoUnidad] = useState(false); // Estado para controlar la visibilidad de la info
    const [loading, setLoading] = useState(false); // Estado para mostrar el spinner de carga

    // Función para obtener el viaje en abordaje
    const obtenerUnidadEnAbordaje = async () => {
        setLoading(true); // Mostrar el spinner
        try {
            // Obtener el viaje en estado "abordando" con destino a "Tarija"
            const respuestaViaje = await axios.get("http://localhost:9100/api/viajes/all");
            const viajeAbordando = respuestaViaje.data.find(
                (viaje) => viaje.estado === "abordando" && viaje.destino === "Tarija"
            );

            if (viajeAbordando) {
                // Llamar a la API de unidades o conductores para obtener los detalles de la unidad por idConductor
                const respuestaUnidad = await axios.get(`http://localhost:9090/unidades/${viajeAbordando.idConductor}`);
                setUnidad(respuestaUnidad.data); // Almacenar los detalles de la unidad en el estado
            } else {
                alert("No hay unidad abordando con destino a Tarija.");
                setUnidad(null);
            }
        } catch (error) {
            console.error("Error al obtener el viaje o la unidad:", error);
            alert("Error al obtener la información de la unidad.");
        } finally {
            setLoading(false); // Ocultar el spinner cuando termine la solicitud
        }
    };

    const handleVerInfoUnidad = () => {
        if (!mostrarInfoUnidad) {
            obtenerUnidadEnAbordaje(); // Solo llama a la API si no se ha mostrado la info
        }
        setMostrarInfoUnidad(!mostrarInfoUnidad); // Alternar la visibilidad
    };

    return (
        <div>
            <h2>Detalles de la Unidad</h2>
            <button onClick={handleVerInfoUnidad}>
                {mostrarInfoUnidad ? "Ocultar Info de la Unidad" : "Ver Info de la Unidad"}
            </button>

            {loading && (
                <div className="text-center">
                    <Spinner color="primary" />
                </div>
            )}

            {mostrarInfoUnidad && unidad && !loading ? (
                <div>
                    <p>Conductor: {unidad.conductor?.nombre} {unidad.conductor?.apellidos}</p>
                    <p>Marca del Vehículo: {unidad.vehiculo?.marca}</p>
                    <p>Capacidad: {unidad.vehiculo?.capacidad}</p>
                    <p>Licencia: {unidad.conductor?.licencia}</p>
                    <p>Teléfono: {unidad.conductor?.telefono}</p>
                </div>
            ) : mostrarInfoUnidad && !loading ? (
                <p>No hay unidades disponibles</p>
            ) : null}
        </div>
    );
};

export default UnidadEnCola;
