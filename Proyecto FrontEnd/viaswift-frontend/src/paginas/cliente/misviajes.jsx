import React, { useEffect, useState } from 'react';
import conector_reservas from '../../Servicios/conector_reservas';
import html2canvas from 'html2canvas';  // Importamos html2canvas

const MisViajes = () => {
  const [viajes, setViajes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usuarioRol, setUsuarioRol] = useState(localStorage.getItem("rol"));
  const [usuarioId, setUsuarioId] = useState(localStorage.getItem("usuarioId"));
  const [searchQuery, setSearchQuery] = useState('');

  const fetchViajes = async () => {
    setLoading(true);
    setError(null);

    try {
      const respuesta = await conector_reservas.get(`/all`);
      setViajes(respuesta.data);
    } catch (error) {
      setError('Ocurrió un error al cargar los viajes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViajes();
  }, []);

  // Función para filtrar viajes y reservas
  const filtrarViajesYReservas = (viajes) => {
    if (usuarioRol === 'Oficina') {
      // Si el rol es Oficina, mostrar todos los viajes y reservas
      return viajes;
    } else {
      // Si el rol es Pasajero, solo mostrar los viajes y reservas del usuario
      return viajes.filter((viaje) => {
        return viaje.reservas.some((reserva) => reserva.idUsuario === parseInt(usuarioId));
      });
    }
  };

  // Función para descargar como imagen
  const descargarImagen = (viaje, reserva) => {
    const elementoDescarga = document.getElementById(`viaje-${viaje.idViaje}-reserva-${reserva.idReserva}`);
    html2canvas(elementoDescarga).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `reserva-${reserva.numReserva}.png`;
      link.click();
    });
  };

  return (
    <div className="mis-viajes-container">
      <h2>Mis Reservas</h2>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar por viaje o reserva"
        className="search-input"
      />

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <p>Cargando viajes...</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Id Viaje</th>
                <th>Num Viaje</th>
                <th>Fecha</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Estado</th>
                <th>Id Conductor</th>
                <th>Id Reserva</th>
                <th>Nombre Reserva</th>
                <th>Num Reserva</th>
                <th>Asientos</th>
                <th>Precio</th>
                <th>Fecha Hora</th>
                <th>Estado Reserva</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrarViajesYReservas(viajes).map((viaje) => {
                return viaje.reservas.map((reserva) => (
                  <tr key={reserva.idReserva} id={`viaje-${viaje.idViaje}-reserva-${reserva.idReserva}`}>
                    <td>{viaje.idViaje}</td>
                    <td>{viaje.numViaje}</td>
                    <td>{viaje.fecha}</td>
                    <td>{viaje.origen}</td>
                    <td>{viaje.destino}</td>
                    <td>{viaje.estado}</td>
                    <td>{viaje.idConductor}</td>
                    <td>{reserva.idReserva}</td>
                    <td>{reserva.nombreApellido}</td>
                    <td>{reserva.numReserva}</td>
                    <td>{reserva.asientos}</td>
                    <td>{reserva.precio}</td>
                    <td>{reserva.fechaHora}</td>
                    <td>{reserva.estado}</td>
                    <td>
                      <button onClick={() => descargarImagen(viaje, reserva)}>Descargar Ticket</button>
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MisViajes;
