(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasAnime = typeof anime === 'object' && typeof anime.animate === 'function';

  if (!prefersReduced) {
    document.documentElement.classList.add('js-anim');
  }

  /* Sticky header hairline */
  var header = document.getElementById('header');
  function onScrollHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ═══ ENTRY HERO ANIMATIONS (Anime.js v4.5.0) ═══ */
  var chars = document.querySelectorAll('.hero__name .char[data-char]');
  var heroReveals = document.querySelectorAll('.hero .hero-reveal');
  var heroPortrait = document.getElementById('hero-portrait');

  if (!prefersReduced && hasAnime) {
    var tl = anime.createTimeline({
      defaults: { ease: 'outExpo' }
    });

    if (chars.length) {
      tl.add(chars, {
        translateY: ['110%', '0%'],
        duration: 800,
        delay: anime.stagger(36, { start: 80 })
      }, 0);
    }

    if (heroReveals.length) {
      tl.add(heroReveals, {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 650,
        delay: anime.stagger(70)
      }, 160);
    }

    if (heroPortrait) {
      tl.add(heroPortrait, {
        opacity: [0, 1],
        translateY: [18, 0],
        scale: [0.98, 1],
        duration: 850
      }, 120);
    }

    /* Subtle inertial cursor follow on hero portrait (desktop fine pointers only) */
    var heroSection = document.getElementById('top');
    if (
      heroPortrait &&
      heroSection &&
      typeof anime.createAnimatable === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      var portraitMotion = anime.createAnimatable(heroPortrait, {
        translateX: 450,
        translateY: 450,
        rotateX: 450,
        rotateY: 450,
        ease: 'outQuad'
      });

      heroSection.addEventListener('mousemove', function (e) {
        var rect = heroSection.getBoundingClientRect();
        var nx = (e.clientX - rect.left) / rect.width - 0.5;
        var ny = (e.clientY - rect.top) / rect.height - 0.5;

        portraitMotion.translateX(nx * 10);
        portraitMotion.translateY(ny * 8);
        portraitMotion.rotateY(nx * 3.5);
        portraitMotion.rotateX(-ny * 3.5);
      });

      heroSection.addEventListener('mouseleave', function () {
        portraitMotion.translateX(0);
        portraitMotion.translateY(0);
        portraitMotion.rotateX(0);
        portraitMotion.rotateY(0);
      });
    }
  }

  /* ═══ SUB-SECTION SCROLL REVEALS ═══ */
  var revealItems = document.querySelectorAll('.reveal');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) {
      el.classList.add('is-in');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  function revealElement(el) {
    if (el.classList.contains('is-in')) return;
    el.classList.add('is-in');
    if (hasAnime) {
      anime.animate(el, {
        opacity: [0, 1],
        translateY: [14, 0],
        duration: 560,
        ease: 'outCubic'
      });
    } else {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
  }

  function revealInViewport() {
    var thresholdY = window.innerHeight * 1.02;
    revealItems.forEach(function (el) {
      if (el.classList.contains('is-in')) return;
      var rect = el.getBoundingClientRect();
      if (rect.top < thresholdY) {
        io.unobserve(el);
        revealElement(el);
      }
    });
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      revealElement(entry.target);
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -4% 0px' });

  revealItems.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.02) {
      revealElement(el);
    } else {
      io.observe(el);
    }
  });

  window.addEventListener('scroll', revealInViewport, { passive: true });
  window.addEventListener('hashchange', function () {
    setTimeout(revealInViewport, 50);
  });
  window.addEventListener('resize', revealInViewport, { passive: true });
})();
