import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card onClick={() => onMovieClick(movie)} variant='link' style={{ cursor: 'pointer' }} >
      <Card.Img variant='top' src={movie.imageURL} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
      </Card.Body>
    </Card>
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
      Bio: PropTypes.string.isRequired
    }).isRequired,
    imageURL: PropTypes.string.isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};