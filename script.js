// Carrusel simple funcional
let currentSlide = 0;

const carousel = document.querySelector(".carousel-track");
const slides = ["Tour 1", "Tour 2", "Tour 3"];

function updateCarousel() {
  carousel.textContent = slides[currentSlide];
}

// Botones
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Inicializar carrusel
updateCarousel();
