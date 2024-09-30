import React from 'react'
import './Tarjeta.css';
const Tarjeta = ({Titulo, Contenido}) => {
  return (
    <div className='Tarjeta'>
        <h5 className='Tarjeta-Titulo'>{Titulo}</h5>
        <div className='Tarjeta-Contenido'>
          {Contenido}
        </div>
      
    </div>
  )
}

export default Tarjeta
