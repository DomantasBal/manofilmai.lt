import movies from './mockMovies.js'; // MockDATA
import Render from './render.js';
import Slider from './slider.js';
import Filtering from './filtering.js';
import Watchlist from './watchList.js';
import SingleMovie from './singleMovie.js';

const currentPath = window.location.pathname;

if (currentPath === '/index.html' || currentPath === '/') {
  // Slider
  const slider = new Slider();
  slider.initSettings();
  slider.addSlides(movies);

  // Grid
  const render = new Render();
  render.movieGrid(movies);

  // Filtering
  const filtering = new Filtering();
}

const singleMovie = new SingleMovie();
singleMovie.getSingleMovieData(movies);

// Watchlist
const watchlist = new Watchlist();
