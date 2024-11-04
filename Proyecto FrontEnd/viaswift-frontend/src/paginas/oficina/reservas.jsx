import React, { useEffect, useState } from 'react';
import conector_reservas from '../../Servicios/conector_reservas';
import './reservas.css'; // Asegúrate de que la ruta sea correcta
import axios from 'axios'; // Asegúrate de que axios está importado

const Reservas = () => {
  const [reservas, setReservas] = useState([]); // Estado para almacenar las reservas
  const [error, setError] = useState(null); // Estado para manejar errores
  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  // Función para obtener las reservas en estado "abordando"
  const fetchReservas = async () => {
    setLoading(true);
    setError(null);

    try {
      const respuestaReservas = await conector_reservas.get('/reservas/abordando');
      console.log('Respuesta de reservas:', respuestaReservas.data); // Ver respuesta en consola
      setReservas(respuestaReservas.data); // Esto se ejecutará incluso si es un array vacío
    } catch (error) {
      console.error('Error al cargar las reservas:', error);
      setError('Ocurrió un error al cargar las reservas.');
    } finally {
      setLoading(false);
    }
  };

  // Función para anular una reserva específica
  const anularReserva = async (idReserva) => {
    alert(idReserva);
    try {
      const reservaSeleccionada = reservas.find(reserva => reserva.idReserva === idReserva);

      if (!reservaSeleccionada) {
        console.error('No se encontró la reserva con el ID proporcionado:', idReserva);
        setError('Reserva no encontrada.');
        return;
      }

      // Obtener los asientos reservados de la reserva seleccionada
      const asientosString = reservaSeleccionada.asientos || '';
      const asientosArray = asientosString.split(',').map(asiento => asiento.trim());

      // Cambiar el estado de cada asiento reservado a "disponible"
      await Promise.all(asientosArray.map(asiento =>
        axios.put(`http://localhost:9090/reserved/${asiento}/1`) // Cambia el estado del asiento
      ));

      // Cambia el estado de la reserva a "anulada"
      await conector_reservas.put('/reserva_a_anulado', null, {
        params: { idReserva, estadoActual: "abordando", nuevoEstado: "anulada" }
      });

      alert('Reserva anulada con éxito.');
      fetchReservas(); // Actualizar la lista de reservas

    } catch (error) {
      console.error('Error al anular la reserva:', error);
      setError('Ocurrió un error al anular la reserva.');
    }
  };

  // Cargar reservas al montar el componente
  useEffect(() => {
    fetchReservas();

    const intervalId = setInterval(() => {
      fetchReservas();
    }, 10000); // 10 segundos en milisegundos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="reservas-container">

      {error && <div className="error-message">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Asientos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.length === 0 && !loading ? (
            <tr>
              <td colSpan="4">No hay reservas para mostrar.</td>
            </tr>
          ) : (
            reservas.map((reserva) => (
              <tr key={reserva.idReserva}>
                <td>{reserva.nombreApellido || 'Nombre no disponible'}</td>
                <td>{reserva.asientos || 'Asientos no disponible'}</td>
                <td>
                  <button onClick={() => anularReserva(reserva.idReserva)}>
                    Anular Reserva
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reservas;
