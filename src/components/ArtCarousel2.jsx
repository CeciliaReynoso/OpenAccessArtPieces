// src/components/ArtCarousel2.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import art4 from '../assets/201.png';
import art5 from '../assets/202.png';
import art6 from '../assets/203.png';
import art12 from '../assets/403.gif';

const ArtCarousel2 = () => {
  return (
    <Carousel fade controls={false} indicators={false}>
      <Carousel.Item>
        <img className="d-block w-100" src={art12} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={art4} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={art5} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={art12} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={art6} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default ArtCarousel2;
