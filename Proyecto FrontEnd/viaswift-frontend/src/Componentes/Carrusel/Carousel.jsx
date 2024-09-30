import React, { useState } from 'react';
import {
  Carousel as BootstrapCarousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
import './Carousel.css';
function CarouselComponent({ ciudades, ciudadSeleccionada }) {
  const [indiceActivo, setIndiceActivo] = useState(0);
  const [animando, setAnimando] = useState(false);

  const siguiente = () => {
    if (animando) return;
    const siguienteIndice = indiceActivo === ciudades.length - 1 ? 0 : indiceActivo + 1;
    setIndiceActivo(siguienteIndice);
  };

  const anterior = () => {
    if (animando) return;
    const siguienteIndice = indiceActivo === 0 ? ciudades.length - 1 : indiceActivo - 1;
    setIndiceActivo(siguienteIndice);
  };

  const irAIndice = (nuevoIndice) => {
    if (animando) return;
    setIndiceActivo(nuevoIndice);
  };

  const manejarClickImagen = (ciudad) => {
    ciudadSeleccionada(ciudad);
  };

  const slides = ciudades.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimando(true)}
        onExited={() => setAnimando(false)}
        key={item.ciudad}
      >
        <img
          src={item.src}
          alt={item.ciudad}
          onClick={() => manejarClickImagen(item.ciudad)}
          className="imagen-curvada"
          style={{ cursor: 'pointer' }} 
        />
      </CarouselItem>
    );
  });

  return (
    <BootstrapCarousel activeIndex={indiceActivo} next={siguiente} previous={anterior}>
      <CarouselIndicators items={ciudades} activeIndex={indiceActivo} onClickHandler={irAIndice} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={anterior} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={siguiente} />
    </BootstrapCarousel>
  );
}

export default CarouselComponent;
