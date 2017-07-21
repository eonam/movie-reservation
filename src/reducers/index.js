import { POPULATE_MOVIES, SET_SELECTED_MOVIE, TOGGLE_MOVIESEAT_STATUS } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

const populateMovies = () => {
	return [
    {id: 0, title: 'War for the Planet of the Apes', seats: [
      {code: 'a1', status: 0},{code: 'b1', status: 0},{code: 'c1', status: 0},
      {code: 'a2', status: 0},{code: 'b2', status: 0},{code: 'c2', status: 0},
      {code: 'a3', status: 0},{code: 'b3', status: 0},{code: 'c3', status: 0}]},
    {id: 1, title: 'Spider-Man: Homecoming', seats: [
      {code: 'a1', status: 0},{code: 'b1', status: 0},{code: 'c1', status: 0},
      {code: 'a2', status: 0},{code: 'b2', status: 0},{code: 'c2', status: 0},
      {code: 'a3', status: 0},{code: 'b3', status: 0},{code: 'c3', status: 0}]},
    {id: 2, title: 'Wonder Woman', seats: [
      {code: 'a1', status: 0},{code: 'b1', status: 0},{code: 'c1', status: 0},
      {code: 'a2', status: 0},{code: 'b2', status: 0},{code: 'c2', status: 0},
      {code: 'a3', status: 0},{code: 'b3', status: 0},{code: 'c3', status: 0}]}
  ]
}

const toggleMovieSeatStatus = (movie, code) => {
	movie.seats.forEach(function(seats) {
		seats.status = seats.code === code ? (seats.status === 0 ? 1 : 0) : seats.status;
	})
	return movie;
}

const reducers = (state = [], action) => {
	let movies = null;
	let selectedMovie = 0;

	movies = read_cookie('movies');
	selectedMovie = read_cookie('selectedMovie');

	switch(action.type) {
		case POPULATE_MOVIES:
			movies = read_cookie('movies').length === 0 ? populateMovies() : read_cookie('movies');
			selectedMovie = read_cookie('selectedMovie').length === 0 ? 0 : read_cookie('selectedMovie');
			bake_cookie('movies', movies);
			break;

		case SET_SELECTED_MOVIE:
			selectedMovie = action.id;
			bake_cookie('selectedMovie', selectedMovie);
			break;

		case TOGGLE_MOVIESEAT_STATUS:
			state.movies[action.id] = toggleMovieSeatStatus(state.movies[action.id], action.code);
			movies = state.movies;
			bake_cookie('movies', movies);
			break;

		default:
			return state;
	}
	
	return {
		movies,
		selectedMovie
	}
}

export default reducers;