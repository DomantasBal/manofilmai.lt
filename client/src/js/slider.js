import movies from './mockMovies.js';

// ################### SLIDER ###################
class Slider {
  constructor() {
    this.slider = document.querySelector('.swiper-wrapper');
  }

  addSlides() {
    movies.forEach((movie) => {
      this.slider.innerHTML += `
          <div class="swiper-slide">
        <a href="/client/src/filmas.html">
          <img
            src="${movie.poster}"
            alt=""
          />
        </a>
        <p class="movie-title slide-title">${movie.title}</p>
        <div class="movie-rating slider-rating">
          <i class="fas fa-star text-secondary"></i> ${movie.rating} / 10
        </div>
      </div>
          `;
    });
  }

  initSettings() {
    const swiper = new Swiper('.swiper', {
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 1,
        },
        700: {
          slidesPerView: 2,
        },
        900: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
        1600: {
          slidesPerView: 6,
        },
      },
    });
  }
}

export default Slider;
