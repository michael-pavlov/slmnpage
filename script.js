const examples = {
  camera: { query: 'Плёночный фотоаппарат', title: 'Зенит-Е с объективом Гелиос-44', price: '4 500 ₽', location: 'Москва · Авито', image: 'assets/camera.svg', alt: 'Иллюстрация плёночного фотоаппарата', caption: 'ХОРОШО СОХРАНИЛСЯ. ЖДЁТ ВАС.' },
  phone: { query: 'iPhone 13 · до 30 000 ₽', title: 'iPhone 13, 128 ГБ, отличное состояние', price: '27 000 ₽', location: 'Москва · Авито', image: 'assets/phone.svg', alt: 'Иллюстрация смартфона', caption: 'НУЖНАЯ МОДЕЛЬ. ПРИЯТНАЯ ЦЕНА.' },
  car: { query: 'Volvo V60 · дизель · универсал', title: 'Volvo V60, 2.0 D, 2018', price: '2 150 000 ₽', location: 'Москва · Авито', image: 'assets/car.svg', alt: 'Иллюстрация автомобиля универсала', caption: 'ТА САМАЯ КОМПЛЕКТАЦИЯ.' }
};
document.querySelectorAll('[data-demo]').forEach(button => {
  button.addEventListener('click', () => {
    const example = examples[button.dataset.demo];
    document.querySelectorAll('[data-demo]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    for (const key of ['query', 'title', 'price', 'location']) document.getElementById(`demo-${key}`).textContent = example[key];
    const image = document.getElementById('demo-image');
    image.src = example.image;
    image.alt = example.alt;
    document.getElementById('demo-image-caption').textContent = example.caption;
    const content = document.querySelector('.listing-content');
    content.classList.remove('is-changing');
    void content.offsetWidth;
    content.classList.add('is-changing');
  });
});
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
