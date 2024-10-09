// src/components/ArtCarousel3.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import art7 from '../assets/304.png';
import art8 from '../assets/302.png';
import art9 from '../assets/303.png';
import art12 from '../assets/403.gif';

const ArtCarousel3 = () => {
  return (
    <Carousel fade controls={false} indicators={false}>
      <Carousel.Item>
        <img className="d-block w-100" src={art12} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={art7} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={art8} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={art12} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={art9} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default ArtCarousel3;
