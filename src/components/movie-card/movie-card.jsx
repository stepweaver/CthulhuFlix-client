import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    releaseYear: PropTypes.string.isRequired,
    Rating: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      yearOfBirth: PropTypes.string.isRequired,
    }).isRequired,
    imageURL: PropTypes.string.isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};