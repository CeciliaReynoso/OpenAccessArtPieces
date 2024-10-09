import { Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from "react";
import { SearchProvider } from './context/SearchContext';
import { ApiProvider } from './context/ApiContext'; 
import { MusicProvider } from "./context/MusicContext";
import { UserContext } from "./context/UserContext"; 
import Landing from './pages/Landing';
import Home from './pages/Home';
import ArtTable from './pages/ArtTable'; 
import NotFound from './pages/NotFound';
import Gallery from './pages/Gallery';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <MusicProvider>
    <SearchProvider>
      <ApiProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/ArtTable" element={<ArtTable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ApiProvider>
    </SearchProvider>
    </MusicProvider>
  );
};

export default App;
