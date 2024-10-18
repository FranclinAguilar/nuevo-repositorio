import React from 'react'
import Crud_Unidades from '../../Componentes/Crud/crud_unidades'
import Tarjeta from '../../Componentes/Tarjetas/Tarjeta';
import './gestion_unidades.css'
const gestion_unidades = () => {
  return (
    <div className='fondo_gestion_unidades'>
      <Tarjeta
        Titulo="Cielito Lindo"
        Contenido={<Crud_Unidades />}
      />   
    </div>
  )
}

export default gestion_unidades
