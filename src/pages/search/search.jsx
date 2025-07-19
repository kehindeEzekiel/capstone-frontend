// import { searchMovies } from "../../service/tmdbService";
// import MovieCard from "../../component/home/trending/trending";
// import "./search.css";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// const Search = () => {
//   const { searchTerm } = useParams();
//   const [movieData, setMovieData] = useState(null);

//   useEffect(() => {
//     const getMovieDetails = async () => {
//       const payload = { term: searchTerm };
//       const result = await searchMovies(payload);
//       setMovieData(result?.data?.data?.results);
//       console.log(result?.data?.data?.results);
//     };
//     getMovieDetails();
//   }, [searchTerm]);

//   return (
//     <div className="search-container">
//       <h1>Search Result</h1>
//       <div>
//         {movieData?.length ? (
//           <div>
//             {movieData?.map((movie, index) => {
//               return (
//                 <MovieCard
//                   key={movie?.id || index}
//                   img={movie?.poster_path}
//                   title={movie?.title}
//                   overview={movie?.overview}
//                   id={movie?.id}
//                   rating={movie?.vote_average}
//                   releaseDate={movie?.release_date}
//                   index={index}
//                 />
//               );
//             })}
//           </div>
//         ) : (
//           <h1>No result found</h1>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Search;

// ====== version 2 =======
import { searchMovies } from "../../service/tmdbService";
import MovieCard from "../../component/home/trending/trending";
import "./search.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const Search = () => {
  const { searchTerm } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const payload = { term: searchTerm };
        const result = await searchMovies(payload);
        setMovieData(result?.data?.data?.results || []);
      } catch (error) {
        console.error("Search error:", error);
        setMovieData([]);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) getMovieDetails();
  }, [searchTerm]);

  return (
    <div className="search-container">
      <h2 className="search-title">
        {searchTerm && !loading ? `Results for "${searchTerm}"` : "Search"}
      </h2>

      {loading ? (
        // <p className="loading-text">Loading...</p>
        <div className="loader">
          <FaSpinner />
        </div>
      ) : movieData.length > 0 ? (
        <div className="movie-grid">
          {movieData.map((movie, index) => (
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
      ) : (
        <p className="no-results">No results found for "{searchTerm}"</p>
      )}
    </div>
  );
};

export default Search;
