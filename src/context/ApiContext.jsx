// src/context/ApiContext.jsx
import { createContext, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

const MAX_PIECES = 20;

// Traduce el código HTTP a un mensaje comprensible, conservando el código para diagnosticar
const describeHttpError = (status) => {
  switch (true) {
    case status === 400:
      return 'La solicitud no es válida (400).';
    case status === 403:
      return 'El MET rechazó la petición (403). Puede que se hayan superado los límites de uso; intenta de nuevo en un momento.';
    case status === 404:
      return 'No se encontró el recurso (404). Es posible que la ruta de la API haya cambiado.';
    case status === 410:
      return 'Este servicio de la API del MET fue retirado (410). Hay que actualizar la ruta del endpoint.';
    case status === 429:
      return 'Demasiadas peticiones (429). Espera unos segundos e inténtalo de nuevo.';
    case status >= 500:
      return `El servidor del MET tuvo un problema (${status}). Inténtalo más tarde.`;
    default:
      return `Error inesperado al consultar la API (${status}).`;
  }
};

// Crear el contexto
export const ApiContext = createContext();

// Proveedor del contexto
export const ApiProvider = ({ children }) => {
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función general para obtener piezas de arte
  const requestId = useRef(0);

  const fetchArtPieces = useCallback(async (searchTerm = 'flower') => {
    // Ignora respuestas de búsquedas anteriores si ya se lanzó otra más reciente
    const currentId = ++requestId.current;
    const isStale = () => currentId !== requestId.current;
    setLoading(true);
    setError(null);
    try {
      const normalizedSearchTerm = searchTerm.trim() || 'flower';

      // Paso 1: Obtener los IDs de las piezas que cumplen con la búsqueda
      const response = await fetch(`/api/met/v1.1/search?hasImages=true&ispublicdomain=true&q=${encodeURIComponent(normalizedSearchTerm)}&limit=${MAX_PIECES}&offset=0`);
      if (!response.ok) {
        throw new Error(describeHttpError(response.status));
      }
      const result = await response.json();
      if (isStale()) return;
      const objectIds = result.objectIDs?.slice(0, MAX_PIECES) ?? [];

      if (objectIds.length === 0) {
        setArtPieces([]);
        return;
      }

      // Paso 2: pedir los detalles en lotes de 5 para no saturar la API
      const BATCH_SIZE = 5;
      const objects = [];
      let failedCount = 0;
      let lastFailure = null;

      for (let i = 0; i < objectIds.length; i += BATCH_SIZE) {
        if (isStale()) return;
        const batch = objectIds.slice(i, i + BATCH_SIZE);

        const results = await Promise.allSettled(
          batch.map(async (id) => {
            const objResponse = await fetch(`/api/met/v1/objects/${id}`);
            if (!objResponse.ok) {
              throw new Error(describeHttpError(objResponse.status));
            }
            return objResponse.json();
          })
        );

        results.forEach((r) => {
          if (r.status === 'fulfilled') {
            objects.push(r.value);
          } else {
            failedCount += 1;
            lastFailure = r.reason;
          }
        });
      }

      // Si fallaron todos los detalles, es un error real y no una búsqueda sin resultados
      if (objects.length === 0 && failedCount > 0) {
        throw lastFailure;
      }
      if (failedCount > 0) {
        console.warn(`${failedCount} de ${objectIds.length} objetos no se pudieron cargar:`, lastFailure?.message);
      }

      // Filtrar las piezas que tienen una imagen
      const filteredObjects = objects.filter(piece => piece.primaryImageSmall);

      if (isStale()) return;
      setArtPieces(filteredObjects);
    } catch (error) {
      console.error('Error al obtener piezas de arte:', error);
      if (!isStale()) {
        // fetch lanza TypeError cuando no hay conexión o la petición no llega al servidor
        setError(
          error instanceof TypeError
            ? 'No se pudo conectar con el servidor. Revisa tu conexión a internet.'
            : error.message || String(error)
        );
      }
    } finally {
      if (!isStale()) setLoading(false);
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
