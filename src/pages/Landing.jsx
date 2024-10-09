import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import { MusicContext } from '../context/MusicContext';
import '../components/Landing.css';
import CountrySelect from '../components/CountrySelect';
import robot_10386_256 from '../assets/403.gif';
import ArtCarousel1 from '../components/ArtCarousel1';
import ArtCarousel2 from '../components/ArtCarousel2';
import ArtCarousel3 from '../components/ArtCarousel3';
import ArtCarousel4 from '../components/ArtCarousel4';
import icons8_no_audio_26 from '../assets/icons8_no_audio_26.png';
import icons8_audio_24 from '../assets/icons8_audio_24.png';

// Asegúrate de importar los íconos de audio
const audioOnIcon = icons8_audio_24;
const audioOffIcon = icons8_no_audio_26;

const Landing = () => {
  const { updateSearchValue } = useContext(SearchContext);
  const { isPlaying, toggleMusic } = useContext(MusicContext);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    if (inputValue) {
      updateSearchValue(inputValue);
      navigate('/gallery');
    }
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setInputValue(country);
  };

  return (
    <div className="landing-container">
      <div onClick={toggleMusic} style={{ color: 'white', cursor: 'pointer' }}>
        {isPlaying ? (
          <p>
            <img src={audioOnIcon} alt="audioOn" /> click here for music off
          </p>
        ) : (
          <p>
            <img src={audioOffIcon} alt="audioOff" /> click here for music on
          </p>
        )}
      </div>
      <form onSubmit={handleSearch} className="landing-form">
        <div className="landing-options">
          <CountrySelect onChange={handleCountryChange} />
          <p style={{ color: 'white' }}>Or</p>
          <input
            type="text"
            placeholder="Enter a keyword e.g. flowers, kung , manet, paracas"
            className="landing-button"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-success">Search</button>
        </div>
      </form>
      <p className="landing-title">Welcome to search open access pieces at The Metropolitan Museum of Art - NYC</p>
      <img
        src={robot_10386_256}
        alt="roboteyes"
        className="landing-logo"
      />
      <div className="carousel-container">
        <div className="carousel-top-left"><ArtCarousel1 /></div>
        <div className="carousel-top-right"><ArtCarousel2 /></div>
        <div className="carousel-bottom-left"><ArtCarousel3 /></div>
        <div className="carousel-bottom-right"><ArtCarousel4 /></div>
      </div>
    </div>
  );
};

export default Landing;
