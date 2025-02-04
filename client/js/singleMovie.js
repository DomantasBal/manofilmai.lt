class SingleMovie {
  constructor() {
    this.movieDetailsContainer = document.querySelector('#movie-details');
    this.controlsContainer = document.querySelector('.single-controls');
  }

  getSingleMovieData(movies) {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    const movieData = movies.find((movie) => movie.id == movieId);
    this.movieData = movieData;
    this.renderSingleMovie(movieData);
  }

  _renderControls(movieId) {
    const controls = `
     <!-- Back btn -->
        <div><a class="btn" href="/">Atgal</a></div>

        <!-- Watchlsit btn -->
        <div class="btn btn-watchlist single" data-movie-id="${movieId}">
          <i class="fa-regular fa-heart"></i>
          <span class="watchlist-text">Įsiminti</span>
        </div>
    `;
    this.controlsContainer.innerHTML = controls;
  }

  renderSingleMovie(movie) {
    this._renderControls(movie.id);

    this.movieDetailsContainer.innerHTML = `
     <div class="details-top">
          <div>
            <img
              src="${movie.poster}"
              class="card-img-top"
              alt="Movie Title"
            />
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.rating} / 10
            </p>
            <p class="text-muted">Metai: ${movie.year}</p>
            <p>
            ${movie.description}
            </p>
            <h5>Žanras</h5>

            <div class="tag-container">
          ${movie.genre
            .map(
              (genre) => `<span class="movie-tag">
            <a href="/search.html?genre=${genre}">${genre}</a>
            </span>`
            )
            .join('')}
            </div>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Anonsas</h2>
          <div class="trailer">
            <iframe
              width="1200"
              height="600"
              src="${movie.trailer}"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
    `;
  }
}

export default SingleMovie;
