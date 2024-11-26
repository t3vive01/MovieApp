import React, { useEffect, useState } from "react";
import { fetchMovies } from "../navbar/api";
import './Home.css'
/*this shows movie data. e.g, movie name, release date, etc*/
interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies(); 
        setMovies(data.results); 
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) return <h2>Loading movies...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Latest Movies</h1>
      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
