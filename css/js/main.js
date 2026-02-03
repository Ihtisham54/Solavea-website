

// Initialize
document.addEventListener('DOMContentLoaded', () => {

  // Premium Page-Load Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully in view
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;

        // Calculate delay based on index in group if it has a dataset index
        const delay = target.dataset.delay || 0;

        setTimeout(() => {
          target.classList.add('visible');
        }, delay);

        obs.unobserve(target);
      }
    });
  }, observerOptions);

  // Select key elements to animate
  const animatedElements = document.querySelectorAll(
    'main h1, main h2, main h3, main p, .btn, .feature-item, .process-step, .industry-pill, img, li'
  );

  animatedElements.forEach((el) => {
    // Add base animation classes
    el.classList.add('animate-on-scroll', 'fade-up');

    // Auto-stagger logic for lists/grids
    // Check if element is part of a grid or list to apply stagger
    const parent = el.parentElement;
    if (parent.classList.contains('features-grid') ||
      parent.classList.contains('process-steps') ||
      parent.classList.contains('industries-list') ||
      parent.tagName === 'UL') {

      const index = Array.from(parent.children).indexOf(el);
      // 60ms stagger per item
      el.dataset.delay = index * 60;
    }

    observer.observe(el);
  });
});


// Add active class to nav links based on URL (optional since we hardcoded, but good for scalability)
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
  } else {
    // Basic fix for home path matching
    if (currentPath === '/' && link.getAttribute('href') === '/') {
      link.classList.add('active');
    }
  }
});

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

console.log('Solavea Website Loaded');


