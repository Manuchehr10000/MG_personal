/* ========================================
   Landing Page — Language Toggle & Reveals
   ======================================== */

(function () {
  'use strict';

  // --- Language toggle ---
  var langBtns = document.querySelectorAll('.lp-lang__btn');
  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = this.getAttribute('data-lang');
      document.documentElement.lang = lang;
      document.body.classList.toggle('lang-en', lang === 'en');
      langBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // --- Reveal on scroll ---
  var reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(function (el) { observer.observe(el); });

  // --- Hero stagger ---
  var heroEls = document.querySelectorAll('.lp-hero .reveal');
  heroEls.forEach(function (el, i) {
    el.style.transitionDelay = (i * 100) + 'ms';
    el.classList.add('visible');
  });

})();
