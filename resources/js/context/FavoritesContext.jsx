import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const addFavorite = (fruit) => {
    setFavorites((prevFavorites) => [...prevFavorites, fruit]);
  };

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(fruit => fruit.id !== id);
    setFavorites(updatedFavorites);
  };

  const removeAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites'); 
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, removeAllFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
