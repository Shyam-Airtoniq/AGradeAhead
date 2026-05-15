/* ============================================================
   A Grade Ahead — Site Behavior
   Shared across all pages. Each block guards for missing elements
   so this script is safe to include on any page (not all pages
   will have every component).
   ============================================================ */

// Header scroll effect
(function () {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
  });
})();

// Primary nav toggle — Bootstrap-style: one <ul> for all viewports.
// Hamburger toggles a `.nav-open` class on the header that expands
// the collapsed nav panel under the header bar on mobile.
(function () {
  const toggle = document.getElementById('navToggle');
  const header = document.getElementById('header');
  if (!toggle || !header) return;

  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when a nav link is clicked (mobile dropdown)
  header.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Scroll animations (IntersectionObserver) — adds .visible to .animate-on-scroll
(function () {
  const targets = document.querySelectorAll('.animate-on-scroll');
  if (!targets.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  targets.forEach(el => observer.observe(el));
})();

// Parallax on .image-break__img
(function () {
  const imageBreak = document.querySelector('.image-break__img');
  if (!imageBreak) return;
  window.addEventListener('scroll', () => {
    const rect = imageBreak.parentElement.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset = (progress - 0.5) * 60;
      imageBreak.style.transform = `translateY(${offset}px)`;
    }
  });
})();

// Floating kid illustrations (drift) — sweeps across .drift-container sections
(function () {
  if (window.innerWidth <= 768) return;
  const containers = document.querySelectorAll('.drift-container');
  if (!containers.length) return;

  const driftImages = [
    'agradeahead-assets/girl-sitting-with-book-transparent.png',
    'agradeahead-assets/boy-with-book-pencil-transparent.png',
    'agradeahead-assets/boy-reading-at-desk-transparent.png',
    'agradeahead-assets/girl-using-tablet-transparent.png',
    'agradeahead-assets/kid-doing-homework-transparent.png',
    'agradeahead-assets/kid-reading-books-transparent.png'
  ];

  // Default rotating pattern; sections cycle through these layouts in order.
  const driftLayouts = [
    [
      { img: 0, side: 'left',  top: 8,  size: 220, speed: 8 },
      { img: 1, side: 'right', top: 55, size: 200, speed: 6 },
    ],
    [
      { img: 5, side: 'right', top: 5,  size: 260, speed: 10 },
      { img: 3, side: 'left',  top: 60, size: 200, speed: 7 },
    ],
    [
      { img: 2, side: 'left',  top: 10, size: 180, speed: 6 },
      { img: 4, side: 'right', top: 50, size: 220, speed: 9 },
    ]
  ];

  function createDriftElements() {
    containers.forEach((container, ci) => {
      const layout = driftLayouts[ci % driftLayouts.length];
      layout.forEach(item => {
        const el = document.createElement('div');
        el.className = 'drift-el';

        const img = document.createElement('img');
        img.src = driftImages[item.img];
        img.alt = '';
        img.loading = 'lazy';
        el.appendChild(img);

        el.style.width = item.size + 'px';
        el.style.height = item.size + 'px';
        el.style.top = item.top + '%';
        el.style.opacity = '0';

        if (item.side === 'right') {
          el.style.right = '-' + (item.size + 20) + 'px';
          el.dataset.dir = '-1';
        } else {
          el.style.left = '-' + (item.size + 20) + 'px';
          el.dataset.dir = '1';
        }
        el.dataset.speed = item.speed;
        el.dataset.size = item.size;

        container.appendChild(el);
      });
    });
  }

  function updateDriftElements() {
    const drifts = document.querySelectorAll('.drift-el');
    const wh = window.innerHeight;

    drifts.forEach(el => {
      const container = el.parentElement;
      const rect = container.getBoundingClientRect();

      if (rect.top < wh && rect.bottom > 0) {
        const progress = Math.min(Math.max((wh - rect.top) / (wh + rect.height), 0), 1);
        const dir = parseFloat(el.dataset.dir);
        const size = parseFloat(el.dataset.size);

        const maxDrift = size + window.innerWidth * 0.18;
        const translateX = progress * maxDrift * dir;
        const translateY = (progress - 0.5) * 30;

        let opacity;
        if (progress < 0.1) {
          opacity = progress / 0.1;
        } else if (progress > 0.7) {
          opacity = (1 - progress) / 0.3;
        } else {
          opacity = 1;
        }
        opacity *= 0.35;

        el.style.transform = `translate(${translateX}px, ${translateY}px)`;
        el.style.opacity = Math.max(0, opacity);
      } else {
        el.style.opacity = '0';
      }
    });
  }

  createDriftElements();
  window.addEventListener('scroll', updateDriftElements, { passive: true });
  updateDriftElements();
})();

// Hero video is now rendered directly in the HTML markup
// (<video poster="..."> inside #hero-video-bg) so the WordPress dev
// can inject src + poster per-page via PHP/ACF. No JS needed for it.
