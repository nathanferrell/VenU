import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext(undefined);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (item) => {
        setFavorites((prevFavorites) => {
            if (!prevFavorites.find((fav) => fav.id === item.id)) {
                return [...prevFavorites, item];
            }
            return prevFavorites;
        });
    };

    const removeFavorite = (id) => {
        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
    };

    const isFavorite = (id) => {
        return favorites.some((fav) => fav.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};


