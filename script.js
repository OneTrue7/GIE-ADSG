const header = document.getElementById('header');

function majEntete() {
  header.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', majEntete);
majEntete();

const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const ouvert = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', ouvert);
});

nav.querySelectorAll('a').forEach(lien =>
  lien.addEventListener('click', () => nav.classList.remove('open'))
);

const observateur = new IntersectionObserver((elements) => {
  elements.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      observateur.unobserve(el.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observateur.observe(el));

const observateurChiffres = new IntersectionObserver((elements) => {
  elements.forEach(e => {
    if (!e.isIntersecting) return;

    const el = e.target;
    const cible = +el.dataset.count;
    let n = 0;
    const pas = Math.max(1, Math.round(cible / 30));

    const minuteur = setInterval(() => {
      n = Math.min(cible, n + pas);
      el.textContent = n;
      if (n === cible) clearInterval(minuteur);
    }, 40);

    observateurChiffres.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll('[data-count]').forEach(c => observateurChiffres.observe(c));