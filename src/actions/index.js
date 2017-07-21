import { POPULATE_MOVIES, SET_SELECTED_MOVIE, TOGGLE_MOVIESEAT_STATUS } from '../constants';

export const populateMovies = () => {
	return {
		type: POPULATE_MOVIES
	}
}

export const setSelectedMovie = (id) => {
	const action = {
		type: SET_SELECTED_MOVIE,
		id
	}
	return action;
}

export const toggleMovieSeatStatus = (id, code) => {
	const action = {
		type: TOGGLE_MOVIESEAT_STATUS,
		id,
		code
	}
	return action;
}