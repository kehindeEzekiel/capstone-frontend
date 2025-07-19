// import React from "react";
// import { Link } from "react-router-dom";
// //import MovieCard from "../../components/MovieCard/MovieCard";
// import "./MovieCard.css";

// const MovieCard = ({ movie, onRemove }) => {
//   return (
//     <div className="movie-card">
//       <Link to={`/movie/${movie.id}`}>
//         <img
//           src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
//           alt={movie.title}
//         />
//       </Link>
//       <div className="movie-card-body">
//         <h3>{movie.title}</h3>
//         <p>{new Date(movie.release_date).toLocaleDateString()}</p>
//         {onRemove && (
//           <button className="remove-btn" onClick={() => onRemove(movie.id)}>
//             ❌ Remove
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MovieCard;

// ------ version 2 -------
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./MovieCard.css";

const MovieCard = ({
  img,
  id,
  title,
  overview,
  rating,
  releaseDate,
  index,
}) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = (movieId) => {
    if (movieId) {
      navigate(`/movie/${movieId}`);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const formatReleaseYear = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).getFullYear();
  };

  const truncateOverview = (text, maxLength = 120) => {
    if (!text) return "No overview available";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const truncateTitle = (text, maxLength = 40) => {
    if (!text) return "Untitled Movie";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const getImageUrl = () => {
    if (!img || imageError) {
      return "https://via.placeholder.com/500x750/2a2a2a/ffffff?text=No+Image";
    }
    return `https://image.tmdb.org/t/p/w500${img}`;
  };

  return (
    <div
      onClick={() => handleClick(id)}
      className={`movie-card ${!imageLoaded ? "loading" : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title || "Untitled Movie"}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(id);
        }
      }}
    >
      <div className="movie-image">
        <img
          src={getImageUrl()}
          alt={title || "Movie poster"}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
        />
        {rating && <span className="rating-badge">{rating.toFixed(1)}</span>}
      </div>

      <div className="movie-info">
        <h3 className="movie-title" title={title || "Untitled Movie"}>
          {truncateTitle(title)}
          {releaseDate && (
            <span className="release-year">
              {" "}
              ({formatReleaseYear(releaseDate)})
            </span>
          )}
        </h3>
        <p className="movie-overview">{truncateOverview(overview)}</p>
      </div>
    </div>
  );
};

export default MovieCard;
