document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('id');

  if (movieId) {
    await displayMovieDetails(movieId);
  }
});

async function displayMovieDetails(movieId) {
  const response = await fetch('js/mockMovies.js');
  const movies = await response.json();
  console.log(movies);
}
