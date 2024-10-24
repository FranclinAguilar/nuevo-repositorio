import React, { useState } from 'react';
import './inicio_oficina.css';
import Tarjeta from '../../Componentes/Tarjetas/Tarjeta';
import ListaConductores from './conductores';
import UnidadEnCola from './unidad_en_cola';
import Asientos from '../../Componentes/vehiculo/Asientos';
import axios from 'axios';

const InicioOficina = () => {
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);

  const IniciarViaje = async () => {
    console.log("iniciando...")
    try {
        await axios.delete('http://localhost:9090/eliminar_asientos')

        alert("se eliminó");
    } catch (error) {
        console.error('Error al eliminar asiento', error);
    }
    

  }




  //el registro controlar, oficina y cliente
  //pasar este método a cliente para su registro
 
  
  return (
    <div className='fondo_oficina'>
      <div className='contenedor_inicio_oficina'>
        <div className='dos_tarjetas'>
          <Tarjeta
            Titulo="Unidad en espera"
            Contenido={<Asientos />}
          />
          <Tarjeta
            Titulo="Unidades en cola"
            Contenido={<UnidadEnCola />}
          />
        </div>
        <div className='dos_tarjetas'>
          <div>
            <button 
            onClick={IniciarViaje}
            >
              Inicio de Viaje
            </button>
            <button>Reservar

            </button>
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
