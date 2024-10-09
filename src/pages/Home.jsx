// src/pages/Home.jsx
import '../components/Home.css';
import React, { useContext, useEffect } from 'react';
import { ApiContext } from '../context/ApiContext';
import NavbarComponent from '../components/Navbar'; 

const Home = () => {
  const { artPieces, fetchArtPieces, loading, error } = useContext(ApiContext);

  useEffect(() => {
    fetchArtPieces();
  }, [fetchArtPieces]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <NavbarComponent /> 
      <div className="container">
        {/* <h1 style={{textAlign: 'center'}}>`Art Pieces about ${searchValue.toUpperCase()} at The MET`</h1> */}
        <div className="row">
          {artPieces.map(piece => (
            <div key={piece.objectID} className="col-md-4 mb-4">
              <div className="card">
                {piece.primaryImageSmall && (
                  <img src={piece.primaryImageSmall} className="card-img-top" alt={piece.title} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{piece.title}</h5>
                  <p className="card-text">Culture: {piece.culture}</p>
                  <p className="card-text">Date: {piece.objectDate}</p>
                  <a href={piece.objectURL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">View Details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
