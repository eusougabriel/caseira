const filterButtons = document.querySelectorAll('[data-filter]');
const productItems = document.querySelectorAll('#productGrid [data-category]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const selected = button.dataset.filter;
    productItems.forEach((item) => {
      const show = selected === 'all' || item.dataset.category === selected;
      item.classList.toggle('hidden-product', !show);
    });
  });
});

const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = Number(entry.target.dataset.counter);
      let value = 0;
      const step = Math.max(1, Math.ceil(target / 45));

      const tick = () => {
        value += step;
        if (value >= target) {
          entry.target.textContent = `${target}+`;
        } else {
          entry.target.textContent = `${value}`;
          requestAnimationFrame(tick);
        }
      };

      tick();
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.35 }
);

counters.forEach((counter) => counterObserver.observe(counter));
