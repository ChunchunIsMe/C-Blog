const ele = document.getElementById('img')
function cb(entries) {
  entries.forEach(entry => {
    const target = entry.target;
    if (entry.isIntersecting) {
      target.setAttribute('src', '../img/q.jpg')
      observer.unobserve(ele);
    }
  });
}

let observerConfig = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
}

const observer = new IntersectionObserver(cb, observerConfig)
const box = document.getElementById('#box')
observer.observe(ele);