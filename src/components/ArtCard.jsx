import React from 'react';
import { Card } from 'react-bootstrap'; // Usando React-Bootstrap

const ArtCard = ({ art }) => {
  return (
    <Card>
      <Card.Img variant="top" src={art.primaryImageSmall} alt={art.title} />
      <Card.Body>
        <Card.Title>{art.title}</Card.Title>
        <Card.Text>
          {art.artistDisplayName ? `By: ${art.artistDisplayName}` : "Unknown Artist"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ArtCard;
