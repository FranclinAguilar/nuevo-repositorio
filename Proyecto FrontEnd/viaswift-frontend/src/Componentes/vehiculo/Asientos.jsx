import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import './Asientos.css';

const Asientos = () => {
  const [asientosList, setAsientosList] = useState([]);
  const [client, setClient] = useState(null);

  // Conexión al websocket y suscripción al canal para recibir actualizaciones en tiempo real
  useEffect(() => {
    const cliente_webSocket = new Client({
      brokerURL: "ws://localhost:9090/asientos",
      onConnect: () => {
        cliente_webSocket.subscribe('/topic/asientos', (mensaje_del_canal) => {
          const mensaje_recibido = JSON.parse(mensaje_del_canal.body);
          setAsientosList(mensaje_recibido);
        });
      },
    });

    cliente_webSocket.activate();
    setClient(cliente_webSocket); // Guardar el cliente en el estado



    // Obtener la lista de asientos, también sus estados al iniciar el componente
    const obtenerAsientos = async () => {
      try {
        const respuesta = await axios.get("http://localhost:9090/asientos_list");
        setAsientosList(respuesta.data); // Solo se establece data si la respuesta es exitosa
      } catch (error) {
        console.error('Error al obtener los asientos:', error.message); // Manejar errores si no es OK
      }
    };

    obtenerAsientos();

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  //-------------------------------------------------------------------------------------------//

  const cambiarEstado = async (id) => {
    try {
      const respuesta = await axios.put('http://localhost:9090/asientos_id/' + id);
      const updatedAsiento = respuesta.data;

      //console.log(`Estado del asiento ${id} cambiado`, updatedAsiento);

      // Actualiza el estado local con el asiento actualizado
      setAsientosList((prevAsientos) =>
        prevAsientos.map(asiento =>
          asiento.id === updatedAsiento.id ? updatedAsiento : asiento
        )
      );

      // Enviar el nuevo estado a través de WebSocket solo si el cliente está conectado
      if (client && client.connected) {
        try {
          client.publish({
            destination: "/app/cambiarEstado",
            body: JSON.stringify(updatedAsiento),
          });
        } catch (error) {
          console.error("Error al publicar el mensaje:", error);
        }
      } else {
        console.error("El cliente STOMP no está conectado.");
      }
    } catch (error) {
      console.error('Error al cambiar el estado del asiento:', error.message);
    }
  };

  return (
    <div>
      <h1>Estados de los Asientos</h1>
      {asientosList.length === 0 ? (
        <p>No hay asientos disponibles.</p>
      ) : (
        <div className="button-grid">
          {asientosList.map(asiento => (
            <button
              key={asiento.id}
              onClick={() => cambiarEstado(asiento.id)}
              className={asiento.estado === "disponible" ? 'btn-disponible' : 'btn-reservado'}
            >
              {asiento.estado === "disponible" ? `Reservar Asiento ${asiento.id}` : `reservando...`}
            </button>

          ))}
        </div>
      )}
    </div>
  );

};

export default Asientos;
