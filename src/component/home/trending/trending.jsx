// const Trending = ({ img, id, title, overview, rating }) => {
//   return (
//     <div key={id} className="movie-card">
//       <img src={`https://image.tmdb.org/t/p/w500${img}`} alt={title} />
//       <h2>{title}</h2>
//       <p>{overview}</p>
//     </div>
//   );
// };

// export default Trending;

// ===== v2 =====
import { useNavigate } from "react-router-dom";
import "./trending.css";

const MovieCard = ({ img, id, title, overview, rating }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };
  return (
    <div onClick={() => handleClick(id)} key={id} className="movie-card">
      <div className="movie-image">
        <img src={`https://image.tmdb.org/t/p/w500${img}`} alt={title} />
        <span className="rating-badge">{rating?.toFixed(1)}</span>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-overview">{overview?.slice(0, 100)}...</p>
      </div>
    </div>
  );
};

export default MovieCard;
