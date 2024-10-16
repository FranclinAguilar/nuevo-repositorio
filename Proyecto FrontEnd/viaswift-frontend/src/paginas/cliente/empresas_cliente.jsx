import React from 'react'
import Asientos from '../../Componentes/vehiculo/Asientos';
import Tarjeta from '../../Componentes/Tarjetas/Tarjeta';
import UnidadEnCola from '../oficina/unidad_en_cola';
const empresas_cliente = () => {
  return (
    <div className='fondo_oficina'>
      <div className='contenedor_inicio_oficina'>
        <div className='dos_tarjetas'>
          <Tarjeta
            Titulo="Unidad en espera"
            Contenido={<Asientos/>}
          />
          <Tarjeta
            Titulo={"Detalles de la Unidad"}
            Contenido={<UnidadEnCola/>}
          />
        </div>
        <div className='dos_tarjetas'>
          <div>
            <button className='boton_viaje'>Generar Ticket</button>
          </div>

        </div>
      </div>
      <div className='contenedor_inicio_oficina1'>
        <Tarjeta
          Titulo={"Detalles de su ticket"}
          Contenido={"boleto"}
        />
        <button>confirmar reserva</button>

      </div>
    </div>
  );
}

export default empresas_cliente;
