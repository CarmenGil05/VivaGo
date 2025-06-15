const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');

let index = 0; // índice del slide actual
let interval; // variable para el intervalo de autoplay

// Clonamos el primer y último slide para crear un efecto de bucle infinito en el carrusel
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);
track.appendChild(firstSlideClone);
track.insertBefore(lastSlideClone, slides[0]);

const allSlides = document.querySelectorAll('.carousel-slide'); // Actualizamos la lista para incluir los clones

// Actualiza la posición del carrusel, con o sin animación
function updateCarousel(instant = false) {
  const slideWidth = allSlides[0].offsetWidth;
  track.style.transition = instant ? 'none' : 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${(index + 1) * slideWidth}px)`; // +1 por el clon inicial
}

function nextSlide() {
  index++;
  updateCarousel();
  // Si llegamos al final real, saltamos al principio sin animación para mantener el bucle
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
  // Si llegamos al principio real, saltamos al final sin animación para mantener el bucle
  if (index < 0) {
    setTimeout(() => {
      index = allSlides.length - 3;
      updateCarousel(true);
    }, 500);
  }
}

// Inicia el autoplay del carrusel (cambia slide cada 3 segundos)
function startAutoPlay() {
  interval = setInterval(nextSlide, 3000);
}

// Reinicia el autoplay (para que no se solapen intervalos)
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

// Ajusta la posición del carrusel al cambiar el tamaño de la ventana
window.addEventListener('resize', () => updateCarousel(true));

// Inicializa carrusel y autoplay al cargar la página
window.addEventListener('load', () => {
  updateCarousel(true);
  startAutoPlay();

  // Añade alertas al botón de reserva para mostrar confirmación sin recargar
  const reserveButtons = document.querySelectorAll('.viaje-form button');
  reserveButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert("¡Reserva realizada con éxito! Gracias por elegirnos 🌍✈️");
    });
  });
});
