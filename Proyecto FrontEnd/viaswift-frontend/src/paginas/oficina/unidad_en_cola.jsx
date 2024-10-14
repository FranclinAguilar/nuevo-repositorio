import React from 'react';

const UnidadEnCola = ({ unidad }) => {
  return (
    <div>
      <h3>Unidad en Cola:</h3>
      {unidad ? (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Marca Vehículo</th>
              <th>Capacidad Vehículo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{unidad.nombre || 'N/A'}</td>
              <td>{unidad.vehiculo ? unidad.vehiculo.marca : 'N/A'}</td>
              <td>{unidad.vehiculo ? unidad.vehiculo.capacidad : 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No hay unidad seleccionada.</p> // Mensaje cuando no hay unidad
      )}
    </div>
  );
};

export default UnidadEnCola;
