// ################### SLIDER ###################
class Slider {
  constructor() {
    this.slider = document.querySelector('.swiper-wrapper');
  }

  addSlides(movies) {
    movies.forEach((movie) => {
      this.slider.innerHTML += `
          <div class="swiper-slide">
        <a href="/single.html?id=${movie.id}">
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
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 25,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className}">${index + 1}</span>`;
        },
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        480: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1440: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        1920: {
          slidesPerView: 7,
          slidesPerGroup: 7,
        },

        2560: {
          slidesPerView: 8,
          slidesPerGroup: 8,
        },
      },
    });
  }
}

export default Slider;
