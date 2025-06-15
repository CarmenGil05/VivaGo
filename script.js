const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');

let index = 0;
let interval;

// Clona el primer y último slide para bucle visual
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);
track.appendChild(firstSlideClone);
track.insertBefore(lastSlideClone, slides[0]);

const allSlides = document.querySelectorAll('.carousel-slide'); // actualiza

function updateCarousel(instant = false) {
  const slideWidth = allSlides[0].offsetWidth;
  track.style.transition = instant ? 'none' : 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${(index + 1) * slideWidth}px)`; // +1 por el clon inicial
}

function nextSlide() {
  index++;
  updateCarousel();
  if (index >= allSlides.length - 2) {
    setTimeout(() => {
      index = 0;
      updateCarousel(true);
    }, 500);
  }
}

function prevSlide() {
  index--;
  updateCarousel();
  if (index < 0) {
    setTimeout(() => {
      index = allSlides.length - 3;
      updateCarousel(true);
    }, 500);
  }
}

function startAutoPlay() {
  interval = setInterval(nextSlide, 3000);
}

function restartAutoPlay() {
  clearInterval(interval);
  startAutoPlay();
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  restartAutoPlay();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  restartAutoPlay();
});

window.addEventListener('resize', () => updateCarousel(true));

window.addEventListener('load', () => {
  updateCarousel(true);
  startAutoPlay();

  // Mensaje al hacer clic en botón de reserva
  const reserveButtons = document.querySelectorAll('.viaje-form button');
  reserveButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // evitar recarga
      alert("¡Reserva realizada con éxito! Gracias por elegirnos 🌍✈️");
    });
  });
});
