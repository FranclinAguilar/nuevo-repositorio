import React, { useState } from 'react';
import './inicio_oficina.css';
import Tarjeta from '../../Componentes/Tarjetas/Tarjeta';
import Conductores from './conductores';
import UnidadEnCola from './unidad_en_cola';
import Asientos from '../../Componentes/vehiculo/Asientos';

const InicioOficina = () => {
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null); // Estado para la unidad seleccionada

  const handleSeatClick = (seatNumber) => {
    console.log(`Asiento ${seatNumber} seleccionado`);
    // Aquí puedes agregar más lógica para la selección del asiento
  };

  return (
    <div className='fondo_oficina'>
      <div className='contenedor_inicio_oficina'>
        <div className='dos_tarjetas'>
          <Tarjeta
            Titulo="Unidad en espera"
            Contenido={<Asientos/>}
          />
          <Tarjeta
            Titulo={"Unidades en cola"}
            Contenido={<UnidadEnCola unidad={unidadSeleccionada} />} // Pasar unidad seleccionada a UnidadEnCola
          />
        </div>
        <div className='dos_tarjetas'>
          <div>
            <button className='boton_viaje'>Inicio de Viaje</button>
          </div>
          <div>
            <button className='boton_reservar'>Reservar</button>
            <button className='boton_comprar'>Comprar</button>
          </div>
        </div>
        <br />
        <button>Reservar pasaje</button>
      </div>
      <div className='contenedor_inicio_oficina1'>
        <Tarjeta
          Titulo={"Lista de Conductores disponibles"}
          Contenido={<Conductores setUnidadSeleccionada={setUnidadSeleccionada} />} // Pasar función para actualizar unidad seleccionada
        />
      </div>
    </div>
  );
}

export default InicioOficina;
