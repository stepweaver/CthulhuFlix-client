import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const decodedMovieId = decodeURIComponent(movieId);

  const movie = movies.find((m) => m.id === decodedMovieId);

  if (!movie) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <img 
          className='movie-poster w-100'
          src={movie.imageURL}
          alt={`Poster for ${movie.Title}`}
        />
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
      <Link to={'/'}>
        <button
          className='back-button'
          style={{ cursor: 'pointer' }}
        >
          Back
        </button>
      </Link>
    </div>
  );
};