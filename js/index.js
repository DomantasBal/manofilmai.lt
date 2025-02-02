import movies from './mockMovies.js'; // MockDATA
import Render from './render.js';
import Slider from './slider.js';
import Filtering from './filtering.js';
import Watchlist from './watchList.js';
import SingleMovie from './singleMovie.js';
import Search from './search.js';

import Router from './router.js';
const router = new Router();

console.log('index.js');

switch (router.getRoute()) {
  case '/':
    {
      // Slider
      const slider = new Slider();
      slider.initSettings();
      slider.addSlides(movies);

      // Grid
      const render = new Render();

      // Filtering
      const filtering = new Filtering();
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
      const search = new Search();
    }
    break;
}
// Watchlist
const watchlist = new Watchlist();
