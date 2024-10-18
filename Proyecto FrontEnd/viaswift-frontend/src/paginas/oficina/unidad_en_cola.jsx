import React, { useState } from "react";
import axios from "axios";
import './UnidadEnCola.css'; // Importa el archivo CSS

const UnidadEnCola = () => {
    const [unidad, setUnidad] = useState(null); 
    const [mostrarInfoUnidad, setMostrarInfoUnidad] = useState(false);
    const [loading, setLoading] = useState(false);

    const obtenerUnidadEnAbordaje = async () => {
        setLoading(true);
        try {
            const respuestaViaje = await axios.get("http://localhost:9100/api/viajes/all");
            const viajeAbordando = respuestaViaje.data.find(
                (viaje) => viaje.estado === "abordando" && viaje.destino === "Tarija"
            );

            if (viajeAbordando) {
                const respuestaUnidad = await axios.get(`http://localhost:9090/unidades/${viajeAbordando.idConductor}`);
                setUnidad(respuestaUnidad.data);
            } else {
                alert("No hay unidad abordando con destino a Tarija.");
                setUnidad(null);
            }
        } catch (error) {
            console.error("Error al obtener el viaje o la unidad:", error);
            alert("Error al obtener la información de la unidad.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerInfoUnidad = () => {
        if (!mostrarInfoUnidad) {
            obtenerUnidadEnAbordaje();
        }
        setMostrarInfoUnidad(!mostrarInfoUnidad);
    };

    return (
        <div className="unidad-en-cola">
            <h2>Detalles de la Unidad</h2>
            <button
                onClick={handleVerInfoUnidad}
                className="btn-ver-info"
            >
                {mostrarInfoUnidad ? "Ocultar Info de la Unidad" : "Ver Info de la Unidad"}
            </button>

            {loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            )}

            {mostrarInfoUnidad && unidad && !loading ? (
                <div className="info-unidad">
                    <p className="info-item">Conductor: {unidad.conductor?.nombre} {unidad.conductor?.apellidos}</p>
                    <p className="info-item">Marca del Vehículo: {unidad.vehiculo?.marca}</p>
                    <p className="info-item">Capacidad: {unidad.vehiculo?.capacidad}</p>
                    <p className="info-item">Licencia: {unidad.conductor?.licencia}</p>
                    <p className="info-item">Teléfono: {unidad.conductor?.telefono}</p>
                </div>
            ) : mostrarInfoUnidad && !loading ? (
                <p>No hay unidades disponibles</p>
            ) : null}
        </div>
    );
};

export default UnidadEnCola;
