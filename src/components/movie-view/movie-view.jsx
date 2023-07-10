import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';

export const MovieView = ({ movie, onBackClick, movies }) => {
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const filteredMovies = movies.filter(
      (m) => m.Genre.Name === movie.Genre.Name && m.id !== movie.id
    );
    setSimilarMovies(filteredMovies);
  }, [movie, movies]);

  return (
    <div>
      <div>
        <img className='movie-poster' src={movie.imageURL} alt={`Poster for ${movie.Title}`} />
      </div>
      <div>
        <h2 className='movie-title'>{movie.Title}</h2>
        <h5>
          {movie.releaseYear} | {movie.Genre?.Name}
        </h5>
        <hr />
        <p>{movie.Description}</p>
        <p>Actors: {movie.Actors.join(', ')}</p>
        <p>Director: {movie.Director?.Name}</p>
      </div>
      <button onClick={onBackClick}>Back</button>

      <div>
        <h3>Similar Movies</h3>
        {similarMovies.length === 0 ? (
          <div>No similar movies found.</div>
        ) : (
          <div className='similar-movies'>
            {similarMovies.map((similarMovie) => (
              <MovieCard
                key={similarMovie.id}
                movie={similarMovie}
                onMovieClick={(newSelectedMovie) => console.log('Similar movie clicked')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};