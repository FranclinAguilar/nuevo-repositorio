import React, { useEffect, useState } from 'react';
import conector_reservas from '../../Servicios/conector_reservas';
//import './misviajes.css';

const MisViajes = () => {
  const [reservas, setReservas] = useState([]); // Estado para almacenar reservas
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null); // Estado para almacenar el viaje seleccionado
  const [error, setError] = useState(null); // Estado para manejar errores
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const [loadingViaje, setLoadingViaje] = useState(false); // Loading para el popover

  // Función para obtener todas las reservas del usuario
  const fetchReservas = async () => {
    const idUsuario = localStorage.getItem("usuarioId");
    setLoading(true);
    setError(null);

    try {
      const respuesta = await conector_reservas.get(`/reservas/${idUsuario}`);
      console.log("esto es lo que se recibe",respuesta.data)
      setReservas(respuesta.data);
    } catch (error) {
      console.error('Error al cargar las reservas:', error);
      setError('Ocurrió un error al cargar las reservas.');
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener los detalles de un viaje por su ID y mostrar en el popover
  const fetchViajePorId = async (idViaje) => {
    alert(idViaje);
    setLoadingViaje(true);
    setError(null);

    try {
      const respuesta = await conector_reservas.get(`/viajes/${idViaje}`);
      setViajeSeleccionado(respuesta.data); // Guardar el viaje en el estado para mostrar en el popover
    } catch (error) {
      console.error('Error al cargar el viaje:', error);
      setError('Ocurrió un error al cargar el viaje.');
    } finally {
      setLoadingViaje(false);
    }
  };

  // Cargar las reservas al montar el componente
  useEffect(() => {
    fetchReservas();
  }, []);

  return (
    <div className="mis-viajes-container">
      <h2>Mis Reservas</h2>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <p>Cargando reservas...</p>
      ) : reservas.length === 0 ? (
        <p>No tienes reservas registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Reserva</th>
              <th>Fecha  y  Hora</th>
              <th>Asientos</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>

            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.idReserva}>
                <td>{reserva.numReserva || 'N/A'}</td>
                <td>{reserva.fechaHora || 'N/A'}</td>
                <td>{reserva.asientos || 'N/A'}</td>
                <td>{reserva.precio || 'N/A'}</td>
                <td>{reserva.estado || 'N/A'}</td>
                <td>
                  <button
                    onClick={() => fetchViajePorId(reserva.idViaje)}
                    disabled={loadingViaje && viajeSeleccionado?.id === reserva.idViaje}
                  >
                    {loadingViaje && viajeSeleccionado?.id === reserva.idViaje ? 'Cargando...' : 'Ver Viaje'}
                  </button>
                  {viajeSeleccionado && viajeSeleccionado.id === reserva.idViaje && (
                    <div className="popover">
                      <h4>Detalles del Viaje</h4>
                      <p><strong>Viaje:</strong> {viajeSeleccionado.numViaje}</p>
                      <p><strong>Fecha:</strong> {viajeSeleccionado.fecha}</p>
                      <p><strong>Origen:</strong> {viajeSeleccionado.origen}</p>
                      <p><strong>Destino:</strong> {viajeSeleccionado.destino}</p>
                      <p><strong>Estado:</strong> {viajeSeleccionado.estado}</p>
                      <button onClick={() => setViajeSeleccionado(null)}>Cerrar</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MisViajes;
