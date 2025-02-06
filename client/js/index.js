// ################### Index.js ###################

import { fetchMovies } from './services/tmdbService.js'; // Movie Data
import Render from './render.js';
import Slider from './slider.js';
import Filtering from './filtering.js';
import Watchlist from './watchList.js';
import SingleMovie from './singleMovie.js';
import Search from './search.js';
import Router from './router.js';

// // Fetch movies
const movies = await fetchMovies();

// Router
const router = new Router();
switch (router.getRoute()) {
  case '/client/':
    {
      // Slider
      const slider = new Slider();
      slider.initSettings();
      slider.addSlides(movies);

      // Grid
      const render = new Render();

      // Filtering
      // const filtering = new Filtering();
    }
    break;

  case '/single.html':
    {
      // Single Movies
      const singleMovie = new SingleMovie();
      singleMovie.getSingleMovieData(movies);
    }
    break;

  case '/search.html':
    {
      // Search
      const search = new Search();
    }
    break;
}
// Watchlist
const watchlist = new Watchlist();
