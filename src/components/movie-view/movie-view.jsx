export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img
          className='movie-poster'
          src={movie.imageURL}
          alt={`Poster for ${movie.title}`}
        />
      </div>
      <h2>
        <span className='movie-title'>{movie.title}</span>
      </h2>
      <h5>
        <span>{movie.releaseYear} | {movie.genre.name}</span>
      </h5>
      <p>
        {movie.description}
      </p>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};