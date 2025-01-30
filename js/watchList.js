import movies from './mockMovies.js';

class Watchlist {
  constructor() {
    this.selectedMovies = [];
    this.movieGrid = document.querySelector('#movie-grid'); // Movie Grid
    this.watchlistLink = document.querySelector('#watchlist-link'); // Menu Link
    this.watchlistBtn = document.querySelectorAll('.btn-watchlist'); // Button
    this.sidebar = document.querySelector('.sidebar'); // Sidebar
    this.watchlist = JSON.parse(localStorage.getItem('watchlist')) || []; // Local Storage
    this.watchlistCartIcon = document.querySelector('.increment-element'); // Badge Icon
    this.watchlistCartIcon.textContent = this.watchlist.length;
    this.watchlistClear = document.querySelector('#clear-list');
    this.hideBtn = document.querySelector('#hide-sidebar');

    // Listeners
    this.watchlistBtn.forEach((btn) => btn.addEventListener('click', this.handleWatchlist.bind(this)));
    this.watchlistClear.addEventListener('click', this.clearList.bind(this));
    this.watchlistLink.addEventListener('click', this.openCloseSidebar.bind(this));
    this.hideBtn.addEventListener('click', this.hideSidebar.bind(this));

    this.loadWatchlistButtons();
    this.watchlistRender();
  }

  loadWatchlistButtons() {
    this.watchlistBtn.forEach((btn) => {
      let movieId = null;
      movieId = btn.getAttribute('data-movie-id');

      if (!movieId) return;

      if (this.watchlist.some((movie) => movie.id == movieId)) {
        btn.classList.add('added-to-watchlist');
        btn.innerHTML = '<i class="fa-solid fa-heart heart-pop"></i><span class="watchlist-text">Įsiminta</span>';
      }
    });
  }

  handleWatchlist(e) {
    const button = e.target.closest('.btn-watchlist');

    this.watchlistData(button);
    this.btnIconChange(button);
    this.cartIconChange();
    this.watchlistRender();
  }

  watchlistData(btn) {
    let movieId = null;
    movieId = btn.getAttribute('data-movie-id');

    if (!movieId) return;

    const movieIndex = this.watchlist.findIndex((movie) => movie.id == movieId);
    movieIndex !== -1 ? this.removeMovie(movieId) : this.addMovie(movieId);
  }

  addMovie(movieId) {
    this.watchlist.push(movies.find((movie) => movie.id == movieId));
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  removeMovie(movieId) {
    const index = this.watchlist.findIndex((movie) => movie.id == movieId);
    if (index !== -1) {
      this.watchlist.splice(index, 1);
      localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    }
  }

  clearList() {
    this.watchlist = [];
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    this.watchlistRender();
    this.resetUI();
  }

  resetUI() {
    this.watchlistCartIcon.textContent = 0;
    this.watchlistCartIcon.classList.add('hidden');
    this.sidebar.style.right = '-1000px';
    this.watchlistBtn.forEach((btn) => {
      btn.innerHTML = '<i class="fa-regular fa-heart heart-pop"></i><span class="watchlist-text">Įsiminti</span>';
      btn.classList.remove('added-to-watchlist');
      this.watchlistLink.classList.remove('sidebar-open');
    });
  }

  cartIconChange() {
    const movieCount = this.watchlist.length;
    this.watchlistCartIcon.textContent = movieCount;
    movieCount > 0 ? this.watchlistCartIcon.classList.remove('hidden') : this.watchlistCartIcon.classList.add('hidden');
  }

  openCloseSidebar(e) {
    const state = e.target.classList.toggle('sidebar-open');
    state ? (this.sidebar.style.right = '0px') : (this.sidebar.style.right = '-1000px');
  }

  hideSidebar() {
    const sidebarState = this.watchlistLink.classList.contains('sidebar-open');
    if (sidebarState) {
      this.sidebar.style.right = '-1000px';
      this.watchlistLink.classList.remove('sidebar-open');
    }
  }

  btnIconChange(btn) {
    const isAdded = btn.classList.toggle('added-to-watchlist');
    const heartIcon = btn.querySelector('i');
    const movieId = btn.getAttribute('data-movie-id') || btn.closest('.card')?.getAttribute('data-movie-id');
    const isInStorage = this.watchlist.find((movie) => movie.id == movieId);

    if (isAdded || isInStorage) {
      heartIcon.classList.replace('fa-regular', 'fa-solid');
      btn.innerHTML = '<i class="fa-solid fa-heart heart-pop"></i><span class="watchlist-text">Įsiminta</span>';
    } else {
      heartIcon.classList.replace('fa-solid', 'fa-regular');
      btn.innerHTML = '<i class="fa-regular fa-heart heart-pop"></i><span class="watchlist-text">Įsiminti</span>';
    }
    heartIcon.classList.add('heart-pop');
    setTimeout(() => {
      heartIcon.classList.remove('heart-pop');
    }, 400);
  }

  sidebarRemoveMovie() {
    const xIcons = document.querySelectorAll('.fa-xmark');

    if (this.watchlist.length === 0) {
      this.resetUI();
    }

    xIcons.forEach((icon) => {
      icon.addEventListener('click', (e) => {
        const movieId = e.target.getAttribute('data-id');
        this.removeMovie(movieId);
        this.watchlistRender();
        this.loadWatchlistButtons();

        const movieCard = this.movieGrid?.querySelector(`.card[data-movie-id="${movieId}"]`);
        if (movieCard) {
          const btn = movieCard.querySelector('.btn-watchlist');
          if (btn) {
            btn.innerHTML = '<i class="fa-regular fa-heart heart-pop"></i><span class="watchlist-text">Įsiminti</span>';
            btn.classList.remove('added-to-watchlist');
          }
        }
      });
    });
  }

  watchlistRender() {
    let sidebarContent = document.querySelector('.watchlist-sidebar');
    sidebarContent.innerHTML = '';
    this.watchlist.forEach((movie, index) => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('sidebar-movie');
      movieElement.setAttribute('movie-data-id', movie.id);
      movieElement.innerHTML = `<p class="movie-number">${index + 1}</p><img src="${movie.poster}" alt="${
        movie.title
      }" /><p class="movie-title-sidebar">${
        movie.title
      }</p><div class="controls"><i class="fa-solid fa-xmark" data-id="${movie.id}"></i></div>`;
      sidebarContent.appendChild(movieElement);
    });
    this.sidebarRemoveMovie();
  }
}

export default Watchlist;
