// Движок анимаций: Lenis-скролл, reveal по IntersectionObserver,
// канвас-частицы, sticky-стек шагов, USP pin-swap, счётчики.
// Все эффекты уважают prefers-reduced-motion.

(function () {
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function initLenis() {
    if (prefersReducedMotion() || typeof window.Lenis !== 'function') return;
    var lenis = new window.Lenis({
      duration: 1.15,
      easing: function (t) { return 1 - Math.pow(1 - t, 4); },
      smoothWheel: true
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.__lenis = lenis;
  }

  function initAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href').slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        if (window.__lenis) {
          window.__lenis.scrollTo(target, { duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function initScrollProgress() {
    var bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    function update() {
      var el = document.documentElement;
      var max = el.scrollHeight - el.clientHeight;
      var p = max > 0 ? el.scrollTop / max : 0;
      bar.style.transform = 'scaleX(' + p + ')';
    }
    document.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initReveal() {
    var singles = document.querySelectorAll('[data-reveal]');
    var groups = document.querySelectorAll('[data-reveal-group]');
    var bars = document.querySelectorAll('.stat-bar-fill');
    var all = [].concat([].slice.call(singles), [].slice.call(groups), [].slice.call(bars));
    if (!all.length) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      all.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -5% 0px' });

    all.forEach(function (el) { observer.observe(el); });
  }

  function initCounters() {
    var els = document.querySelectorAll('[data-count-to]');
    if (!els.length) return;

    function setFinal(el) {
      el.textContent = el.getAttribute('data-count-to') + (el.getAttribute('data-suffix') || '');
    }

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach(setFinal);
      return;
    }

    function animate(el) {
      var target = parseFloat(el.getAttribute('data-count-to')) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var decimalsMatch = (el.getAttribute('data-count-to') || '').split('.')[1];
      var decimals = decimalsMatch ? decimalsMatch.length : 0;
      var duration = 1200;
      var start = null;

      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (eased * target).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    els.forEach(function (el) { observer.observe(el); });
  }

  // ---- Канвас-частицы инея в hero ----
  function initHeroCanvas() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var reduced = prefersReducedMotion();
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var w, h, particles, raf;

    function resize() {
      w = canvas.width = canvas.clientWidth * DPR;
      h = canvas.height = canvas.clientHeight * DPR;
    }

    function makeParticles() {
      var count = window.innerWidth < 768 ? 36 : 80;
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (Math.random() * 1.6 + 0.3) * DPR,
          vy: -(Math.random() * 0.3 + 0.06) * DPR,
          vx: (Math.random() - 0.5) * 0.1 * DPR,
          a: Math.random() * 0.5 + 0.12,
          c: Math.random() < 0.78 ? '95,201,217' : '180,221,99'
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        if (!reduced) {
          p.y += p.vy;
          p.x += p.vx;
          if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.c + ',' + p.a + ')';
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(frame);
    }

    resize();
    makeParticles();
    frame();

    window.addEventListener('resize', function () {
      resize();
      makeParticles();
    });
  }

  // ---- USP pin-swap: активный пункт списка подсвечивает свою иконку и фон ----
  function initUsp() {
    var items = document.querySelectorAll('.usp-item');
    var frames = document.querySelectorAll('.usp-icon-frame');
    var bgs = document.querySelectorAll('.usp-bg');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (i) { i.classList.add('is-active'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = entry.target.getAttribute('data-index');
        items.forEach(function (i) { i.classList.toggle('is-active', i === entry.target); });
        frames.forEach(function (f) { f.classList.toggle('is-active', f.getAttribute('data-index') === idx); });
        bgs.forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-index') === idx); });
      });
    }, { threshold: 0.55 });

    items.forEach(function (i) { observer.observe(i); });
  }

  // ---- Иконки USP слегка поворачиваются в 3D вслед за скроллом ----
  function initUspTilt() {
    if (prefersReducedMotion()) return;
    var section = document.querySelector('.usp');
    var desktopIcons = document.querySelectorAll('.usp-icon-frame .usp-icon-3d');
    var mobileIcons = document.querySelectorAll('.usp-icon-frame-mobile .usp-icon-3d');
    if (!section || (!desktopIcons.length && !mobileIcons.length)) return;
    var ticking = false;

    function update() {
      var vh = window.innerHeight;

      if (desktopIcons.length) {
        var rect = section.getBoundingClientRect();
        var total = rect.height - vh;
        var progress = total > 0 ? (-rect.top) / total : 0;
        progress = Math.max(0, Math.min(1, progress));
        var deg = progress * 40 - 20;
        var t = 'perspective(900px) rotateY(' + deg + 'deg) rotateX(' + (deg / 3) + 'deg)';
        desktopIcons.forEach(function (el) { el.style.transform = t; });
      }

      mobileIcons.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var center = r.top + r.height / 2;
        var p = Math.max(-1, Math.min(1, (center - vh / 2) / (vh / 2)));
        el.style.transform = 'perspective(700px) rotateY(' + (p * -20) + 'deg) rotateX(' + (p * 6) + 'deg)';
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  // ---- Sticky-стек шагов: следующая карточка "накрывает" предыдущую ----
  function initSteps() {
    var steps = document.querySelectorAll('.step');
    if (!steps.length || prefersReducedMotion()) return;
    var ticking = false;

    function update() {
      var vh = window.innerHeight;
      steps.forEach(function (step, i) {
        var next = steps[i + 1];
        var card = step.querySelector('.step-card');
        if (!card) return;
        if (!next) {
          card.style.transform = '';
          card.style.filter = '';
          return;
        }
        var rect = next.getBoundingClientRect();
        var p = 1 - Math.min(Math.max(rect.top / vh, 0), 1);
        card.style.transform = 'scale(' + (1 - p * 0.05) + ') translateY(' + (p * -16) + 'px)';
        card.style.filter = 'brightness(' + (1 - p * 0.35) + ')';
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  // ---- Отрисовка линии графика (температура) при появлении шага ----
  function initChartDraw() {
    var targets = document.querySelectorAll('[data-draw-on-view]');
    if (!targets.length) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('is-drawn'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-drawn');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    targets.forEach(function (t) { observer.observe(t); });
  }

  // ---- Автопереключение пилюли "Авто / Ручной" в мокапе устройства ----
  function initDeviceToggle() {
    var toggle = document.querySelector('.device-toggle');
    if (!toggle || prefersReducedMotion()) return;
    setInterval(function () { toggle.classList.toggle('is-on'); }, 2600);
  }

  // ---- Канвас-сеть в секции "растущий интеллект" ----
  function initIntelCanvas() {
    var canvas = document.getElementById('intel-canvas');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var reduced = prefersReducedMotion();
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var w, h, nodes, raf, running = false;

    function resize() {
      w = canvas.width = canvas.clientWidth * DPR;
      h = canvas.height = canvas.clientHeight * DPR;
    }

    var palette = ['#5FC9D9', '#B4DD63', '#9682DC'];

    function makeNodes() {
      var count = window.innerWidth < 768 ? 22 : 46;
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18 * DPR,
          vy: (Math.random() - 0.5) * 0.18 * DPR,
          r: (Math.random() * 1.4 + 1.2) * DPR,
          c: palette[i % palette.length]
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      var maxDist = Math.min(w, h) * 0.32;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (!reduced) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
        for (var j = i + 1; j < nodes.length; j++) {
          var m = nodes[j];
          var dx = n.x - m.x, dy = n.y - m.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.strokeStyle = 'rgba(95,201,217,' + (1 - dist / maxDist) * 0.35 + ')';
            ctx.lineWidth = DPR;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }
      for (var k = 0; k < nodes.length; k++) {
        var node = nodes[k];
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = node.c;
        ctx.fill();
      }
      if (!reduced && running) raf = requestAnimationFrame(frame);
    }

    resize();
    makeNodes();

    if (!('IntersectionObserver' in window)) {
      running = true;
      frame();
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !running) {
            running = true;
            frame();
          } else if (!entry.isIntersecting) {
            running = false;
            if (raf) cancelAnimationFrame(raf);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(canvas);
    }

    window.addEventListener('resize', function () {
      resize();
      makeNodes();
    });
  }

  // ---- Процедурный "видео"-фон для проблемных секций: медленные тепловые пятна ----
  function initAmbientCanvas() {
    var canvases = document.querySelectorAll('.bleed-canvas');
    if (!canvases.length) return;
    var reduced = prefersReducedMotion();
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var palette = [
      [95, 201, 217],
      [180, 221, 99],
      [150, 130, 220]
    ];

    canvases.forEach(function (canvas, ci) {
      if (!canvas.getContext) return;
      var ctx = canvas.getContext('2d');
      var w, h, blobs, raf, running = false;

      function resize() {
        w = canvas.width = canvas.clientWidth * DPR;
        h = canvas.height = canvas.clientHeight * DPR;
      }

      function makeBlobs() {
        blobs = [];
        for (var i = 0; i < 3; i++) {
          blobs.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.12 * DPR,
            vy: (Math.random() - 0.5) * 0.12 * DPR,
            r: Math.min(w, h) * (0.32 + Math.random() * 0.16),
            c: palette[(i + ci) % palette.length]
          });
        }
      }

      function frame() {
        ctx.clearRect(0, 0, w, h);
        blobs.forEach(function (b) {
          if (!reduced) {
            b.x += b.vx;
            b.y += b.vy;
            if (b.x < 0 || b.x > w) b.vx *= -1;
            if (b.y < 0 || b.y > h) b.vy *= -1;
          }
          var g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
          g.addColorStop(0, 'rgba(' + b.c[0] + ',' + b.c[1] + ',' + b.c[2] + ',0.14)');
          g.addColorStop(1, 'rgba(' + b.c[0] + ',' + b.c[1] + ',' + b.c[2] + ',0)');
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        });
        if (!reduced && running) raf = requestAnimationFrame(frame);
      }

      resize();
      makeBlobs();

      if (!('IntersectionObserver' in window)) {
        running = true;
        frame();
      } else {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !running) {
              running = true;
              frame();
            } else if (!entry.isIntersecting) {
              running = false;
              if (raf) cancelAnimationFrame(raf);
            }
          });
        }, { threshold: 0.1 });
        observer.observe(canvas);
      }

      window.addEventListener('resize', function () {
        resize();
        makeBlobs();
      });
    });
  }

  function fakeSubmit(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button');
      var label = btn && btn.querySelector('.btn-label');
      var input = form.querySelector('input');
      if (label) label.textContent = 'Готово ✓';
      if (input) input.disabled = true;
      if (btn) btn.disabled = true;
    });
  }

  function initWaitlistModal() {
    var modal = document.getElementById('waitlist-modal');
    if (!modal) return;
    var closeBtn = modal.querySelector('.modal-close');
    var lastFocused = null;

    function open(trigger) {
      lastFocused = trigger || document.activeElement;
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      var input = modal.querySelector('input');
      if (input) input.focus();
    }

    function close() {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    document.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-open-waitlist]');
      if (opener) {
        e.preventDefault();
        open(opener);
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
    });

    modal.querySelectorAll('form').forEach(fakeSubmit);
  }

  function initHeroForm() {
    var form = document.querySelector('.hero .pill-form');
    if (form) fakeSubmit(form);
    var ctaForm = document.querySelector('.cta-final .pill-form');
    if (ctaForm) fakeSubmit(ctaForm);
  }

  window.initMotion = function () {
    initLenis();
    initAnchorScroll();
    initScrollProgress();
    initReveal();
    initCounters();
    initHeroCanvas();
    initUsp();
    initUspTilt();
    initSteps();
    initChartDraw();
    initDeviceToggle();
    initIntelCanvas();
    initAmbientCanvas();
    initWaitlistModal();
    initHeroForm();
  };
})();
