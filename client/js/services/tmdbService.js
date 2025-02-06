export async function fetchMovies() {
  try {
    const response = await fetch('http://localhost:3000/api/movies');
    const { results } = await response.json();
    return results;
  } catch (e) {
    console.log(e);
  }
}
