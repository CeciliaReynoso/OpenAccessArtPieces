// src/context/ApiContext.jsx
import { createContext, useState, useCallback } from 'react';

// Crear el contexto
export const ApiContext = createContext();

// Proveedor del contexto
export const ApiProvider = ({ children }) => {
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función general para obtener piezas de arte
  const fetchArtPieces = useCallback(async (searchTerm = 'flowers') => {
    setLoading(true);
    setError(null);
    try {
      const normalizedSearchTerm = searchTerm.trim() || 'flowers';

      // Paso 1: Obtener los IDs de las piezas que cumplen con la búsqueda
      const response = await fetch(`/api/met/search?hasImages=true&ispublicdomain=true&q=${encodeURIComponent(normalizedSearchTerm)}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos de búsqueda');
      }
      const result = await response.json();
      const objectIds = result.objectIDs?.slice(0, 30) ?? [];

      if (objectIds.length === 0) {
        setArtPieces([]);
        return;
      }

      // Paso 2: Obtener detalles de cada objeto por su ID y filtrar por los que tienen imagen
      const objectDetailsPromises = objectIds.map(async (id) => {
        const objResponse = await fetch(`/api/met/objects/${id}`);
        if (!objResponse.ok) {
          throw new Error(`Error al obtener el objeto ${id}`);
        }
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
