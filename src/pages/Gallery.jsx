import React, { useContext, useEffect } from 'react';
import { ApiContext } from '../context/ApiContext';
import { SearchContext } from '../context/SearchContext';
import NavbarComponent from '../components/Navbar';
import FooterComponent from '../components/Footer';

const Gallery = () => {
  const { artPieces, fetchArtPieces, loading, error } = useContext(ApiContext);
  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    fetchArtPieces(); // Llamada para obtener las piezas
  }, [fetchArtPieces, searchValue]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Ordenar las piezas de arte por fecha y luego por cultura en orden ascendente
  const sortedArtPieces = [...artPieces].sort((a, b) => {
    const dateA = new Date(a.objectBeginDate);
    const dateB = new Date(b.objectBeginDate);

    // Comparar primero por fecha (ascendente)
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;

    // Si las fechas son iguales, comparar por cultura (ascendente, alfabéticamente)
    if (a.culture > b.culture) return -1;
    if (a.culture < b.culture) return 1;

    return 0; // Si tanto la fecha como la cultura son iguales
  
  });

  return (
    <div>
      <NavbarComponent />
      <div role='main' className="container" style={{paddingTop: '60px'}}>
        <h1 style={{ textAlign: 'center' }}>
          Art Pieces about {searchValue.toUpperCase()} at The MET
        </h1>
        <div className="row">
          {sortedArtPieces.map((piece) => (
            <div key={piece.objectID} className="col-md-4 mb-4">
              <div className="card">
                {piece.primaryImageSmall && (
                  <img src={piece.primaryImageSmall} className="card-img-top" alt={piece.title} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{piece.title}</h5>
                  <p className="card-text">Culture: {piece.culture}</p>
                  <p className="card-text">Country: {piece.country}</p>
                  <p className="card-text">Artist: {piece.artistDisplayName}</p>
                  <p className="card-text">Date: {piece.objectDate}</p>
                  <p className="card-text">Medium: {piece.medium}</p>
                  <a
                    href={piece.objectURL}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Gallery;
