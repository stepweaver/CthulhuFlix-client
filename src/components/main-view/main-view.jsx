import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://cthulhuflix-2f8f4cc270b5.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log(movies);
      });
      //   const moviesFromApi = data.map((doc) => {
      //     return {
      //       id: doc._id,
      //       Title: doc.Title,
      //       Description: doc.Description,
      //       releaseYear: doc.releaseYear,
      //       Rating: doc.Rating,
      //       Genre: {
      //         Name: doc.Genre.Name,
      //         Description: doc.Genre.Description
      //       },
      //       Director: {
      //         Name: doc.Director.Name,
      //         Bio: doc.Director.Bio
      //       },
      //       imageURL: doc.imageURL,
      //       Actors: doc.Actors
      //     };
      //   });

      //   setMovies(moviesFromApi);
      // });
  }, [token]);

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }


  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
};

// TODO: Display list of similar movies in MovieView