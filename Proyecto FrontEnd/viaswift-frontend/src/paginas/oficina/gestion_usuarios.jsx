import React from 'react';
import Tarjeta from '../../Componentes/Tarjetas/Tarjeta';
import './gestion_usuarios.css';
import Crud_Usuarios from '../../Componentes/Crud/crud_Usuarios'

const GestionUsuarios = () => {
  return (
    <div className='fondo_gestion_usuarios'>
      <Tarjeta
        Titulo="Cielito Lindo"
        Contenido={<Crud_Usuarios />}
      />  
    </div>
  );
}

export default GestionUsuarios;
