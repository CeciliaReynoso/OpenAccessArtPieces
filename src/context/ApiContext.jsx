// src/context/ApiContext.jsx
import { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const MAX_PIECES = 20;

// Crear el contexto
export const ApiContext = createContext();

// Proveedor del contexto
export const ApiProvider = ({ children }) => {
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función general para obtener piezas de arte
  const fetchArtPieces = useCallback(async (searchTerm = 'flower') => {
    setLoading(true);
    setError(null);
    try {
      const normalizedSearchTerm = searchTerm.trim() || 'flower';

      // Paso 1: Obtener los IDs de las piezas que cumplen con la búsqueda
      const response = await fetch(`/api/met/v1.1/search?hasImages=true&ispublicdomain=true&q=${encodeURIComponent(normalizedSearchTerm)}&limit=${MAX_PIECES}&offset=0`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos de búsqueda');
      }
      const result = await response.json();
      const objectIds = result.objectIDs?.slice(0, MAX_PIECES) ?? [];

      if (objectIds.length === 0) {
        setArtPieces([]);
        return;
      }

      // Paso 2: pedir los detalles en lotes de 5 para no saturar la API
      const BATCH_SIZE = 5;
      const objects = [];

      for (let i = 0; i < objectIds.length; i += BATCH_SIZE) {
        const batch = objectIds.slice(i, i + BATCH_SIZE);

        const results = await Promise.allSettled(
          batch.map(async (id) => {
            const objResponse = await fetch(`/api/met/v1/objects/${id}`);
            if (!objResponse.ok) {
              throw new Error(`Error al obtener el objeto ${id}`);
            }
            return objResponse.json();
          })
        );

        results.forEach((r) => {
          if (r.status === 'fulfilled') objects.push(r.value);
        });
      }

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

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
