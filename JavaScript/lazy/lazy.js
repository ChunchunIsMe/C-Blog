function checkInWindow(dom) {
  const offset = dom.getBoundingClientRect();
  const check = ((offset.top + offset.bottom) / 2 < window.innerHeight);
  return check;
}