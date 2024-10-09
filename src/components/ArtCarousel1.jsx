// src/components/ArtCarousel.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import art1 from '../assets/101.png'; // Asegúrate de tener estas imágenes en tu carpeta de assets
import art2 from '../assets/405.png';
import art3 from '../assets/103.png';
import art12 from '../assets/403.gif';

const ArtCarousel1 = () => {
  return (
    <Carousel fade controls={false} indicators={false}>
            <Carousel.Item>
        <img className="d-block w-100" src={art12} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={art1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={art2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={art3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default ArtCarousel1;
