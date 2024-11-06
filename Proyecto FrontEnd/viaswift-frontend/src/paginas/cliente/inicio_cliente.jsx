import React, { useState } from 'react';
import CarouselComponent from '../../Componentes/Carrusel/Carousel';
import { useNavigate } from 'react-router-dom';
import '../../Componentes/modelo_inicio/modelo_inicio.css';
import './estilo_inicio_cliente.css';

const ciudadesIniciales = [
    { src: 'images/imagen1.jpg', ciudad: 'Cochabamba' },
    { src: 'images/imagen2.jpg', ciudad: 'Sucre' },
    { src: 'images/imagen3.jpg', ciudad: 'Tarija' },
];

const InicioCliente = () => {
    const [ciudadOrigen, setCiudadOrigen] = useState(null);
    const [ciudadDestino, setCiudadDestino] = useState(null);
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    const manejarSeleccionOrigen = (ciudad) => {
        setCiudadOrigen(ciudad);
    };

    const manejarSeleccionDestino = (ciudad) => {
        setCiudadDestino(ciudad);
    };

    const verificar = () => {
        if (!ciudadOrigen || !ciudadDestino) {
            setMensaje("Debes seleccionar origen y destino.");
            setMostrarMensaje(true);
        } else if (ciudadOrigen === ciudadDestino) {
            setMensaje("Debes seleccionar un origen y destino diferentes.");
            setMostrarMensaje(true);
        } else {
            navigate("/empresas_cliente");
        }
    };

    const cerrarMensaje = () => setMostrarMensaje(false);

    return (
        <div className="inicio-cliente">
            <div className="contenedor-principal">
                <div className="seccion-izquierda">
                    <h1 className="titulo-principal">ViajeSmart</h1>
                    
                    <div className="contenedor-selecciones">
                        <div className="tarjeta">
                            <h2>Ciudad de Origen</h2>
                            <CarouselComponent 
                                ciudades={ciudadesIniciales} 
                                ciudadSeleccionada={manejarSeleccionOrigen} 
                            />
                            <p>Origen seleccionado: {ciudadOrigen || 'No seleccionado'}</p>
                        </div>
                        <div className="tarjeta">
                            <h2>Ciudad de Destino</h2>
                            <CarouselComponent 
                                ciudades={ciudadesIniciales} 
                                ciudadSeleccionada={manejarSeleccionDestino} 
                            />
                            <p>Destino seleccionado: {ciudadDestino || 'No seleccionado'}</p>
                        </div>
                    </div>

                    <button className="boton-verificar" onClick={verificar}>Ver Vehículos Disponibles</button>

                    {mostrarMensaje && (
                        <div className="mensaje-popover">
                            <p>{mensaje}</p>
                            <button className="boton-cerrar" onClick={cerrarMensaje}>Entendido</button>
                        </div>
                    )}
                </div>

                <div className="seccion-derecha">
                    <div className="tarjeta-info">
                        <h3>Información Importante</h3>
                        <p>Detalles de servicios, descuentos y más información relevante.</p>
                    </div>
                    <div className="tarjeta-info">
                        <h3>Actualizaciones</h3>
                        <p>Noticias sobre nuestros servicios y nuevas rutas disponibles.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InicioCliente;
