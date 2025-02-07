// ################### Server.js ###################

const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const asianLanguages = ['zh', 'ja', 'ko', 'th', 'hi', 'ta'];

app.get('/api/movies', async (req, res) => {
  try {
    const moviesResponse = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: process.env.API_KEY,
        language: 'lt-LT',
      },
    });

    let movies = moviesResponse.data.results.filter((movie) => !asianLanguages.includes(movie.original_language));
    const genresResponse = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params: {
        api_key: process.env.API_KEY,
        language: 'lt-LT',
      },
    });
    const genres = genresResponse.data.genres;
    const genreMap = {};
    genres.forEach((genre) => {
      genreMap[genre.id] = genre.name;
    });

    movies = movies.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map((id) => genreMap[id]).filter((name) => name !== undefined),
    }));

    res.json({ ...moviesResponse.data, results: movies });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.get('/api/genres', async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params: {
        api_key: process.env.API_KEY,
        language: 'lt-LT',
      },
    });
    res.json(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

app.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});
