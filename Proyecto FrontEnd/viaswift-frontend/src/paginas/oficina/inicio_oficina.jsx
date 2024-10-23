import React, { useState } from 'react';
import './inicio_oficina.css';
import Tarjeta from '../../Componentes/Tarjetas/Tarjeta';
import ListaConductores from './conductores';
import UnidadEnCola from './unidad_en_cola';
import Asientos from '../../Componentes/vehiculo/Asientos';
import axios from 'axios';
import conector_reservas from '../../Servicios/conector_reservas';

const InicioOficina = () => {
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  const [viajeenCurso, setviajeenCurso] = useState([]);




  //el registro controlar, oficina y cliente
  //pasar este método a cliente para su registro
  const iniciarViaje = async () => {
    try {
      const respuesta = await conector_reservas.get("/all");
      const datos = respuesta.data;
      const viajesAbordando = datos.find(viaje => viaje.estado === "abordando");
      
      if (!viajesAbordando) {
        alert("No existe un vehículo abordando pasajeros :c");
        return;
      }
      
      const id_viaje = viajesAbordando.idViaje;
  
      // Obtener los asientos
      const respuestaAsiento = await axios.get("http://localhost:9090/asientos_list");
  
      // Obtener el id del usuario guardado en localStorage
      const idUsuarioLocal = localStorage.getItem("usuarioId");
      const idUsuarioLocalNum = parseInt(idUsuarioLocal, 10);
  
      // Filtrar los asientos que pertenecen al usuario logueado
      const asientosUsuario = respuestaAsiento.data.filter(asiento => asiento.id_usuario === idUsuarioLocalNum);
  
      if (asientosUsuario.length === 0) {
        alert("No tienes asientos reservados.");
        return;
      }
  
      // Obtener los IDs de los asientos como una cadena separada por comas
      const asientosIds = asientosUsuario.map(asiento => asiento.id).join(',');
  
      // Calcular el precio (100 por asiento)
      const precio = asientosUsuario.length * 100;
  
      // Crear el objeto de reserva
      const nuevaReserva = {
        asientos: asientosIds,            // Guardar los asientos como cadena
        precio: precio,                   // Precio total
        idUsuario: idUsuarioLocalNum,     // ID del usuario
      };
  
      // Realizar la solicitud POST para agregar la reserva al viaje
      const response = await conector_reservas.post(`/${id_viaje}/reservas`, nuevaReserva);
  
      if (response.status === 201) {
        alert("Reserva creada con éxito!");
        console.log("Reserva:", response.data);
      } else {
        alert("Hubo un problema al crear la reserva.");
      }
  
    } catch (error) {
      console.error("Error al procesar la reserva:", error);
    }
  };
  
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
            <button onClick={iniciarViaje}>
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
