import { createContext, useState, useEffect } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const savedSearchValue = localStorage.getItem('searchValue') || 'paracas';
    setSearchValue(savedSearchValue);
  }, []);

  const updateSearchValue = (newSearchValue) => {
    localStorage.setItem('searchValue', newSearchValue);
    setSearchValue(newSearchValue);
  };

  return (
    <SearchContext.Provider value={{ searchValue, updateSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
