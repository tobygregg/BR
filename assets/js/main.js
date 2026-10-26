/* ─────────────────────────────────────────────────────────────
   Bailiwick Refrigeration – site scripts
   No libraries; everything here is progressive enhancement, so
   the site still works (and the form still sends) without JS.
   ───────────────────────────────────────────────────────────── */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Footer year ─────────────────────────────────────────── */
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ── Header shadow once scrolled ─────────────────────────── */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    const scrolled = window.scrollY > 8;
    header.classList.toggle('shadow-frost', scrolled);
    header.classList.toggle('border-navy-900/10', scrolled);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile menu ─────────────────────────────────────────── */
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  const setMenu = (open) => {
    menu.dataset.open = String(open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuBtn.querySelector('[data-open-hide]').classList.toggle('hidden', open);
    menuBtn.querySelector('[data-open-show]').classList.toggle('hidden', !open);
  };
  menuBtn.addEventListener('click', () => setMenu(menu.dataset.open !== 'true'));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

  /* ── "Send us a message" buttons pre-select the service ──── */
  const serviceSelect = document.getElementById('service');
  document.querySelectorAll('[data-service]').forEach((el) =>
    el.addEventListener('click', () => {
      const wanted = el.dataset.service;
      const opt = [...serviceSelect.options].find((o) => o.text === wanted);
      if (opt) serviceSelect.value = opt.value || opt.text;
    })
  );

  /* ── Temperature readout counts down (4°C → -18°C) ────────── */
  const runCounter = (el) => {
    const from = parseFloat(el.dataset.tempFrom);
    const to = parseFloat(el.dataset.tempTo);
    if (reduceMotion) { el.textContent = to.toFixed(1); return; }
    const dur = 2600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (from + (to - from) * eased).toFixed(1);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ── Scroll-triggered animations ─────────────────────────── */
  const animated = document.querySelectorAll('.reveal, .draw, .bear-walk, [data-gauge]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          entry.target.querySelectorAll('[data-temp-from]').forEach(runCounter);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    animated.forEach((el) => io.observe(el));
  } else {
    animated.forEach((el) => el.classList.add('is-in'));
  }

  /* ── Gauge tick marks (drawn here to keep the HTML tidy) ─── */
  const ticks = document.getElementById('ticks');
  if (ticks) {
    const NS = 'http://www.w3.org/2000/svg';
    for (let i = 0; i <= 24; i++) {
      const deg = -120 + i * 10;
      const rad = ((deg - 90) * Math.PI) / 180;
      const long = i % 4 === 0;
      const r1 = 84, r2 = long ? 92 : 89;
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', (100 + r1 * Math.cos(rad)).toFixed(2));
      line.setAttribute('y1', (100 + r1 * Math.sin(rad)).toFixed(2));
      line.setAttribute('x2', (100 + r2 * Math.cos(rad)).toFixed(2));
      line.setAttribute('y2', (100 + r2 * Math.sin(rad)).toFixed(2));
      if (!long) line.setAttribute('opacity', '.5');
      ticks.appendChild(line);
    }
  }

  /* ── Gentle snowfall in the hero ─────────────────────────── */
  const snow = document.getElementById('snow');
  if (snow && !reduceMotion) {
    const count = window.innerWidth < 640 ? 10 : 22;
    const flakeSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 2v20M3.3 7l17.4 10M20.7 7L3.3 17M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5"/></svg>';
    for (let i = 0; i < count; i++) {
      const f = document.createElement('span');
      const size = 8 + Math.random() * 14;
      f.className = 'flake';
      f.innerHTML = flakeSVG;
      f.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;` +
        `opacity:${0.35 + Math.random() * 0.5};--drift:${Math.round(Math.random() * 80 - 40)}px;` +
        `animation-duration:${12 + Math.random() * 14}s;animation-delay:${-Math.random() * 20}s;`;
      snow.appendChild(f);
    }
  }

  /* ── Highlight the nav link for the section in view ──────── */
  const links = [...document.querySelectorAll('.nav-link')];
  if ('IntersectionObserver' in window && links.length) {
    const map = new Map(links.map((l) => [l.getAttribute('href').slice(1), l]));
    const navIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove('is-active'));
          map.get(e.target.id)?.classList.add('is-active');
        }
      }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) navIO.observe(s); });
  }

  /* ── Contact form (FormSubmit AJAX, falls back to normal POST) ── */
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');
    const btn = form.querySelector('button[type="submit"]');
    const label = btn.querySelector('[data-label]');
    form.querySelector('[name="_next"]').value = `${location.origin}/thanks.html`;

    const show = (msg, ok) => {
      status.textContent = msg;
      status.classList.remove('hidden', 'bg-red-50', 'text-red-700', 'bg-ice-50', 'text-ice-700');
      status.classList.add(ok ? 'bg-ice-50' : 'bg-red-50', ok ? 'text-ice-700' : 'text-red-700');
    };

    form.addEventListener('submit', async (e) => {
      // Let the browser show its own messages for missing/invalid fields
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
      }
      if (!window.fetch) return; // old browser → normal form POST
      e.preventDefault();

      btn.disabled = true;
      btn.classList.add('opacity-70');
      label.textContent = 'Sending…';

      try {
        const ajaxURL = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
        const res = await fetch(ajaxURL, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'Failed');
        form.reset();
        show("Thanks – your message has been sent. We'll be in touch soon.", true);
        label.textContent = 'Sent ✓';
      } catch (err) {
        show('Sorry, something went wrong sending your message. Please call us on 07781 136118 or email bailiwickrefrigeration@gmail.com.', false);
        label.textContent = 'Send message';
      } finally {
        btn.disabled = false;
        btn.classList.remove('opacity-70');
      }
    });
  }
})();
