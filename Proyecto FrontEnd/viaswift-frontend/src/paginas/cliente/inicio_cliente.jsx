import React, { useState } from 'react';
import Tarjeta from '../../Componentes/Tarjetas/Tarjeta';
import '../../Componentes/Tarjetas/dimensiones_de_tarjetas.css';
import CarouselComponent from '../../Componentes/Carrusel/Carousel';
import { useNavigate } from 'react-router-dom';
import './inicio_cliente.css';

const ciudadesIniciales = [
    { src: 'images/imagen1.jpg', ciudad: 'Cochabamba' },
    { src: 'images/imagen2.jpg', ciudad: 'Sucre' },
    { src: 'images/imagen3.jpg', ciudad: 'Tarija' },
];

const InicioCliente = () => {
    const [ciudadOrigen, setCiudadOrigen] = useState(null);
    const [ciudadDestino, setCiudadDestino] = useState(null);
    const navigate = useNavigate();

    const manejarSeleccionOrigen = (ciudad) => {
        setCiudadOrigen(ciudad);
    };

    const manejarSeleccionDestino = (ciudad) => {
        setCiudadDestino(ciudad);
    };

    const verificar = () => {
        if (!ciudadOrigen || !ciudadDestino) {
            alert("Debes seleccionar origen y destino");
        } else if (ciudadOrigen === ciudadDestino) {
            alert("Debes seleccionar un origen y destino diferentes");
        } else {
            navigate("/empresas_cliente");
        }
    };

    return (
        <div className='fondo'>
            <div className="dos_tarjetas">
                <div>
                    <Tarjeta
                        Titulo=""
                        Contenido={
                            <CarouselComponent
                                ciudades={ciudadesIniciales}
                                ciudadSeleccionada={manejarSeleccionOrigen}
                            />
                        }
                    />
                    <p>Ciudad origen:
                        {ciudadOrigen || ''}
                    </p>
                </div>
                <div>
                    <Tarjeta
                        Titulo=""
                        Contenido={
                            <CarouselComponent
                                ciudades={ciudadesIniciales}
                                ciudadSeleccionada={manejarSeleccionDestino}
                            />
                        }
                    />
                    <p>Ciudad destino:
                        {ciudadDestino || ''}
                    </p>
                </div>
            </div>

            <div className="text-center">
                <button className="boton" onClick={verificar}>Ver Vehículos Disponibles</button>
            </div>

        </div>
    );
};

export default InicioCliente;
