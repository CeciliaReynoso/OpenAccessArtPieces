// src/context/ApiContext.jsx
import React, { createContext, useState, useCallback } from 'react';

// Crear el contexto
export const ApiContext = createContext();

// Proveedor del contexto
export const ApiProvider = ({ children }) => {
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función general para obtener piezas de arte
  const fetchArtPieces = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Obtener el valor de búsqueda almacenado en localStorage
      const searchValue = localStorage.getItem('searchValue') || 'flowers'; // Predeterminado a 'flowers' si no existe

      // Paso 1: Obtener los IDs de las piezas que cumplen con la búsqueda
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&ispublicdomain=true&q=${encodeURIComponent(searchValue)}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos de búsqueda');
      }
      const result = await response.json();

      // Paso 2: Obtener detalles de cada objeto por su ID y filtrar por los que tienen imagen
      const objectDetailsPromises = result.objectIDs.slice(0, 100).map(async (id) => {
        const objResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        const data = await objResponse.json();
        return data;
      });

      const objects = await Promise.all(objectDetailsPromises);

      // Filtrar las piezas que tienen una imagen
      const filteredObjects = objects.filter(piece => piece.primaryImageSmall);

      setArtPieces(filteredObjects);
    } catch (error) {
      setError(error.message || error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ApiContext.Provider value={{ artPieces, fetchArtPieces, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
};
