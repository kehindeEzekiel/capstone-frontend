import React, { useEffect, useState } from "react";
import { getFavorites } from "../../service/favoritesService";
import { getWatchlist } from "../../service/watchlistService";
import { FaUserCircle, FaStar, FaFilm, FaEdit } from "react-icons/fa";
import "./Profile.css";
import MovieCard from "../../component/MovieCard/MovieCard";
import { allMovies } from "../../service/tmdbService";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Guest User",
    email: "No email provided",
  });

  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [activeTab, setActiveTab] = useState("favorites");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("_tb_user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [favRes, watchRes] = await Promise.all([
          getFavorites(),
          getWatchlist(),
        ]);
        setFavorites(favRes?.data?.data || []);
        setWatchlist(watchRes?.data?.data || []);
      } catch (error) {
        setError("Failed to load your movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const moviesToShow = activeTab === "favorites" ? favorites : watchlist;

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar-placeholder">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User avatar"
                className="avatar-image"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <FaUserCircle className="avatar-icon" />
            )}
          </div>
          <div className="user-info">
            <h2>{`${user?.firstName} ${user?.lastName}`}</h2>
            {/* <p>{user.email}</p> */}
          </div>
        </div>

        <div className="stats-summary">
          <div className="stat">
            <FaStar className="icon" />
            <span>{favorites.length} Favorites</span>
          </div>
          <div className="stat">
            <FaFilm className="icon" />
            <span>{watchlist.length} in Watchlist</span>
          </div>
        </div>

        <div className="tabs-container">
          <button
            className={activeTab === "favorites" ? "tab active" : "tab"}
            onClick={() => setActiveTab("favorites")}
          >
            <FaStar /> Favorites
          </button>
          <button
            className={activeTab === "watchlist" ? "tab active" : "tab"}
            onClick={() => setActiveTab("watchlist")}
          >
            <FaFilm /> Watchlist
          </button>
        </div>

        {loading ? (
          <div className="skeleton-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : moviesToShow?.length === 0 ? (
          <p className="empty-state">No {activeTab} movies yet.</p>
        ) : (
          <div className="movie-grid">
            {moviesToShow.map((movie, index) => (
              <MovieCard
                key={movie?.id || index}
                img={movie?.poster_path}
                title={movie?.title}
                overview={movie?.overview}
                id={movie?.id}
                rating={movie?.vote_average}
                releaseDate={movie?.release_date}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
