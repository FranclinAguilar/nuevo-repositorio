import React, { useState } from 'react';
import '../../Componentes/modelo_inicio/modelo_inicio.css';
import ListaConductores from './conductores';
import Asientos from '../../Componentes/vehiculo/Asientos';
import axios from 'axios';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Reservacion from '../../Componentes/Reservas/reservacion'; // Asegúrate de que la ruta sea correcta
import Reservas from './reservas';

const Viaje_Tarija = () => {
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [botonViajeTexto, setBotonViajeTexto] = useState('Comenzar Viaje'); // Estado para cambiar texto de botón
  const [botonReservaTexto, setBotonReservaTexto] = useState('Hacer Reserva'); // Estado para cambiar texto de botón

  const IniciarViaje = async () => {
    const confirmar = window.confirm(`¿Quieres iniciar el Viaje?`);
    if (confirmar) {
      console.log("Iniciando viaje...");
      try {
        // Eliminar asientos al iniciar el viaje
        await axios.delete('http://localhost:9090/eliminar_asientos');

        // Actualizar el estado del viaje
        const viajeResponse = await axios.put('http://localhost:9100/api/viajes/estado_viajes', null, {
          params: {
            estadoActual: 'abordando',
            nuevoEstado: 'completado'
          }
        });
        console.log('Estado del viaje actualizado:', viajeResponse.data);

        // Actualizar el estado de las reservas
        const reservasResponse = await axios.put('http://localhost:9100/api/viajes/estado_reservas', null, {
          params: {
            estadoActual: 'abordando',
            nuevoEstado: 'completado'
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
        {/* Sección dividida en 3 columnas responsivas */}
        <div className='row'>
          <div className='col-md-4 mb-4'>
            <div className='card auto-card'>
              <h4>Asientos de la Unidad</h4>
              <Asientos />
            </div>
          </div>
          <div className='col-md-4 mb-4'>
            <div className='card reservas-card'>
              <h4>Información de las Reservas</h4>
              <Reservas />
            </div>
          </div>
          <div className='col-md-4 mb-4'>
            <div className='card conductores-card'>
              <h4>Lista de Conductores disponibles</h4>
              <ListaConductores onSelectConductor={setUnidadSeleccionada} />
            </div>
          </div>
        </div>
        <div className='text-center mb-4'>
                <Button
                  className="boton-iniciar-viaje" 
                  onClick={IniciarViaje}
                >
                  {botonViajeTexto}
                </Button>
                <Button 
                  id="Popover1" 
                  type="button" 
                  onClick={togglePopover} 
                  className="boton-reservar ms-2"
                >
                  {botonReservaTexto}
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
  );
};

export default Viaje_Tarija;
