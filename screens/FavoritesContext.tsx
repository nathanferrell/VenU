import React, { createContext, useState, useContext } from 'react';

interface Item {
    id: string;
    title: string;
    type: string;
}

interface FavoritesContextType {
    favorites: Item[];
    addFavorite: (item: Item) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC = ({ children }) => {
    const [favorites, setFavorites] = useState<Item[]>([]);

    const addFavorite = (item: Item) => {
        setFavorites((prevFavorites) => {
            if (!prevFavorites.find((fav) => fav.id === item.id)) {
                return [...prevFavorites, item];
            }
            return prevFavorites;
        });
    };

    const removeFavorite = (id: string) => {
        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
    };

    const isFavorite = (id: string) => {
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

