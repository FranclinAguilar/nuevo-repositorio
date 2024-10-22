import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import './Asientos.css'; // Asegúrate de que el archivo CSS esté importado

const Asientos = () => {
  const [asientos, setAsientos] = useState([]);

  useEffect(() => {
    const cliente_webSocket = new Client({
      brokerURL: "ws://localhost:9090/asientos",
      onConnect: () => {
        cliente_webSocket.subscribe('/topic/asientos', (mensaje_del_canal) => {
          const mensaje_recibido = JSON.parse(mensaje_del_canal.body);
          setAsientos(mensaje_recibido);
        });
      },
    });

    cliente_webSocket.activate();

    const obtenerAsientos = async () => {
      try {
        const respuesta = await axios.get("http://localhost:9090/asientos_list");
        setAsientos(respuesta.data);
      } catch (error) {
        console.error('Error al obtener los asientos:', error.message);
      }
    };

    obtenerAsientos();

    return () => {
      cliente_webSocket.deactivate();
    };
  }, []);

  const cambiarEstado = async (id) => {
    const idUser = localStorage.getItem("usuarioId");
    if (!idUser) {
      alert("No se ha encontrado el ID del usuario.");
      return;
    }

    alert("Reservando Asiento número: " + id);

    try {
      const respuesta = await axios.put(`http://localhost:9090/asientos_id/${id}/${idUser}`);
      const AsientoObtenido = respuesta.data;
      setAsientos((prevAsientos) =>
        prevAsientos.map(asiento =>
          asiento.id === AsientoObtenido.id ? AsientoObtenido : asiento
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado del asiento:', error.message);
    }
  };

  return (
    <div>
      <h1>Estados de los Asientos</h1>
      <div className="asientos-grid">
        {asientos.map(asiento => (
          <div key={asiento.id} className="asiento">
            <p>Asiento {asiento.id}</p>
            <p>Estado: {asiento.estado}</p>
            <button onClick={() => cambiarEstado(asiento.id)}>
              {asiento.estado === 'disponible' ? 'Reservar' : 'Ocupado'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Asientos;
