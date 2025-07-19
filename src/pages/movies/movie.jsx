// import React from "react";
// import "./movie.css";
// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import { movieDetails } from "../../service/tmdbService";
// import { useEffect } from "react";

// const Movie = () => {
//   const { id } = useParams();
//   const [movieData, setMovieData] = useState(null);
//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       const response = await movieDetails(id);
//       setMovieData(response?.data || null);
//     };
//     fetchMovieDetails();
//     // Fetch movie details or perform any necessary setup here
//   }, []);

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount);

//   const formatRuntime = (minutes) => {
//     const hours = Math.floor(minutes / 60);
//     const mins = minutes % 60;
//     return `${hours}h ${mins}m`;
//   };

// //   handleClick = (id) => { add watchLists and add to favorties to

//   return (
//     <div className="movie-details-container">
//       {/* Hero Section with Backdrop */}
//       <div
//         className="hero-section"
//         style={{
//           backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData?.backdrop_path})`,
//         }}
//       >
//         <div className="hero-overlay">
//           <h1 className="movie-title">{movieData?.title}</h1>
//           <p className="movie-tagline">{movieData?.tagline}</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="content-container">
//         <div className="poster-container">
//           <img
//             src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}
//             alt={`${movieData?.title} poster`}
//             className="poster-image"
//           />
//         </div>
//         <div className="details-container">
//           <h2 className="section-title">Overview</h2>
//           <p className="overview">{movieData?.overview}</p>

//           <h2 className="section-title">Details</h2>
//           <ul className="details-list">
//             <li>
//               <span className="detail-label">Release Date:</span>{" "}
//               {new Date(movieData?.release_date).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </li>
//             <li>
//               <span className="detail-label">Genres:</span>{" "}
//               {movieData?.genres.map((genre) => genre.name).join(", ")}
//             </li>
//             <li>
//               <span className="detail-label">Runtime:</span>{" "}
//               {formatRuntime(movieData?.runtime)}
//             </li>
//             <li>
//               <span className="detail-label">Rating:</span>{" "}
//               {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count}{" "}
//               votes)
//             </li>
//             <li>
//               <span className="detail-label">Budget:</span>{" "}
//               {formatCurrency(movieData?.budget)}
//             </li>
//             <li>
//               <span className="detail-label">Revenue:</span>{" "}
//               {formatCurrency(movieData?.revenue)}
//             </li>
//             <li>
//               <span className="detail-label">Production Companies:</span>{" "}
//               {movieData?.production_companies
//                 .map((company) => company.name)
//                 .join(", ")}
//             </li>
//             <li>
//               <span className="detail-label">Collection:</span>{" "}
//               {movieData?.belongs_to_collection?.name || "None"}
//             </li>
//           </ul>

//           <a
//             href={movieData?.homepage}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="watch-now-button"
//           >
//             Visit Official Site
//           </a>

//           {/* add buttons */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Movie;

import React from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { movieDetails } from "../../service/tmdbService";
import { addToFavorites } from "../../service/favoritesService";
import { toast } from "sonner";
import { addToWatchlist } from "../../service/watchlistService";
import { FaSpinner } from "react-icons/fa";

const Movie = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingAddfavourite, setLoadingAddFavourite] = useState(false);
  const [loadingAddwatchlist, setLoadingAddWatchlist] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await movieDetails(id);
        setMovieData(response?.data || null);
        setError(null);
      } catch (err) {
        setError("Failed to load movie details");
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleAddToWatchlist = async () => {
    setLoadingAddWatchlist(true);
    const movieId = movieData?.id;
    const payload = { movieId };
    try {
      await addToWatchlist(payload);
      toast.success("Movie added to watchlist");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error adding to watchlist"
      );
    } finally {
      setLoadingAddWatchlist(false);
    }
  };

  const handleAddToFavorites = async () => {
    setLoadingAddFavourite(true);
    const movieId = movieData?.id;
    const payload = { movieId };
    try {
      await addToFavorites(payload);
      toast.success("Movie added to favourite");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error adding to favorite"
      );
    } finally {
      setLoadingAddFavourite(false);
    }
  };

  if (loading) {
    return (
      <div className="movie-details-container">
        <div className="loading-shimmer" style={{ height: "70vh" }}></div>
        <div className="content-container">
          <div
            className="loading-shimmer"
            style={{ height: "400px", borderRadius: "16px" }}
          ></div>
          <div
            className="loading-shimmer"
            style={{ height: "600px", borderRadius: "20px" }}
          ></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-details-container">
        <div
          className="error-message"
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            color: "#ff6b6b",
          }}
        >
          <h2>{error}</h2>
        </div>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="movie-details-container">
        <div
          className="error-message"
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            color: "#ff6b6b",
          }}
        >
          <h2>Movie not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-details-container">
      {/* Hero Section with Backdrop */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
        }}
      >
        <div className="hero-overlay">
          <h1 className="movie-title">{movieData.title}</h1>
          {movieData.tagline && (
            <p className="movie-tagline">{movieData.tagline}</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        <div className="poster-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={`${movieData.title} poster`}
            className="poster-image"
          />
        </div>

        <div className="details-container">
          <h2 className="section-title">Overview</h2>
          <p className="overview">{movieData.overview}</p>

          <h2 className="section-title">Details</h2>
          <ul className="details-list">
            <li>
              <span className="detail-label">Release Date:</span>
              {movieData.release_date
                ? new Date(movieData.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </li>
            <li>
              <span className="detail-label">Genres:</span>
              {movieData.genres?.length > 0
                ? movieData.genres.map((genre) => genre.name).join(", ")
                : "N/A"}
            </li>
            <li>
              <span className="detail-label">Runtime:</span>
              {formatRuntime(movieData.runtime)}
            </li>
            <li>
              <span className="detail-label">Rating:</span>
              {movieData.vote_average
                ? `${movieData.vote_average.toFixed(1)} (${
                    movieData.vote_count
                  } votes)`
                : "N/A"}
              {movieData.vote_average && (
                <span className="rating-badge">
                  ⭐ {movieData.vote_average.toFixed(1)}
                </span>
              )}
            </li>
            <li>
              <span className="detail-label">Budget:</span>
              {formatCurrency(movieData.budget)}
            </li>
            <li>
              <span className="detail-label">Revenue:</span>
              {formatCurrency(movieData.revenue)}
            </li>
            <li>
              <span className="detail-label">Production Companies:</span>
              {movieData.production_companies?.length > 0
                ? movieData.production_companies
                    .map((company) => company.name)
                    .join(", ")
                : "N/A"}
            </li>
            <li>
              <span className="detail-label">Collection:</span>
              {movieData.belongs_to_collection?.name || "None"}
            </li>
          </ul>

          {/* Action Buttons */}
          <div
            className="action-buttons"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "2rem",
            }}
          >
            {movieData.homepage && (
              <a
                href={movieData.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-now-button"
              >
                Visit Official Site
              </a>
            )}

            <button
              onClick={handleAddToWatchlist}
              className="watch-now-button"
              style={{
                background: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)",
                boxShadow: "0 10px 30px rgba(78, 205, 196, 0.3)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {loadingAddwatchlist ? "...loading" : "Add to Watchlist"}
            </button>

            <button
              onClick={handleAddToFavorites}
              className="watch-now-button"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {loadingAddfavourite ? "..loading" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
