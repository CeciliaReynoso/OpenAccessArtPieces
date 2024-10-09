export const formatTotal = (price) => {
    return `${price.toLocaleString('es-CL')}`;
  };

  // Función para capitalizar la primera letra
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Función para formatear el precio en pesos chilenos
export const formatPrice = (price) => {
  return price.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};


  
