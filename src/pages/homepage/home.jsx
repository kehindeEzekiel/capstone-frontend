import React, { useEffect, useState } from "react";
import { allMovies, topRatedMovies } from "../../service/tmdbService";
import MovieCard from "../../component/MovieCard/MovieCard";
import "./home.css";
import { limitMovie } from "./data";

function Home() {
  const [movieData, setMovieData] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingTopRated, setLoadingTopRated] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoadingTrending(true);
        setError(null);
        const response = await allMovies();
        setMovieData(response?.data || []);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError("Failed to load trending movies");
      } finally {
        setLoadingTrending(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        setLoadingTopRated(true);
        setError(null);
        const response = await topRatedMovies();
        setTopRated(response?.data || []);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
        setError("Failed to load top rated movies");
      } finally {
        setLoadingTopRated(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  const handleBrowseNow = () => {
    // Scroll to trending section
    const trendingSection = document.querySelector(".trending-section");
    if (trendingSection) {
      trendingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderLoadingCards = () => {
    return Array.from({ length: 10 }, (_, index) => (
      <div key={index} className="loading-shimmer"></div>
    ));
  };

  const renderErrorState = (message) => (
    <div className="error-state">
      <p style={{ color: "#ff6b6b", textAlign: "center", fontSize: "1.1rem" }}>
        {message}
      </p>
    </div>
  );

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-bg">
          <div className="floating-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${topRated[0]?.poster_path}`}
              alt=""
            />
          </div>
          <div className="floating-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData[0]?.poster_path}`}
              alt=""
            />
          </div>
          <div className="floating-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${topRated[1]?.poster_path}`}
              alt=""
            />
          </div>
          <div className="floating-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData[1]?.poster_path}`}
              alt=""
            />
          </div>
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-badge">✨ Now Streaming</span>
          <h1 className="hero-title">Discover Blockbuster Movies</h1>
          <p className="hero-subtitle">
            Explore trending films, find hidden gems, and build your own
            watchlist with the most comprehensive movie database. Your next
            favorite movie is just a click away.
          </p>
          <div className="hero-buttons">
            <button className="hero-btn" onClick={handleBrowseNow}>
              Browse Now
            </button>
            <button className="hero-btn hero-btn-secondary">
              Watch Trailer
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Movies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1M+</span>
              <span className="stat-label">Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.9</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Movies Section */}
      <div className="trending-section">
        <h1>Trending Movies</h1>
        <div className="trending-movies">
          {loadingTrending
            ? renderLoadingCards()
            : error && movieData.length === 0
            ? renderErrorState("Failed to load trending movies")
            : limitMovie(movieData, 10).map((movie, index) => (
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
      </div>

      {/* Top Rated Movies Section */}
      <div className="top-rated-section">
        <h1>Top Rated Movies</h1>
        <div className="trending-movies">
          {loadingTopRated
            ? renderLoadingCards()
            : error && topRated.length === 0
            ? renderErrorState("Failed to load top rated movies")
            : limitMovie(topRated, 10).map((movie, index) => (
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
      </div>
    </div>
  );
}

export default Home;
