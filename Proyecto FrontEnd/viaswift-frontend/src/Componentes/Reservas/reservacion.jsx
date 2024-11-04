import React, { useState } from 'react';
import './reservacion.css'; // Asegúrate de que la ruta sea correcta
import conector_reservas from '../../Servicios/conector_reservas';
import axios from 'axios';

const Reservacion = () => {
  const [nombre, setNombre] = useState(''); // Estado para el nombre y apellido

  const Reservar = async () => {
    try {
      // Buscar viaje que esté abordando
      const respuesta = await conector_reservas.get("/all");
      const datos = respuesta.data;
      const viajesAbordando = datos.find(viaje => viaje.estado === "abordando");

      if (!viajesAbordando) {
        alert("No existe un vehículo abordando pasajeros");
        return;
      }

      // Ver asientos disponibles 
      const id_viaje = viajesAbordando.idViaje;
      const respuestaAsiento = await axios.get("http://localhost:9090/asientos_list");
      const idUsuarioLocal = localStorage.getItem("usuarioId");
      const idUsuarioLocalNum = parseInt(idUsuarioLocal, 10);

      // Filtrar por el id del usuario, cuáles tiene seleccionados
      const asientosUsuario = respuestaAsiento.data.filter(asiento => asiento.id_usuario === idUsuarioLocalNum);
      if (asientosUsuario.length === 0) {
        alert("No tienes asientos seleccionados.");
        return;
      }

      // Convierte el arreglo de asientos en una cadena y el precio
      const asientosIds = asientosUsuario.map(asiento => asiento.id).join(',');
      const precio = asientosUsuario.length * 100;

      // Crear los datos de la reserva
      const nuevaReserva = {
        nombreApellido: nombre,
        asientos: asientosIds,
        precio: precio,
        idUsuario: idUsuarioLocalNum,
        estado: "abordando"
      };

      // Enviar la reserva con los datos
      const response = await conector_reservas.post(`/${id_viaje}/reservas`, nuevaReserva);
      if (response.status === 201) {
        alert("Reserva creada exitosamente");
        console.log("Reserva:", response.data);

        // Cambiar el estado de los asientos después de crear la reserva
        for (const asiento of asientosUsuario) {
          await axios.put(`http://localhost:9090/reserved/${asiento.id}/${idUsuarioLocalNum}`);
        }
      } else {
        alert("Error al crear la reserva");
      }

    } catch (error) {
      console.error("Error al procesar la reserva:", error);
    }
  };

  return (
    <div className="reservacion-container">
      <h2>Datos de la Reserva</h2>
      <div className="input-group">
        <label htmlFor="nombre">Nombre y Apellido</label>
        <input
          type="text"
          id="nombre"
          placeholder="Ingresa tu nombre y apellido"
          required
          value={nombre} // Bind con el estado
          onChange={(e) => setNombre(e.target.value)} // Actualizar el estado
        />
      </div>
      <div className="button-group">
        <button type="button" onClick={Reservar}>Reservar</button>
      </div>
    </div>
  );
};

export default Reservacion;
