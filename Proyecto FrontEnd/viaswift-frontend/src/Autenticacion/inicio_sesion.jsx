import React from 'react';
import Login from '../Componentes/Login/Login';

const InicioSesion = () => {
  const fondoEstilo = {
    backgroundColor: '#cedeff', // Color de fondo
    height: '100vh', // Altura del 100% de la ventana
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div style={fondoEstilo}>
      <Login />
    </div>
  );
};

export default InicioSesion;
