const feed = document.querySelector('.listing-feed');
const demoQuery = document.getElementById('demo-query');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function arriveListing() {
  const leaving = feed.lastElementChild;
  if (!leaving) return;
  const arriving = leaving.cloneNode(true);
  arriving.classList.remove('is-arriving');
  feed.prepend(arriving);
  leaving.remove();
  void arriving.offsetWidth;
  arriving.classList.add('is-arriving');
  if (demoQuery.textContent !== arriving.dataset.query) {
    demoQuery.textContent = arriving.dataset.query;
    demoQuery.classList.remove('is-changing');
    void demoQuery.offsetWidth;
    demoQuery.classList.add('is-changing');
  }
}
if (feed && !reduceMotion) window.setInterval(arriveListing, 3200);
const menu = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Открыть меню');
  mobileNav.hidden = true;
}
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  menu.setAttribute('aria-label', expanded ? 'Закрыть меню' : 'Открыть меню');
  mobileNav.hidden = !expanded;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menu.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 651px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
