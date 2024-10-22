import React, { useState } from 'react';
import './inicio_oficina.css';
import Tarjeta from '../../Componentes/Tarjetas/Tarjeta';
import ListaConductores from './conductores'; 
import UnidadEnCola from './unidad_en_cola'; 
import Asientos from '../../Componentes/vehiculo/Asientos';

const InicioOficina = () => {
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);

  const iniciarViaje = () => {
    const idUsuario = localStorage.getItem("usuarioId");
    console.log(localStorage.getItem("empresaId"))
    console.log(localStorage.getItem("usuarioId"))
    if (idUsuario) {
      alert("ID del usuario: " + idUsuario);
    } else {
      alert("ID del usuario no encontrado");
    }
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
            Titulo="Unidades en cola"
            Contenido={<UnidadEnCola/>}
          />
        </div>
        <div className='dos_tarjetas'>
          <div>
          <button onClick={iniciarViaje}>
              Inicio de Viaje
            </button>
            <button>Reservar</button>
          </div>
        </div>
      </div>
      <div className='contenedor_inicio_oficina1'>
        <Tarjeta
          Titulo="Lista de Conductores disponibles"
          Contenido={<ListaConductores onSelectConductor={setUnidadSeleccionada} />}
        />
      </div>
    </div>
  );
}

export default InicioOficina;
