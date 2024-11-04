import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import './Asientos.css';
import asientoImg from './asiento.png'; // Importa la imagen

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

  const renderAsientos = () => {
    const asientosModificados = asientos.map(asiento => (
      asiento.id === 1 ? { ...asiento, estado: 'ocupado', nombre: 'Chofer' } : asiento
    ));

    const fila1 = asientosModificados.filter(asiento => asiento.id === 6 || asiento.id === 7 || asiento.id === 8);
    const fila2 = asientosModificados.filter(asiento => asiento.id >= 3 && asiento.id <= 5);
    const fila3 = asientosModificados.filter(asiento => asiento.id === 1 || asiento.id === 2);

    return (
      <>
        <div className="fila fila1">
          {fila1.map(asiento => (
            <div key={asiento.id} className="asiento">
              <img src={asientoImg} alt="Asiento" className="asiento-img" />
              <p>{asiento.nombre || `Asiento ${asiento.id}`}</p>
              <button
                onClick={() => cambiarEstado(asiento.id)}
                disabled={asiento.estado === 'ocupado'}
              >
                {asiento.estado === 'disponible' ? 'Reservar' : 'Ocupado'}
              </button>
            </div>
          ))}
        </div>
        <div className="fila fila2">
          {fila2.map(asiento => (
            <div key={asiento.id} className="asiento">
              <img src={asientoImg} alt="Asiento" className="asiento-img" />
              <p className="asiento_name">{asiento.nombre || `Asiento ${asiento.id}`}</p>
              <button
                onClick={() => cambiarEstado(asiento.id)}
                disabled={asiento.estado === 'ocupado'}
              >
                {asiento.estado === 'disponible' ? 'Reservar' : 'Ocupado'}
              </button>
            </div>
          ))}
        </div>
        <div className="fila fila3">
          {fila3.reverse().map(asiento => (
            <div key={asiento.id} className="asiento">
              <img src={asientoImg} alt="Asiento" className="asiento-img" />
              <p className="asiento_name">{asiento.nombre || `Asiento ${asiento.id}`}</p>
              <button
                onClick={() => cambiarEstado(asiento.id)}
                disabled={asiento.estado === 'ocupado'}
              >
                {asiento.estado === 'disponible' ? 'Reservar' : 'Ocupado'}
              </button>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="asientos-grid">
        {renderAsientos()}
      </div>
    </div>
  );
};

export default Asientos;
