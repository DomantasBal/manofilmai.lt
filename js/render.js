class Render {
  constructor() {
    this.grid = document.getElementById('popular-movies');
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
      movieCard.setAttribute('data-movie-id', movie.id);

      movieCard.innerHTML = `
        <div>
          <a href="/filmas.html?id=${movie.id}">
            <img src="${movie.poster}" class="card-img-top" alt="" />
          </a>
          <div class="card-body">
            <h5 class="movie-title">${movie.title}</h5>
            <div class="movie-rating"><i class="fas fa-star text-secondary"></i> ${movie.rating} / 10</div>
            <div class="movie-year"><p>${movie.year}</p></div>
            <div class="card-tags">
              ${movie.genre.map((g) => `<span class="card-tag"><a href="#">${g}</a></span>`).join('')}
            </div>
          </div>
        </div>
        <div class="btn btn-watchlist">
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

    this.grid.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.parentElement.classList.contains('card-tag')) {
        const genre = e.target.innerText.trim();
        this.filterMoviesByGenre(genre);
      }
    });
  }

  filterMoviesByGenre(genre) {
    const filteredMovies = this.movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase().trim() === genre.toLowerCase().trim())
    );

    this.movieGrid(filteredMovies);
  }

  setMovies(movies) {
    this.movies = movies;
    this.movieGrid(movies);
  }
}

export default Render;
