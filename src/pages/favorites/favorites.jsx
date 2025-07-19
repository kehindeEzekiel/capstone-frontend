import React, { useEffect, useState } from "react";
import {
  getFavorites,
  removeFromFavorites,
  clearFavorites,
} from "../../service/favoritesService";
import MovieCard from "../../component/home/trending/trending";

import "./favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (id) => {
    removeFromFavorites(id);
    setFavorites(getFavorites());
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all favorites?")) {
      clearFavorites();
      setFavorites([]);
    }
  };

  return (
    <div className="favorites-dashboard">
      <div className="favorites-header">
        <h2>Favorites Dashboard</h2>
        {favorites?.length > 0 && (
          <button className="clear-all-btn" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </div>

      {favorites?.length === 0 ? (
        <p className="empty-msg">Your favorites list is empty.</p>
      ) : (
        <div className="favorites-grid">
          {favorites?.map((movie) => (
            <MovieCard key={movie?.id} movie={movie} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
