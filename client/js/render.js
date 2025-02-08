// ################### Render.js ###################

import { fetchMovies } from './services/tmdbService.js';
const movies = await fetchMovies();

class Render {
  constructor() {
    this.grid = document.getElementById('movie-grid');
    this.placeholder = '/client/images/placeholder.jpg';
    this.setMovies(movies);
  }

  movieGrid(movies) {
    this.grid.innerHTML = '';

    if (movies.length === 0) {
      const noMoviesMessage = document.createElement('h6');
      noMoviesMessage.textContent = 'Nieko nerasta';
      this.grid.appendChild(noMoviesMessage);
      return;
    }

    movies.forEach((movie) => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('card');
      const posterUrl = this.__formPosterUrl(movie.poster_path);
      const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';

      movieCard.innerHTML = `
        <div>
          <a href="/client/single.html?id=${movie.id}">
            <img src="${posterUrl ? posterUrl : this.placeholder}" class="card-img-top" alt="${movie.original_title}" />
          </a>
          <div class="card-body">
            <h5 class="movie-title">${movie.original_title}</h5>
            <div class="movie-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
              </div>
              <div class="movie-year">
              <p>${releaseYear}</p>
            </div>
            <div class="card-tags">
              ${movie.genres
                .map((g) => `<span class="card-tag"><a href="/search.html?genre=${g}">${g}</a></span>`)
                .join('')}
            </div>
          </div>
        </div>
        <div class="btn btn-watchlist" data-movie-id="${movie.id}">
          <i class="fa-regular fa-heart"></i>
          <span class="watchlist-text">Įsiminti</span>
        </div>
      `;

      movieCard.classList.add('hide');
      this.grid.appendChild(movieCard);

      setTimeout(() => {
        movieCard.classList.remove('hide');
      }, 10);
    });

    // Genre filtering
    this.grid.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.parentElement.classList.contains('card-tag')) {
        const genre = e.target.innerText.trim();
        this.filterMoviesByGenre(genre);
      }
    });
  }

  __formPosterUrl(poster_path) {
    return poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : this.placeholder;
  }

  filterMoviesByGenre(genre) {
    const filteredMovies = this.movies.filter((movie) =>
      movie.genres.some((g) => g.toLowerCase().trim() === genre.toLowerCase().trim())
    );

    this.movieGrid(filteredMovies);
  }

  setMovies(movies) {
    this.movies = movies;
    this.movieGrid(movies);
  }
}

export default Render;
