import React from 'react'
import Tarjeta from '../../Componentes/Tarjetas/Tarjeta';
import '../../Componentes/Tarjetas/dimensiones_de_tarjetas.css';
import CarouselComponent from '../../Componentes/Carrusel/Carousel';
const inicio_empresas = () => {
    return (
        <div>
            <div className='dos_tarjetas'>
                <Tarjeta
                    Titulo="Sasdasdasdasdasda"
                    Contenido={<CarouselComponent />}
                />
                <Tarjeta
                    Titulo="Selecciona la ciudad de tu Destino"
                    Contenido={<CarouselComponent />}
                />
            </div>
        </div>
    )
}

export default inicio_empresas;
