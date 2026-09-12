(function () {
  'use strict';

  var root = document.documentElement;
  var toggle = document.querySelector('[data-theme-toggle]');

  var SUN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/></svg>';
  var MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';

  var mode = 'dark';
  function applyTheme() {
    root.setAttribute('data-theme', mode);
    if (!toggle) return;
    toggle.innerHTML = mode === 'dark' ? SUN : MOON;
    toggle.setAttribute('aria-label', 'Switch to ' + (mode === 'dark' ? 'light' : 'dark') + ' mode');
  }
  applyTheme();

  if (toggle) {
    toggle.addEventListener('click', function () {
      mode = mode === 'dark' ? 'light' : 'dark';
      applyTheme();
    });
  }

  /* Sticky header hairline */
  var header = document.getElementById('header');
  function onScrollHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ═══ UNIVERSAL ANIME.JS (v4 / v3) COMPATIBILITY ═══ */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function safeAnimate(targets, params) {
    if (prefersReduced || typeof anime === 'undefined') return;
    try {
      if (typeof anime === 'object' && typeof anime.animate === 'function') {
        return anime.animate(targets, params);
      }
      if (typeof anime === 'function') {
        var opt = Object.assign({}, params, { targets: targets });
        return anime(opt);
      }
    } catch (e) {
      console.warn('Animation notice:', e);
    }
  }

  function safeTimeline(params) {
    if (prefersReduced || typeof anime === 'undefined') return null;
    try {
      if (typeof anime === 'object' && typeof anime.createTimeline === 'function') {
        return anime.createTimeline(params);
      }
      if (typeof anime === 'function' && typeof anime.timeline === 'function') {
        return anime.timeline(params);
      }
    } catch (e) {
      console.warn('Timeline notice:', e);
    }
    return null;
  }

  function safeStagger(val, opt) {
    try {
      if (typeof anime === 'object' && typeof anime.stagger === 'function') {
        return anime.stagger(val, opt);
      }
      if (typeof anime === 'function' && typeof anime.stagger === 'function') {
        return anime.stagger(val, opt);
      }
    } catch (e) {}
    return function (el, i) { return (opt && opt.start ? opt.start : 0) + i * val; };
  }

  /* ═══ 144-FRAME INTERACTIVE SCROLL HERO ENGINE ═══ */
  var canvas = document.getElementById('hero-canvas');
  var runway = document.querySelector('.hero-runway');
  var loadingEl = document.getElementById('canvas-loading');
  var loadingTxt = document.getElementById('canvas-loading-txt');
  var frameCounter = document.getElementById('frame-counter');
  var scrubContainer = document.getElementById('scrub-container');
  var scrubFill = document.getElementById('scrub-fill');
  var scrubHandle = document.getElementById('scrub-handle');
  var autoplayBtn = document.getElementById('autoplay-btn');
  var autoplayLabel = document.getElementById('autoplay-label');
  var playIcon = autoplayBtn ? autoplayBtn.querySelector('.play-icon') : null;
  var pauseIcon = autoplayBtn ? autoplayBtn.querySelector('.pause-icon') : null;
  var beats = document.querySelectorAll('.hero-beat');
  var canvasShell = document.getElementById('hero-canvas-shell');
  var hudChips = document.querySelectorAll('.hud-chip');

  var TOTAL_FRAMES = 144;
  var images = new Array(TOTAL_FRAMES);
  var loadedFrames = new Set();
  var loadedCount = 0;
  var currentProgress = 0;
  var targetProgress = 0;
  var lastDrawnFrame = -1;
  var currentBeatIndex = 1;
  var isAutoplaying = false;
  var autoplayRafId = null;
  var isDraggingScrub = false;

  var ctx = canvas ? canvas.getContext('2d', { alpha: false }) : null;

  function pad(num, size) {
    var s = '0000' + num;
    return s.substr(s.length - size);
  }

  function getFrameSrc(index) {
    return 'assets/hero-frames/frame_' + pad(index + 1, 4) + '.webp';
  }

  // Preload all 144 frames
  function preloadFrames() {
    for (var i = 0; i < TOTAL_FRAMES; i++) {
      (function (idx) {
        var img = new Image();
        img.onload = function () {
          loadedFrames.add(idx);
          loadedCount++;
          onFrameLoaded(idx);
        };
        img.onerror = function () {
          loadedCount++;
          if (loadingEl && loadedCount >= 8) {
            loadingEl.classList.add('is-hidden');
          }
        };
        img.src = getFrameSrc(idx);
        images[idx] = img;
      })(i);
    }
  }

  function onFrameLoaded(idx) {
    if (loadingTxt) {
      var pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      loadingTxt.textContent = 'Buffering sequence... ' + pct + '%';
    }

    // Hide loading screen once first frames are buffered
    if (loadedCount >= 8 && loadingEl && !loadingEl.classList.contains('is-hidden')) {
      loadingEl.classList.add('is-hidden');
    }

    // If this is frame 0 or the current target frame, render it right away
    var targetIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));
    if (idx === 0 && lastDrawnFrame === -1) {
      renderFrame(0);
    } else if (idx === targetIdx || Math.abs(idx - targetIdx) <= 2) {
      renderFrame(targetIdx);
    }
  }

  // Find the closest loaded frame to prevent visual blanking during fast scroll
  function getBestAvailableFrame(index) {
    if (loadedFrames.has(index)) return index;
    // Search backward first
    for (var i = index - 1; i >= 0; i--) {
      if (loadedFrames.has(i)) return i;
    }
    // Search forward
    for (var j = index + 1; j < TOTAL_FRAMES; j++) {
      if (loadedFrames.has(j)) return j;
    }
    return -1;
  }

  // Draw frame on canvas with high DPI and aspect-ratio: cover
  function renderFrame(frameIndex) {
    if (!ctx || !canvas) return;

    var actualFrame = getBestAvailableFrame(frameIndex);
    if (actualFrame === -1) return;

    var img = images[actualFrame];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var displayWidth = canvas.clientWidth || 360;
    var displayHeight = canvas.clientHeight || 640;

    var bufferW = Math.round(displayWidth * dpr);
    var bufferH = Math.round(displayHeight * dpr);

    if (canvas.width !== bufferW || canvas.height !== bufferH) {
      canvas.width = bufferW;
      canvas.height = bufferH;
    }

    var iw = img.naturalWidth;
    var ih = img.naturalHeight;
    var scale = Math.max(bufferW / iw, bufferH / ih);
    var nw = iw * scale;
    var nh = ih * scale;
    var nx = (bufferW - nw) / 2;
    var ny = (bufferH - nh) / 2;

    ctx.drawImage(img, nx, ny, nw, nh);
    lastDrawnFrame = actualFrame;

    // Update frame counter
    if (frameCounter) {
      frameCounter.textContent = 'FRAME ' + pad(actualFrame + 1, 3) + ' / ' + TOTAL_FRAMES;
    }
  }

  // Story Beat Switching
  function updateStoryBeats(progress) {
    var newBeat = 1;
    if (progress < 0.33) {
      newBeat = 1;
    } else if (progress < 0.67) {
      newBeat = 2;
    } else {
      newBeat = 3;
    }

    if (newBeat !== currentBeatIndex) {
      currentBeatIndex = newBeat;
      beats.forEach(function (beat) {
        var beatNum = parseInt(beat.getAttribute('data-beat'), 10);
        if (beatNum === currentBeatIndex) {
          beat.classList.add('is-active');
          safeAnimate(beat.children, {
            opacity: [0, 1],
            translateY: [16, 0],
            delay: safeStagger(35, { start: 0 }),
            duration: 400,
            easing: 'easeOutCubic'
          });
        } else {
          beat.classList.remove('is-active');
        }
      });

      // Subtle dynamic HUD highlight
      if (hudChips.length >= 3) {
        hudChips.forEach(function (chip) { chip.style.borderColor = 'rgba(200, 141, 88, 0.32)'; });
        if (newBeat === 1 && hudChips[0]) hudChips[0].style.borderColor = '#c88d58';
        if (newBeat === 2 && hudChips[1]) hudChips[1].style.borderColor = '#e8c49e';
        if (newBeat === 3 && hudChips[2]) hudChips[2].style.borderColor = '#f7f1e6';
      }
    }
  }

  // Calculate target progress from scroll position
  function updateScrollProgress() {
    if (!runway) return;
    var rect = runway.getBoundingClientRect();
    var scrollRange = runway.offsetHeight - window.innerHeight;
    if (scrollRange <= 0) return;

    var prog = -rect.top / scrollRange;
    targetProgress = Math.max(0, Math.min(1, prog));
  }

  // Continuous smooth render loop
  function loop() {
    try {
      updateScrollProgress();

      if (!isDraggingScrub && !isAutoplaying) {
        currentProgress += (targetProgress - currentProgress) * 0.18;
      }

      var frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));

      // Update scrubber bar visual on every frame
      var pct = (frameIdx / (TOTAL_FRAMES - 1)) * 100;
      if (scrubFill) scrubFill.style.width = pct + '%';
      if (scrubHandle) scrubHandle.style.left = pct + '%';

      if (frameIdx !== lastDrawnFrame) {
        renderFrame(frameIdx);
        updateStoryBeats(currentProgress);
      }
    } catch (err) {
      console.warn('Render loop notice:', err);
    }

    requestAnimationFrame(loop);
  }

  // Scrubber drag / click interaction
  function handleScrub(e) {
    if (!scrubContainer || !runway) return;
    var rect = scrubContainer.getBoundingClientRect();
    var clientX = (e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0));
    var x = clientX - rect.left;
    var frac = Math.max(0, Math.min(1, x / rect.width));

    currentProgress = frac;
    targetProgress = frac;

    var scrollRange = runway.offsetHeight - window.innerHeight;
    var targetScrollTop = runway.offsetTop + frac * scrollRange;
    window.scrollTo({ top: targetScrollTop, behavior: 'auto' });
  }

  if (scrubContainer) {
    scrubContainer.addEventListener('mousedown', function (e) {
      isDraggingScrub = true;
      if (isAutoplaying) stopAutoplay();
      handleScrub(e);
      window.addEventListener('mousemove', handleScrub);
      window.addEventListener('mouseup', onScrubUp);
    });

    scrubContainer.addEventListener('touchstart', function (e) {
      isDraggingScrub = true;
      if (isAutoplaying) stopAutoplay();
      handleScrub(e);
      window.addEventListener('touchmove', handleScrub, { passive: true });
      window.addEventListener('touchend', onScrubUp);
    }, { passive: true });

    function onScrubUp() {
      isDraggingScrub = false;
      window.removeEventListener('mousemove', handleScrub);
      window.removeEventListener('mouseup', onScrubUp);
      window.removeEventListener('touchmove', handleScrub);
      window.removeEventListener('touchend', onScrubUp);
    }

    scrubContainer.addEventListener('keydown', function (e) {
      var step = 0.05;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        currentProgress = Math.min(1, currentProgress + step);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        currentProgress = Math.max(0, currentProgress - step);
      } else {
        return;
      }
      e.preventDefault();
      var scrollRange = runway.offsetHeight - window.innerHeight;
      window.scrollTo({ top: runway.offsetTop + currentProgress * scrollRange, behavior: 'auto' });
    });
  }

  // Autoplay functionality
  function startAutoplay() {
    isAutoplaying = true;
    if (playIcon) playIcon.style.display = 'none';
    if (pauseIcon) pauseIcon.style.display = 'inline';
    if (autoplayLabel) autoplayLabel.textContent = 'Pause';

    var startTime = performance.now();
    var startProgress = currentProgress >= 0.98 ? 0 : currentProgress;
    var duration = 4800;

    function stepAutoplay(now) {
      if (!isAutoplaying) return;
      var elapsed = now - startTime;
      var t = Math.min(1, elapsed / duration);
      var nextProg = startProgress + t * (1 - startProgress);

      currentProgress = nextProg;
      targetProgress = nextProg;

      var scrollRange = runway.offsetHeight - window.innerHeight;
      window.scrollTo({ top: runway.offsetTop + nextProg * scrollRange, behavior: 'auto' });

      if (t < 1) {
        autoplayRafId = requestAnimationFrame(stepAutoplay);
      } else {
        stopAutoplay();
      }
    }
    autoplayRafId = requestAnimationFrame(stepAutoplay);
  }

  function stopAutoplay() {
    isAutoplaying = false;
    if (autoplayRafId) cancelAnimationFrame(autoplayRafId);
    if (playIcon) playIcon.style.display = 'inline';
    if (pauseIcon) pauseIcon.style.display = 'none';
    if (autoplayLabel) autoplayLabel.textContent = 'Play';
  }

  if (autoplayBtn) {
    autoplayBtn.addEventListener('click', function () {
      if (isAutoplaying) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
  }

  // Mouse parallax tilt on canvas shell & floating HUD chips
  if (canvasShell && window.matchMedia('(hover: hover)').matches) {
    canvasShell.addEventListener('mousemove', function (e) {
      var rect = canvasShell.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;

      hudChips.forEach(function (chip, i) {
        var factor = (i + 1) * 8;
        chip.style.transform = 'translate(' + (x * factor) + 'px, ' + (y * factor) + 'px)';
      });
    });

    canvasShell.addEventListener('mouseleave', function () {
      hudChips.forEach(function (chip) {
        chip.style.transform = 'translate(0, 0)';
      });
    });
  }

  window.addEventListener('scroll', function () {
    if (!isDraggingScrub && !isAutoplaying) {
      updateScrollProgress();
    }
  }, { passive: true });

  window.addEventListener('resize', function () {
    renderFrame(Math.max(0, lastDrawnFrame));
  }, { passive: true });

  // Start preloading and run loop
  preloadFrames();
  updateScrollProgress();
  loop();

  /* ═══ HERO TEXT ENTRANCE ANIMATION ═══ */
  var chars = document.querySelectorAll('.hero-beat--1 .char[data-char]');
  var reveals = document.querySelectorAll('.hero-beat--1 .hero-reveal');

  var tl = safeTimeline({ easing: 'easeOutExpo', autoplay: false });
  if (tl) {
    tl.add({
      targets: Array.from(chars),
      translateY: ['110%', '0%'],
      duration: 900,
      delay: safeStagger(45, { start: 200 })
    });

    reveals.forEach(function (el, idx) {
      tl.add({
        targets: el,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 650
      }, '-=' + (idx === 0 ? '550' : '450'));
    });

    setTimeout(function () {
      try {
        if (typeof tl.play === 'function') tl.play();
      } catch (e) {}
    }, 80);
  } else {
    chars.forEach(function (el) { el.style.transform = 'none'; });
    reveals.forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  /* ═══ SCROLL REVEAL — Sub-sections ═══ */
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  items.forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i, 8) * 55 + 'ms';
    io.observe(el);
  });
})();
