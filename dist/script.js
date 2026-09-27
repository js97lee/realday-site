const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
function closeMenu() {
  header.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', '메뉴 열기');
}
menu.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', closeMenu));
const chapterLinks = [...document.querySelectorAll('.chapter-nav a')];
if (chapterLinks.length) {
  const sections = chapterLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  let scheduled = false;
  const updateChapter = () => {
    const offset = document.querySelector('.chapter-nav').getBoundingClientRect().height + 100;
    let current = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top <= offset) current = section; });
    chapterLinks.forEach(link => {
      if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateChapter); }
  }, { passive: true });
  updateChapter();
}
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && header.classList.contains('open')) { closeMenu(); menu.focus(); }
});
document.querySelectorAll('.service-list details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (detail.open) document.querySelectorAll('.service-list details').forEach(other => { if (other !== detail) other.open = false; });
  });
});
