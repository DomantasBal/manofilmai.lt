class Search {
  constructor() {
    const cardTags = document.querySelectorAll('.card-tag');
    cardTags.forEach((tag) => tag.addEventListener('click', this.searchByTag));
  }

  searchByTag() {
    window.location.href = '/search.html';
  }
}

export default Search;
