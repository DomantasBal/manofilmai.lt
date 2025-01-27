// ################### FILTERING ###################
import Render from './render.js';
import movies from './mockMovies.js';

const render = new Render();

class Filtering {
  constructor() {
    this.movieTag = document
      .querySelectorAll('.movie-tag')
      .forEach((item) => item.addEventListener('click', this.handleTagClick.bind(this)));
    this.tagSelection = [];
  }

  handleTagClick(e) {
    if (!this.tagSelection.includes(e.target.innerHTML)) {
      this.tagSelection.push(e.target.innerHTML);
    } else {
      const index = this.tagSelection.indexOf(e.target.innerHTML);
      this.tagSelection.splice(index, 1);
    }
    e.target.classList.toggle('movie-tag-active');
    const filteredMovies = this._filterMovieGrid(this.tagSelection);

    render.movieGrid(filteredMovies);
  }

  _filterMovieGrid(moviesGenres) {
    const result = movies.filter((movie) => moviesGenres.every((selectedGenre) => movie.genre.includes(selectedGenre)));
    return result;
  }
}

export default Filtering;
