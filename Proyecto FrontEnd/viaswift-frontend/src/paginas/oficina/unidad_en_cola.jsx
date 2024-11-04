import React, { useState } from "react";
import axios from "axios";
import './UnidadEnCola.css';

const UnidadEnCola = () => {
    const [unidad, setUnidad] = useState(null); 
    const [mostrarInfoUnidad, setMostrarInfoUnidad] = useState(false);
    const [loading, setLoading] = useState(false);

    const obtenerUnidadEnAbordaje = async () => {
        setLoading(true);
        try {
            const respuestaViaje = await axios.get("http://localhost:9100/api/viajes/all");
            const viajeAbordando = respuestaViaje.data.find(
                (viaje) => viaje.estado === "abordando"
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

    const VerInfoUnidad = () => {
        if (!mostrarInfoUnidad) {
            obtenerUnidadEnAbordaje();
        }
        setMostrarInfoUnidad(!mostrarInfoUnidad);
    };

    return (
        <div className="unidad-en-cola">
            <button onClick={VerInfoUnidad} className="btn-ver-info">
                {mostrarInfoUnidad ? "Ocultar Información" : "Ver Información de la Unidad"}
            </button>

            {loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            )}

{mostrarInfoUnidad && unidad && !loading ? (
    <div className="info-table-container">
        <table className="info-table">
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Detalle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Conductor</td>
                    <td>{unidad.nombre} {unidad.apellidos}</td>
                </tr>
                <tr>
                    <td>Licencia</td>
                    <td>{unidad.licencia}</td>
                </tr>
                <tr>
                    <td>Marca del Vehículo</td>
                    <td>{unidad.vehiculo?.marca || "N/A"}</td>
                </tr>
                <tr>
                    <td>Capacidad</td>
                    <td>{unidad.vehiculo?.capacidad || "N/A"}</td>
                </tr>
                <tr>
                    <td>Teléfono</td>
                    <td>{unidad.telefono}</td>
                </tr>
            </tbody>
        </table>
    </div>
) : mostrarInfoUnidad && !loading ? (
    <p>No hay unidades disponibles</p>
) : null}

        </div>
    );
};

export default UnidadEnCola;
