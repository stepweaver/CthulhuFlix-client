import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

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

        const moviesFromApi = movies.map((doc) => {
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
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
      });
  }, [token]);

  if (selectedMovie) {
    return (
      <Col md={8}>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </Col>
    );
  }

  return (
    <Row className='justify-content-md-center'> 
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={(user) => setUser(user)} />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)} 
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className='mb-5' key={movie.id} md={6} lg={4} xl={2}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
          <Button onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear(); }}
          >
            Logout
          </Button>
        </>
      )}
    </Row>
  );
};