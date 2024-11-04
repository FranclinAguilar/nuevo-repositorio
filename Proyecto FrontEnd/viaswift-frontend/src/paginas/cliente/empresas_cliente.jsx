import React, { useState } from 'react';
import Asientos from '../../Componentes/vehiculo/Asientos';
import Tarjeta from '../../Componentes/Tarjetas/Tarjeta';
import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import '../../Componentes/modelo_inicio/modelo_inicio.css';
import Ticket from '../../Componentes/ticket/Ticket';
import conector_reservas from '../../Servicios/conector_reservas';
import axios from 'axios';

const EmpresasCliente = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverMessage, setPopoverMessage] = useState("");
  const [ticketPopoverOpen, setTicketPopoverOpen] = useState(false);
  const [ticketData, setTicketData] = useState(null); // Para almacenar los datos del ticket

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  const toggleTicketPopover = () => {
    setTicketPopoverOpen(!ticketPopoverOpen);
  };

  const ReservarAsiento = async () => {
    try {
      // Buscar viaje que esté abordando
      const respuesta = await conector_reservas.get("/all");
      const datos = respuesta.data;
      const viajesAbordando = datos.find(viaje => viaje.estado === "abordando");
  
      if (!viajesAbordando) {
        setPopoverMessage("No existe un vehículo abordando pasajeros");
        setPopoverOpen(true);
        return;
      }
  
      // Ver asientos disponibles 
      const id_viaje = viajesAbordando.idViaje;
      const respuestaAsiento = await axios.get("http://localhost:9090/asientos_list");
      const idUsuarioLocal = localStorage.getItem("usuarioId");
      const idUsuarioLocalNum = parseInt(idUsuarioLocal, 10);
  
      // Filtrar por el id del usuario, cuales tiene seleccionado
      const asientosUsuario = respuestaAsiento.data.filter(asiento => asiento.id_usuario === idUsuarioLocalNum);
      if (asientosUsuario.length === 0) {
        setPopoverMessage("No tienes asientos seleccionados.");
        setPopoverOpen(true);
        return;
      }
  
      // Convierte el arreglo de asientos en una cadena y el precio
      const asientosIds = asientosUsuario.map(asiento => asiento.id);
      const precio = asientosUsuario.length * 100;
      const nombres = localStorage.getItem("nombre") + " " + localStorage.getItem("apellido");
  
      // Crea los datos de la reserva
      const nuevaReserva = {
        nombreApellido: nombres,
        asientos: asientosIds.join(','), // Mantener la cadena para la reserva
        precio: precio,
        idUsuario: idUsuarioLocalNum,
        estado: "abordando"
      };
  
      // Envía la reserva con los datos
      const response = await conector_reservas.post(`/${id_viaje}/reservas`, nuevaReserva);
      if (response.status === 201) {
        setPopoverMessage("Reserva creada con éxito!");
        setPopoverOpen(true);
        
        // Cambiar el estado del asiento después de crear la reserva
        for (const asiento of asientosUsuario) {
          await axios.put(`http://localhost:9090/reserved/${asiento.id}/${idUsuarioLocalNum}`);
        }
  
        console.log("Reserva:", response.data);
      } else {
        setPopoverMessage("Hubo un problema al crear la reserva.");
        setPopoverOpen(true);
      }
    } catch (error) {
      console.error("Error al procesar la reserva:", error);
      setPopoverMessage("Error al procesar la reserva.");
      setPopoverOpen(true);
    }
  };
  

  const GenerarTicket = async () => {
    const idUsuario = localStorage.getItem("usuarioId");
    const resp_reservas = await conector_reservas.get("/reservas/" + idUsuario);

    if (resp_reservas.data.length > 0) {
        // Filtrar las reservas para encontrar la que está en estado "abordando"
        const reservasAbordando = resp_reservas.data.filter(reserva => reserva.estado === "abordando");

        if (reservasAbordando.length > 0) {
            setTicketData(reservasAbordando[0]); // Establece la primera reserva "abordando" como datos del ticket
        } else {
            setTicketData(null);
            setPopoverMessage("No hay reservas en estado 'abordando'.");
        }
    } else {
        setTicketData(null);
        setPopoverMessage("No hay reservas disponibles.");
    }

    setTicketPopoverOpen(true);
};

  
  return (
    <div className='fondo'>
      <div className='contenedor_inicio'>
        <div>
          <Button color="primary" onClick={toggleOffcanvas}>
            Información del viaje
          </Button>
          <Offcanvas isOpen={isOffcanvasOpen} toggle={toggleOffcanvas}>
            <OffcanvasHeader toggle={toggleOffcanvas}>
              Tu Viaje a
            </OffcanvasHeader>
            <OffcanvasBody>
              <strong>Vehículo</strong><br />
              <strong>Conductor</strong>
            </OffcanvasBody>
          </Offcanvas>
        </div>
        <br />
        <div className='fondo_asientos'>
          <div className='dos_tarjetas'>
            <Tarjeta
              Titulo="Asientos de la Unidad"
              Contenido={<Asientos />}
            />
          </div>
        </div>
        <br />
        <div className='dos_tarjetas'>
          <div className='Tarjeta'>
            <button id="reservarBtn" onClick={ReservarAsiento}>Reservar Asiento</button>
            <Popover
              placement="bottom"
              isOpen={popoverOpen}
              target="reservarBtn"
              toggle={togglePopover}
            >
              <PopoverHeader>Atención</PopoverHeader>
              <PopoverBody>
                {popoverMessage}
                <div style={{ marginTop: '10px', textAlign: 'right' }}>
                  <Button color="primary" onClick={togglePopover}>
                    Entendido
                  </Button>
                </div>
              </PopoverBody>
            </Popover>
          </div>
          <div className='Tarjeta'>
            <button id="ticketBtn" onClick={GenerarTicket}>Generar Ticket</button>
            <Popover
              placement="bottom"
              isOpen={ticketPopoverOpen}
              target="ticketBtn"
              toggle={toggleTicketPopover}
            >
              <PopoverHeader>Ticket de Viaje</PopoverHeader>
              <PopoverBody>
                {ticketData ? (
                  <>
                    <Ticket ticketData={ticketData} />
                  </>
                ) : (
                  <div>No tienes reservas en proceso</div>
                )}
                <div style={{ marginTop: '10px', textAlign: 'right' }}>
                  <Button color="primary" onClick={toggleTicketPopover}>OK</Button>
                </div>
              </PopoverBody>
            </Popover>
          </div>
        </div>
      </div>
      <div className='contenedor_inicio1'>
        <Tarjeta
          Titulo="Informaciones sobre viajes"
          Contenido="imagenes, rutas, sugerencias"
        />
      </div>
    </div>
  );
};

export default EmpresasCliente;
