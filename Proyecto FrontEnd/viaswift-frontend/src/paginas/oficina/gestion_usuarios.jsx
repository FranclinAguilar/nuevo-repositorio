import React from 'react';

import './gestion_usuarios.css';
import Crud_Usuarios from '../../Componentes/Crud/crud_Usuarios'

const GestionUsuarios = () => {
  return (
    <div className='fondo_gestion_usuarios'>
      <div className='lista_usuarios'>
        <Crud_Usuarios />
      </div>
    </div>
  );
}

export default GestionUsuarios;
