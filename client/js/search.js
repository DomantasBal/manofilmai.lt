// ################### Search.js ###################

import Render from './render.js';

class Search {
  constructor() {
    this.render = new Render();
    this.params = new URLSearchParams(window.location.search);
    this.genre = this.params.get('genre');
    this.displayResults(this.genre);
  }

  displayResults(genre) {
    const filtered = movies.filter((movie) => {
      const result = movie.genre.includes(genre);
      return result;
    });

    this.render.movieGrid(filtered);
  }
}

export default Search;
