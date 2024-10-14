import React from 'react'
import Crud_Unidades from '../../Componentes/Crud/crud_unidades'
import './gestion_unidades.css'
const gestion_unidades = () => {
  return (
    <div className='fondo_gestion_unidades'>
        <h1>Aquí gestionarás las Unidades de las empresas</h1>
        <Crud_Unidades/>
    </div>
  )
}

export default gestion_unidades
