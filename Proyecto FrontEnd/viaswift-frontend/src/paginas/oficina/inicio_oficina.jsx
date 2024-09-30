import React from 'react'
import './inicio_oficina.css'
import Tarjeta from '../../Componentes/Tarjetas/Tarjeta'; 
const inicio_oficina = () => {
  return (
    <div className='fondo_oficina'>
        <div>
      <h1>bienvenido al panel de oficina</h1>
        
        </div>
        <div className='dos_tarjetas'>
          <Tarjeta Titulo="Unidades" Contenido="Aquí irá el contenido, vehículo en curso para viaje"/>
            

          <Tarjeta
            Titulo={"Asd"}
            Contenido={"esta es la segunda tarjeta"}
          />
        </div>
          
    </div>
  )
}

export default inicio_oficina;
