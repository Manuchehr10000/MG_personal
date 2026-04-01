/* ========================================
   ghafforzoda.net — Main Script
   ======================================== */

(function () {
  'use strict';

  // ---- Constants ----
  const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxumLXTJHeXgTb56GCOaB_RJ_HrtzWwIuaKYU7xTvewW7TMjgJm0bKd-MIqA0z9RAkR1Q/exec';

  // ---- State ----
  let currentLang = 'ru';

  // ---- DOM Ready ----
  document.addEventListener('DOMContentLoaded', function () {
    loadClients();
    initLanguageToggle();
    initNavScroll();
    initMobileMenu();
    initContactForm();
    initRevealAnimations();
    // Trigger hero reveals immediately
    triggerHeroReveals();
  });

  // ========================================
  // CLIENTS — Load from JSON
  // ========================================
  async function loadClients() {
    try {
      const res = await fetch('/data/clients.json');
      const data = await res.json();
      const container = document.getElementById('clients-logos');
      if (!container) return;

      const clients = data.clients
        .filter(function (c) { return c.visible; })
        .sort(function (a, b) { return a.order - b.order; });

      clients.forEach(function (client) {
        var el = document.createElement('img');
        el.className = 'client-logo';
        el.src = client.logo;
        el.alt = client['name_' + currentLang];
        el.setAttribute('title', client['name_' + currentLang]);
        el.setAttribute('data-name-en', client.name_en);
        el.setAttribute('data-name-ru', client.name_ru);
        el.loading = 'lazy';
        container.appendChild(el);
      });
    } catch (e) {
      // Silent fail — logos simply won't appear
    }
  }

  // ========================================
  // LANGUAGE TOGGLE
  // ========================================
  function initLanguageToggle() {
    var buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = this.getAttribute('data-lang');
        setLanguage(lang);
      });
    });
  }

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Toggle body class
    if (lang === 'en') {
      document.body.classList.add('lang-en');
    } else {
      document.body.classList.remove('lang-en');
    }

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Update client logo alt/title text
    document.querySelectorAll('.client-logo').forEach(function (el) {
      var name = el.getAttribute('data-name-' + lang);
      if (name) {
        el.alt = name;
        el.setAttribute('title', name);
      }
    });

    // Update page title
    if (lang === 'ru') {
      document.title = 'Манучехр Гаффорзода — Консультант по аналитике данных и ИИ';
    } else {
      document.title = 'Manuchehr Ghafforzoda — Data Analytics & AI Consultant';
    }

    // Close mobile menu on language switch
    closeMobileMenu();
  }

  // ========================================
  // NAV SCROLL BEHAVIOR
  // ========================================
  function initNavScroll() {
    var nav = document.getElementById('nav');
    var scrollThreshold = 50;

    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial check
  }

  // ========================================
  // MOBILE MENU
  // ========================================
  function initMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('mobile-open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMobileMenu();
      });
    });
  }

  function closeMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');
    hamburger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
  }

  // ========================================
  // CONTACT FORM
  // ========================================
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    // Add invisible placeholder for floating labels
    form.querySelectorAll('input:not([type="hidden"]):not([name="website"]), textarea').forEach(function (input) {
      if (!input.getAttribute('placeholder')) {
        input.setAttribute('placeholder', ' ');
      }
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      var status = document.getElementById('form-status');
      var button = form.querySelector('button[type="submit"]');
      var originalButtonHTML = button.innerHTML;

      button.disabled = true;
      button.innerHTML =
        '<span class="lang-en">Sending...</span>' +
        '<span class="lang-ru">Отправка...</span>';
      // Re-apply language visibility
      if (document.body.classList.contains('lang-ru')) {
        button.querySelector('.lang-en').style.display = 'none';
        button.querySelector('.lang-ru').style.display = 'inline';
      }
      status.textContent = '';
      status.className = 'contact-form__status';

      var payload = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
        website: form.website.value,
        language: document.documentElement.lang || 'en'
      };

      try {
        var response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: { 'Content-Type': 'text/plain' }
        });

        var result = await response.json();

        if (result.status === 'success') {
          status.className = 'contact-form__status success';
          if (currentLang === 'ru') {
            status.textContent = 'Сообщение отправлено!';
          } else {
            status.textContent = 'Message sent!';
          }
          form.reset();
        } else {
          throw new Error(result.message || 'Unknown error');
        }
      } catch (err) {
        status.className = 'contact-form__status error';
        if (currentLang === 'ru') {
          status.textContent = 'Ошибка. Напишите на manuchehr@ghafforzoda.net напрямую.';
        } else {
          status.textContent = 'Error. Please email manuchehr@ghafforzoda.net directly.';
        }
      } finally {
        button.disabled = false;
        button.innerHTML = originalButtonHTML;
      }
    });
  }

  // ========================================
  // REVEAL ANIMATIONS (IntersectionObserver)
  // ========================================
  function initRevealAnimations() {
    var reveals = document.querySelectorAll('.reveal:not(.visible)');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything
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
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  function triggerHeroReveals() {
    // Small delay then reveal hero elements with stagger (handled via CSS transition-delay)
    setTimeout(function () {
      document.querySelectorAll('.hero .reveal').forEach(function (el) {
        el.classList.add('visible');
      });
    }, 100);
  }

  // ========================================
  // UTILITIES
  // ========================================
  function escapeHTML(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function formatDate(dateStr, lang) {
    try {
      var date = new Date(dateStr + 'T00:00:00');
      var options = { month: 'long', day: 'numeric' };
      return date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', options);
    } catch (e) {
      return dateStr;
    }
  }

})();
