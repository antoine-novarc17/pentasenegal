/* =========================================================
   PENTA SÉNÉGAL — script.js
   Chaque section ci-dessous est indépendante :
   vous pouvez éditer les produits ou les textes sans
   toucher au reste du fichier.
   ========================================================= */

/* ---------- Année automatique dans le pied de page ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Menu mobile ---------- */
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Ferme le menu mobile une fois un lien cliqué
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});



/* =========================================================
   CARROUSEL DE PHOTOS
   Fonctionne avec n'importe quel nombre de .slide dans
   #carousel-track : ajoutez ou retirez des slides dans le
   HTML, le script s'adapte automatiquement.
   ========================================================= */
const track = document.getElementById('carousel-track');
const slides = Array.from(track.children);
console.log("Nombre de slides :", slides.length);
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const dotsWrap = document.getElementById('carousel-dots');

let current = 0;

// Génère un point de navigation par slide
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Aller à la photo ${i + 1}`);
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(dot);
});
const dots = Array.from(dotsWrap.children);

function goTo(index) {
  current = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

// Défilement automatique, mis en pause au survol
let autoplay = setInterval(() => goTo(current + 1), 5000);
const carousel = document.getElementById('carousel');
carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
carousel.addEventListener('mouseleave', () => {
  autoplay = setInterval(() => goTo(current + 1), 5000);
});

/* =========================================================
   FORMULAIRE DE CONTACT
   Actuellement affiche juste un message de confirmation.
   Pour envoyer réellement les messages, reliez ce formulaire
   à votre service d'e-mail (ex: Formspree, EmailJS) ou à
   votre back-end, en remplaçant le contenu de cette fonction.
   ========================================================= */
const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formNote.textContent = 'Merci, votre message a bien été enregistré. Notre équipe vous recontacte rapidement.';
  contactForm.reset();
});
