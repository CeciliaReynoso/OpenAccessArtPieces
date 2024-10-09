import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Detalle = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [artDetail, setArtDetail] = useState(null);

  useEffect(() => {
    // Obtener los datos del localStorage
    const artData = JSON.parse(localStorage.getItem("artTableData"));
    const selectedArt = artData.find(art => art.id === parseInt(id));
    setArtDetail(selectedArt);
  }, [id]);

  if (!artDetail) {
    return <p>Cargando detalles de la pieza...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>{artDetail.title}</h2>
      <p><strong>Artista:</strong> {artDetail.artist}</p>
      <p><strong>País:</strong> {artDetail.country}</p>
      <p><strong>Año:</strong> {artDetail.date}</p>
      <p><strong>Tags:</strong> {artDetail.tags}</p>
      {/* Mostrar la imagen de la pieza */}
      <img src={`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}/primaryImage`} alt={artDetail.title} className="img-fluid" />
    </div>
  );
};

export default Detalle;
