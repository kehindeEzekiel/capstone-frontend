import React, { useEffect, useState } from "react";
import {
  getWatchlist,
  removeFromWatchlist,
} from "../../service/watchlistService";
import { Link } from "react-router-dom";
import "./watchLists.css";

const WatchLists = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const handleRemove = (id) => {
    removeFromWatchlist(id);
    setWatchlist(getWatchlist()); // Refresh
  };

  if (watchlist?.length === 0) {
    return (
      <div className="watchlist-empty">No movies in your Watchlist yet.</div>
    );
  }

  return (
    <div className="watchlist-container">
      <h2>Your Watchlist</h2>
      <div className="watchlist-grid">
        {watchlist?.map((movie) => (
          <div key={movie?.id} className="watchlist-card">
            <Link to={`/movie/${movie?.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
                alt={movie?.title}
              />
            </Link>
            <div className="watchlist-info">
              <h3>{movie?.title}</h3>
              <p>{new Date(movie?.release_date).toLocaleDateString()}</p>
              <button onClick={() => handleRemove(movie?.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchLists;
