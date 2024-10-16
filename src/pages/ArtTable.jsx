import React, { useContext, useEffect } from 'react';
import { ApiContext } from '../context/ApiContext';
import { SearchContext } from '../context/SearchContext'; // Importa el contexto de búsqueda
import NavbarComponent from '../components/Navbar'; 
import { Link } from 'react-router-dom';
import FooterComponent from '../components/Footer';

const ArtTable = () => {
  const { artPieces, fetchArtPieces, loading, error } = useContext(ApiContext);
  const { searchValue } = useContext(SearchContext); // Obtén searchValue desde el contexto

  // Llama a fetchArtPieces cuando se monta el componente y cuando searchValue cambia
  useEffect(() => {
    fetchArtPieces();
  }, [fetchArtPieces, searchValue]); // Agrega searchValue como dependencia para actualizar las piezas de arte

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
    <>
      <NavbarComponent />
      <div className="container" style={{paddingTop: '70px'}}>
        <h1>Art Pieces from {searchValue.toUpperCase()}</h1> 
        <p>To see it in images go to <Link to='/gallery'>Gallery</Link></p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Culture</th>
              <th>Artist</th>
              <th>Date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {sortedArtPieces.map(piece => (
              <tr key={piece.objectID}>
                <td>{piece.title}</td>
                <td>{piece.culture}</td>
                <td>{piece.artistDisplayName}</td>
                <td>{piece.objectDate}</td>
                <td>
                  <a href={piece.objectURL} target="_blank" rel="noopener noreferrer">
                    View Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FooterComponent />
    </>
  );
};

export default ArtTable;
