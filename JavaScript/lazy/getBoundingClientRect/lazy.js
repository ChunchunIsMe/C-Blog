function checkInWindow(dom) {
  const offset = dom.getBoundingClientRect();
  const check = ((offset.top + offset.bottom) / 2 < window.innerHeight);
  return check;
}
const dom = document.getElementById('img');
function run() {
  if (checkInWindow(dom)) {
    dom.setAttribute('src', '../img/q.jpg');
    window.removeEventListener('scroll', run);
  }
}
window.addEventListener('scroll', run);