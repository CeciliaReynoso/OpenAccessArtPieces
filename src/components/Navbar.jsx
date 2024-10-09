import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Importa UserContext
import { SearchContext } from '../context/SearchContext'; // Importa el contexto de búsqueda

const NavbarComponent = () => {
  const { user } = useContext(UserContext); // Extrae user desde el contexto
  const { searchValue, updateSearchValue } = useContext(SearchContext); // Extrae searchValue y updateSearchValue del SearchContext
  const [inputValue, setInputValue] = useState(''); // Estado para el valor del input de búsqueda
  const navigate = useNavigate(); // Para navegar programáticamente

  // Manejar el cambio en el input de búsqueda
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Manejar el envío del formulario de búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      updateSearchValue(inputValue); // Actualizar el valor en el contexto
      // setInputValue(''); // Limpiar el input de búsqueda
      //navigate('/ArtTable'); // Redirigir a la página ArtTable (o la que corresponda)
    }
  };

  return (
    <nav style={{ position: 'fixed', top: '0', width: '100%', zIndex: 1030 }} className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <h3 className="navbar-brand text-danger">
          {searchValue.toUpperCase()} AT The MET
        </h3>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item">
                <Link className="nav-link" to="/">
                  Welcome
                </Link>
              </li>

            {user.token ? (
              <li className="nav-item">
                <Link className="nav-link" to="/gallery">
                  Gallery
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/ArtTable">
                Data Table
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="https://www.metmuseum.org/">
                    Go to MetMuseum.org
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="https://www.youtube.com/@metmuseum">
                    Videos about MET
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="https://youtu.be/F8Ww5YmL2C4?si=UtVXIA_yWmnN11qJ"
                  >
                    Conserving Cuzco School Paintings
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          {/* Formulario de búsqueda */}
          <form className="d-flex ms-auto" onSubmit={handleSearchSubmit} role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="New keyword"
              aria-label="Search"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
