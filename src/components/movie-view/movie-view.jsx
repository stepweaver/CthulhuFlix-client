export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img 
          className='movie-poster'
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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};