// src/components/ArtCarousel4.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import art10 from '../assets/401.png';
import art11 from '../assets/404.png';
import art12 from '../assets/403.gif';

const ArtCarousel4 = () => {
  return (
    <Carousel fade controls={false} indicators={false}>
      <Carousel.Item>
        <img className="d-block w-100" src={art12} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={art10} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={art11} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={art12} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default ArtCarousel4;
