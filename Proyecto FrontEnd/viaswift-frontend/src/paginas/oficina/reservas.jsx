import React, { useEffect, useState } from 'react';
import conector_reservas from '../../Servicios/conector_reservas';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './reservas.css';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReservas = async () => {
    setLoading(true);
    setError(null);

    try {
      const respuestaReservas = await conector_reservas.get('/reservas/abordando');
      setReservas(respuestaReservas.data);
    } catch (error) {
      setError('Ocurrió un error al cargar las reservas.');
    } finally {
      setLoading(false);
    }
  };

  const anularReserva = async (idReserva) => {
    try {
      const reservaSeleccionada = reservas.find(reserva => reserva.idReserva === idReserva);
      if (!reservaSeleccionada) {
        setError('Reserva no encontrada.');
        return;
      }

      const asientosArray = reservaSeleccionada.asientos.split(',').map(asiento => asiento.trim());
      await Promise.all(asientosArray.map(asiento =>
        axios.put(`http://localhost:9090/reserved/${asiento}/1`)
      ));
      await conector_reservas.put('/reserva_a_anulado', null, {
        params: { idReserva, estadoActual: "abordando", nuevoEstado: "anulada" }
      });

      fetchReservas();
    } catch (error) {
      setError('Ocurrió un error al anular la reserva.');
    }
  };

  useEffect(() => {
    fetchReservas();
    const intervalId = setInterval(fetchReservas, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container reservas-container">
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Asientos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Cargando...</td>
            </tr>
          ) : (
            reservas.length === 0 ? (
              <tr>
                <td colSpan="3">No hay reservas para mostrar.</td>
              </tr>
            ) : (
              reservas.map((reserva) => (
                <tr key={reserva.idReserva}>
                  <td>{reserva.nombreApellido || 'Nombre no disponible'}</td>
                  <td>{reserva.asientos || 'Asientos no disponibles'}</td>
                  <td>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => anularReserva(reserva.idReserva)}>
                      Anular Reserva
                    </button>
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reservas;
