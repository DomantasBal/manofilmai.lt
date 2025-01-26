import movies from './mockMovies.js'; // MockDATA
import Render from './render.js';
import Slider from './slider.js';
import Filtering from './filtering.js';
import Watchlist from './watchList.js';

// Slider
const slider = new Slider();
slider.initSettings();
slider.addSlides();

// Grid
const render = new Render();
render.movieGrid(movies);

// Filtering
const filtering = new Filtering();

// Watchlist
const watchlist = new Watchlist();
