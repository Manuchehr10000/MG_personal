/* ========================================
   Courses Landing Page — Load & Render
   ======================================== */

(function () {
  'use strict';

  var WHATSAPP_ICON = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  document.addEventListener('DOMContentLoaded', function () {
    loadCoursesPage();
  });

  async function loadCoursesPage() {
    try {
      var res = await fetch('/data/courses.json');
      var data = await res.json();
      var container = document.getElementById('courses-container');
      if (!container) return;

      var courses = data.courses
        .filter(function (c) { return c.visible; })
        .sort(function (a, b) { return a.order - b.order; });

      var html = '';
      courses.forEach(function (course) {
        html += renderCourseCard(course);
      });

      container.innerHTML = html;

      initAccordions();
      // Re-init reveal for dynamically added elements
      if (typeof initRevealAnimations === 'function') {
        // initRevealAnimations is in main.js IIFE, so we trigger manually
      }
      // Trigger reveals on dynamic content
      triggerReveals();
    } catch (e) {
      // Silent fail
    }
  }

  function renderCourseCard(course) {
    var isFeatured = course.featured;
    var hasDetails = course.description_en || course.outcomes_en.length > 0;
    var isUpcoming = course.status === 'upcoming';
    var cardClass = 'course-card reveal' + (isFeatured ? ' course-card--featured' : '');

    // Status tag
    var statusTag = '';
    if (course.status === 'enrolling') {
      statusTag =
        '<span class="course-card__tag course-card__tag--enrolling">' +
          '<span class="lang-en">Enrolling</span>' +
          '<span class="lang-ru">Набор открыт</span>' +
        '</span>';
    } else if (course.status === 'upcoming') {
      statusTag =
        '<span class="course-card__tag course-card__tag--upcoming">' +
          '<span class="lang-en">Coming soon</span>' +
          '<span class="lang-ru">Скоро</span>' +
        '</span>';
    }

    // Duration
    var duration = '';
    if (course.duration_hours) {
      duration =
        '<span class="course-card__duration">' +
          '<span class="lang-en">' + course.duration_hours + ' hours</span>' +
          '<span class="lang-ru">' + course.duration_hours + ' часов</span>' +
        '</span>';
    }

    // Location
    var location = '';
    if (course.location_en || course.location_ru) {
      location =
        '<span class="course-card__location">' +
          '<span class="lang-en">Location: ' + esc(course.location_en) + '</span>' +
          '<span class="lang-ru">Место: ' + esc(course.location_ru) + '</span>' +
        '</span>';
    }

    // Price
    var price = '';
    if (course.price) {
      price = '<span class="course-card__price">' + esc(course.price) + '</span>';
    }

    // Tagline
    var tagline = '';
    if (course.tagline_en || course.tagline_ru) {
      tagline =
        '<p class="course-card__tagline">' +
          '<span class="lang-en">' + esc(course.tagline_en) + '</span>' +
          '<span class="lang-ru">' + esc(course.tagline_ru) + '</span>' +
        '</p>';
    }

    // Description in header for upcoming courses without details
    var upcomingNote = '';
    if (isUpcoming && course.description_en) {
      upcomingNote =
        '<p class="course-card__upcoming-note">' +
          '<span class="lang-en">' + esc(course.description_en) + '</span>' +
          '<span class="lang-ru">' + esc(course.description_ru) + '</span>' +
        '</p>';
    }

    // More button
    var toggleBtn = '';
    if (hasDetails && !isUpcoming) {
      toggleBtn =
        '<button class="course-card__toggle" data-target="details-' + course.id + '">' +
          '<span class="lang-en">More</span>' +
          '<span class="lang-ru">Подробнее</span>' +
          ' <span class="course-card__toggle-arrow">&#9660;</span>' +
        '</button>';
    }

    // Expandable details
    var details = '';
    if (hasDetails && !isUpcoming) {
      details = '<div class="course-card__details" id="details-' + course.id + '">' +
        '<div class="course-card__details-inner">' +
          renderDetails(course) +
        '</div>' +
      '</div>';
    }

    return (
      '<div class="' + cardClass + '">' +
        '<div class="course-card__header">' +
          '<div class="course-card__top">' +
            '<h2 class="course-card__name">' +
              '<span class="lang-en">' + esc(course.name_en) + '</span>' +
              '<span class="lang-ru">' + esc(course.name_ru) + '</span>' +
            '</h2>' +
            '<div class="course-card__meta">' +
              statusTag + duration + location + price +
            '</div>' +
          '</div>' +
        '</div>' +
        tagline +
        upcomingNote +
        toggleBtn +
        details +
      '</div>'
    );
  }

  function renderDetails(course) {
    var sections = '';

    // What it is
    if (course.description_en) {
      sections +=
        '<div class="course-detail">' +
          '<div class="course-detail__label">' +
            '<span class="lang-en">What it is</span>' +
            '<span class="lang-ru">Что это</span>' +
          '</div>' +
          '<p class="course-detail__text">' +
            '<span class="lang-en">' + esc(course.description_en) + '</span>' +
            '<span class="lang-ru">' + esc(course.description_ru) + '</span>' +
          '</p>' +
        '</div>';
    }

    // Who it's for
    if (course.who_en) {
      sections +=
        '<div class="course-detail">' +
          '<div class="course-detail__label">' +
            '<span class="lang-en">Who it\'s for</span>' +
            '<span class="lang-ru">Для кого</span>' +
          '</div>' +
          '<p class="course-detail__text">' +
            '<span class="lang-en">' + esc(course.who_en) + '</span>' +
            '<span class="lang-ru">' + esc(course.who_ru) + '</span>' +
          '</p>' +
        '</div>';
    }

    // Outcomes
    if (course.outcomes_en && course.outcomes_en.length > 0) {
      var listEN = '<ul class="course-detail__list lang-en">';
      course.outcomes_en.forEach(function (item) {
        listEN += '<li>' + esc(item) + '</li>';
      });
      listEN += '</ul>';

      var listRU = '<ul class="course-detail__list lang-ru">';
      course.outcomes_ru.forEach(function (item) {
        listRU += '<li>' + esc(item) + '</li>';
      });
      listRU += '</ul>';

      sections +=
        '<div class="course-detail">' +
          '<div class="course-detail__label">' +
            '<span class="lang-en">What you\'ll learn</span>' +
            '<span class="lang-ru">Чему научитесь</span>' +
          '</div>' +
          listEN + listRU +
        '</div>';
    }

    // Differentiator
    if (course.differentiator_en) {
      sections +=
        '<div class="course-detail">' +
          '<p class="course-detail__highlight">' +
            '<span class="lang-en">' + esc(course.differentiator_en) + '</span>' +
            '<span class="lang-ru">' + esc(course.differentiator_ru) + '</span>' +
          '</p>' +
        '</div>';
    }

    // Format
    if (course.format_en) {
      sections +=
        '<div class="course-detail">' +
          '<div class="course-detail__label">' +
            '<span class="lang-en">Format</span>' +
            '<span class="lang-ru">Формат</span>' +
          '</div>' +
          '<p class="course-detail__text">' +
            '<span class="lang-en">' + esc(course.format_en) + '</span>' +
            '<span class="lang-ru">' + esc(course.format_ru) + '</span>' +
          '</p>' +
        '</div>';
    }

    // CTA
    if (course.cta_link) {
      sections +=
        '<div class="course-card__cta">' +
          '<a href="' + esc(course.cta_link) + '" class="btn btn--whatsapp" target="_blank" rel="noopener">' +
            WHATSAPP_ICON +
            '<span class="lang-en">' + esc(course.cta_en) + '</span>' +
            '<span class="lang-ru">' + esc(course.cta_ru) + '</span>' +
          '</a>' +
          '<p class="course-card__cta-note">' +
            '<span class="lang-en">Write to me and I\'ll send payment details</span>' +
            '<span class="lang-ru">Напишите мне, и я пришлю реквизиты</span>' +
          '</p>' +
        '</div>';
    }

    // Instructor
    if (course.instructor_en) {
      sections +=
        '<p class="course-card__instructor">' +
          '<span class="lang-en">' + esc(course.instructor_en) + '</span>' +
          '<span class="lang-ru">' + esc(course.instructor_ru) + '</span>' +
        '</p>';
    }

    return sections;
  }

  // ========================================
  // ACCORDION
  // ========================================
  function initAccordions() {
    document.querySelectorAll('.course-card__toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = this.getAttribute('data-target');
        var details = document.getElementById(targetId);
        if (!details) return;

        var isOpen = details.classList.contains('open');

        if (isOpen) {
          // Close
          details.style.maxHeight = details.scrollHeight + 'px';
          // Force reflow
          details.offsetHeight;
          details.style.maxHeight = '0';
          details.classList.remove('open');
          this.classList.remove('open');
          // Update button text
          updateToggleText(this, false);
        } else {
          // Open
          details.classList.add('open');
          details.style.maxHeight = details.scrollHeight + 'px';
          this.classList.add('open');
          updateToggleText(this, true);
          // After transition, remove fixed max-height so content can resize
          details.addEventListener('transitionend', function handler() {
            if (details.classList.contains('open')) {
              details.style.maxHeight = 'none';
            }
            details.removeEventListener('transitionend', handler);
          });
        }
      });
    });
  }

  function updateToggleText(btn, isOpen) {
    var enSpan = btn.querySelector('.lang-en');
    var ruSpan = btn.querySelector('.lang-ru');
    if (isOpen) {
      if (enSpan) enSpan.textContent = 'Less';
      if (ruSpan) ruSpan.textContent = 'Свернуть';
    } else {
      if (enSpan) enSpan.textContent = 'More';
      if (ruSpan) ruSpan.textContent = 'Подробнее';
    }
  }

  // ========================================
  // REVEAL (standalone for this page)
  // ========================================
  function triggerReveals() {
    var reveals = document.querySelectorAll('.reveal:not(.visible)');
    if (!reveals.length) return;

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
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  function esc(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

})();
