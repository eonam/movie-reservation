import React, { Component } from 'react';
import { connect } from 'react-redux';
import { populateMovies, setSelectedMovie, toggleMovieSeatStatus } from './actions';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: {
        title: '',
        seats: [] 
      },
      selectedMovie: 0
    }
  }

  componentDidMount() {
    this.props.populateMovies()
  }

  componentWillUnmount() {
    this.state = null;
  }

  updateSelectedMovie(id) {
    this.props.setSelectedMovie(id);
  }

  toggleMovieSeatStatus(id, code) {
    this.props.toggleMovieSeatStatus(id, code);
    this.updateSelectedMovie(id);
  }

  renderSeats() {
    const { movies } = this.props;
    const { selectedMovie } = this.props;

    var i = 0;
    var seatsArr = [];

    for (var r = 0; r < 3; r++) {
      seatsArr[r] = [];
      for (var c = 0; c < 3; c++) {
        seatsArr[r].push(movies[selectedMovie].seats[i]);
        i++;
      }
    }

    return (
      <div><table><tbody>
        {
          seatsArr.map(row => {
            return (
              <tr key={seatsArr.indexOf(row)}>{ 
                row.map(col => { 
                  return (
                    <td 
                      className={col.status === 1 ? 'active' : '' } 
                      onClick={() => this.toggleMovieSeatStatus(selectedMovie, col.code)} 
                      key={row.indexOf(col)}>{col.code}
                    </td>
                  ) 
                }) 
              }</tr>
            )
          })
        }
      </tbody></table></div>
    )
  }

  renderSeatsStatus() {
    const { movies } = this.props;
    const { selectedMovie } = this.props;

    return (
      <div>
        <ul>
          <lh>Taken</lh>{
          movies[selectedMovie].seats.map(seat => {
            if (seat.status === 1) return (
              <li key={seat.code}>{seat.code}</li>
            ) 
            else return false;
          })}
        </ul>
        <ul>
          <lh>Available</lh>{
          movies[selectedMovie].seats.map(seat => {
            if (seat.status === 0) return (
              <li key={seat.code}>{seat.code}</li>
            ) 
            else return false;
          })}
        </ul>
      </div>
    )
  }

  renderMovies() {
    const { movies } = this.props;
    const { selectedMovie } = this.props;
    
    if ( movies != null && movies.length > 0 && selectedMovie > -1 ) {
      return (
        <div>
          <h1>Movies</h1>
          <ul>
            {
              movies.map(movie => {
                return (<li 
                  className={movie.id === selectedMovie ? 'active' : ''} 
                  onClick={() => this.updateSelectedMovie(movie.id)} key={movie.id}>{movie.title}
                </li>)
              })  
            }
          </ul>
          { this.renderSeats() }
          { this.renderSeatsStatus() }
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        { this.renderMovies() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
    selectedMovie: state.selectedMovie
  }
}

export default connect(mapStateToProps, { populateMovies, setSelectedMovie, toggleMovieSeatStatus })(App);