import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetch('https://cthulhuflix-2f8f4cc270b5.herokuapp.com/movies')
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            Title: doc.Title,
            Description: doc.Description,
            releaseYear: doc.releaseYear,
            Rating: doc.Rating,
            Genre: {
              Name: doc.Genre.Name,
              Description: doc.Genre.Description
            },
            Director: {
              Name: doc.Director.Name,
              Bio: doc.Director.Bio
            },
            imageURL: doc.imageURL,
            Actors: doc.Actors
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} movies={movies} />
    );
  }

  let filteredMovies = movies;
  if (selectedGenre) {
    filteredMovies = movies.filter((movie) => movie.Genre.Name === selectedGenre);
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {filteredMovies.length === 0 ? (
        <div>No movies found with the selected genre.</div>
      ) : (
        filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
              setSelectedGenre(newSelectedMovie.Genre.Name);
            }}
          />
        ))
      )}
    </div>
  );
};