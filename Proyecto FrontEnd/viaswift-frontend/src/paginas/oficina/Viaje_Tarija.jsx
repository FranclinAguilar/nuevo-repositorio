import React, { useState } from 'react';
import '../../Componentes/modelo_inicio/modelo_inicio.css';
import Tarjeta from '../../Componentes/Tarjetas/Tarjeta';
import ListaConductores from './conductores';
import UnidadEnCola from './unidad_en_cola';
import Asientos from '../../Componentes/vehiculo/Asientos';
import axios from 'axios';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Reservacion from '../../Componentes/Reservas/reservacion'; // Asegúrate de que la ruta sea correcta
import Reservas from './reservas';

const Viaje_Tarija = () => {
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const IniciarViaje = async () => {
    const confirmar = window.confirm(`¿Quieres iniciar el Viaje?`);
    if (confirmar) {
      console.log("Iniciando viaje...");
      try {
        // Primero eliminamos los asientos antes de cambiar el estado del viaje
        await axios.delete('http://localhost:9090/eliminar_asientos');

        // Luego actualizamos el estado del viaje
        const viajeResponse = await axios.put('http://localhost:9100/api/viajes/estado_viajes', null, {
          params: {
            estadoActual: 'abordando', // Estado actual que quieres cambiar
            nuevoEstado: 'completado'   // Nuevo estado al que quieres cambiar
          }
        });
        console.log('Estado del viaje actualizado:', viajeResponse.data);

        // Actualiza el estado de las reservas también
        const reservasResponse = await axios.put('http://localhost:9100/api/viajes/estado_reservas', null, {
          params: {
            estadoActual: 'abordando', // Estado actual de las reservas
            nuevoEstado: 'completado'   // Nuevo estado de las reservas
          }
        });
        console.log('Estado de las reservas actualizado:', reservasResponse.data);
      } catch (error) {
        console.error('Error al iniciar el viaje', error);
      }
    }
  };

  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  return (
    <div className='fondo'>
      <div className='contenedor_inicio'>
        <div className='dos_tarjetas'>
          <Tarjeta Titulo="Asientos de la Unidad" Contenido={<Asientos />} />
          <Tarjeta Titulo="Información de las Reservas" Contenido={<Reservas />} />
        </div>
        <div className='dos_tarjetas'>
          <div>
            <button onClick={IniciarViaje}>Inicio de Viaje</button>
            <Button id="Popover1" type="button" onClick={togglePopover}>
              Reservar
            </Button>
            <Popover
              placement="right"
              isOpen={popoverOpen}
              target="Popover1"
              toggle={togglePopover}
            >
              <PopoverHeader>Reservación</PopoverHeader>
              <PopoverBody>
                <Reservacion />
                <Button color="secondary" onClick={togglePopover}>X</Button>
              </PopoverBody>
            </Popover>
          </div>
        </div>
      </div>
      <div className='contenedor_inicio1'>
        <Tarjeta Titulo="Lista de Conductores disponibles" Contenido={<ListaConductores onSelectConductor={setUnidadSeleccionada} />} />
      </div>
    </div>
  );
};

export default Viaje_Tarija;
