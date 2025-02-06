// ################### Filtering.js ###################

import Render from './render.js';
const render = new Render();

class Filtering {
  constructor() {
    this.movieTag = document
      .querySelectorAll('.movie-tag')
      .forEach((item) => item.addEventListener('click', this.handleTagClick.bind(this)));

    // Storage
    this.tagSelection = [];
    this.movieSelection = [...movies];
    this.selectedRating = null;
    this.selectedYear = null;
    this.selectedCountry = null;

    // Rating
    this.rating = document.getElementById('rating-filter');
    this.rating.addEventListener('input', this.handleRatingFilter.bind(this));

    // Year
    this.year = document.getElementById('year-filter');
    this.year.addEventListener('change', this.handleYearFilter.bind(this));

    // Country
    this.Country = document.getElementById('country-filter');
    this.Country.addEventListener('change', this.handleCountryFilter.bind(this));

    // Render
    this._applyFilters();
  }

  handleRatingFilter(e) {
    const minRating = parseFloat(e.target.value);
    this.selectedRating = minRating;
    this._applyFilters();
  }

  handleYearFilter(e) {
    const selectedYear = e.target.value;
    this.selectedYear = selectedYear === 'metai' ? null : parseInt(selectedYear);
    this._applyFilters();
  }

  handleCountryFilter(e) {
    const selectedCountry = e.target.value;
    this.selectedCountry = selectedCountry === '' ? null : selectedCountry;
    this._applyFilters();
  }

  handleTagClick(e) {
    const genre = e.target.innerText.trim();

    if (!this.tagSelection.includes(genre)) {
      this.tagSelection.push(genre);
    } else {
      this.tagSelection = this.tagSelection.filter((g) => g !== genre);
    }

    e.target.classList.toggle('movie-tag-active');
    this._applyFilters();
  }

  _applyFilters() {
    let filteredMovies = [...movies];

    if (this.tagSelection.length > 0) {
      filteredMovies = this._filterMovieGrid(this.tagSelection);
    }

    if (this.selectedRating) {
      filteredMovies = filteredMovies.filter((movie) => movie.rating >= this.selectedRating);
    }

    if (this.selectedYear) {
      filteredMovies = filteredMovies.filter((movie) => movie.year == this.selectedYear);
    }

    if (this.selectedCountry) {
      filteredMovies = filteredMovies.filter(
        (movie) =>
          movie.original_language && movie.original_language.toLowerCase() === this.selectedCountry.toLowerCase()
      );
    }

    render.movieGrid(filteredMovies);
  }

  _filterMovieGrid(moviesGenres) {
    return movies.filter((movie) => moviesGenres.every((selectedGenre) => movie.genre.includes(selectedGenre)));
  }
}

export default Filtering;
