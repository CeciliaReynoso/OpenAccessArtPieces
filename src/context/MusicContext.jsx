// src/context/MusicContext.js
import React, { createContext, useState, useEffect } from 'react';
import useSound from 'use-sound';
import soundFile from '../assets/dancing-in-the-stardust-free-music-no-copyright-203603.mp3'; 

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound(soundFile, { volume: 0.5 });

  useEffect(() => {
    const storedIsPlaying = localStorage.getItem('isPlaying');
    if (storedIsPlaying === 'true') {
      play();
      setIsPlaying(true);
    }
    return () => {
      stop();
    };
  }, [play, stop]);

  const toggleMusic = () => {
    if (isPlaying) {
      stop();
      localStorage.setItem('isPlaying', 'false');
    } else {
      play();
      localStorage.setItem('isPlaying', 'true');
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
};
