/* ============================================================
   NAJWAL HUDA — PORTFOLIO — script.js
   Semua interaksi menggunakan JavaScript vanilla, tanpa framework.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. LOADING SCREEN ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 400);
  });
  // Jaga-jaga jika event 'load' lambat/gagal, tetap sembunyikan setelah 2.5 detik
  setTimeout(() => loader.classList.add('hidden'), 2500);

  /* ---------- 2. NAVBAR: efek scroll + menu mobile + link aktif ---------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('[data-nav]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    toggleBackToTop();
  });

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  // Highlight menu sesuai section yang sedang terlihat
  const sections = document.querySelectorAll('main section[id]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(sec => navObserver.observe(sec));

  /* ---------- 3. TYPING TEXT ANIMATION (peran di hero) ---------- */
  const typingEl = document.getElementById('typingText');
  const fullText = 'Mahasiswa Teknik Informatika | Pekebun | Mekanik Bengkel';
  let charIndex = 0;

  function typeWriter() {
    if (charIndex <= fullText.length) {
      typingEl.textContent = fullText.slice(0, charIndex);
      charIndex++;
      setTimeout(typeWriter, 38);
    }
  }
  setTimeout(typeWriter, 700);

  /* ---------- 4. SCROLL REVEAL (fade + slide-up) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- 5. SKILL PROGRESS BARS ---------- */
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percent = parseInt(bar.dataset.percent, 10);
        const fill = bar.querySelector('.skill-fill');
        const label = bar.querySelector('.skill-percent');

        fill.style.width = percent + '%';

        let current = 0;
        const step = Math.max(1, Math.round(percent / 40));
        const counter = setInterval(() => {
          current += step;
          if (current >= percent) { current = percent; clearInterval(counter); }
          label.textContent = current + '%';
        }, 25);

        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ---------- 6. JOURNEY TIMELINE PROGRESS ---------- */
  const journeyTrack = document.querySelector('.journey-track');
  const journeyProgress = document.getElementById('journeyProgress');
  if (journeyTrack) {
    const journeyObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          journeyTrack.classList.add('visible');
          journeyProgress.style.width = '100%';
          obs.unobserve(journeyTrack);
        }
      });
    }, { threshold: 0.35 });
    journeyObserver.observe(journeyTrack);
  }

  /* ---------- 7. CARD TILT EFFECT RINGAN (portfolio) ---------- */
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -6;
      const rotateY = ((x / rect.width) - 0.5) * 6;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  /* ---------- 8. RIPPLE EFFECT PADA TOMBOL ---------- */
  document.querySelectorAll('[data-ripple]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- 9. BACK TO TOP ---------- */
  const backToTop = document.getElementById('backToTop');
  function toggleBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 10. CURSOR GLOW (mengikuti mouse, desktop saja) ---------- */
  const cursorGlow = document.getElementById('cursorGlow');
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouch && cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.opacity = '1';
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
    window.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0'; });
  }

  /* ---------- 11. CONTACT FORM (simulasi pengiriman, tanpa backend) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    formStatus.textContent = `Terima kasih, ${name || 'Sahabat'}! Pesan Anda telah tersimpan.`;
    contactForm.reset();
    setTimeout(() => { formStatus.textContent = ''; }, 5000);
  });

  /* ---------- 12. PARTIKEL LATAR (node teknologi + kunang-kunang alam) ---------- */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width, height;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight * (isMobile() ? 1 : 1.2);
  }
  function isMobile() { return window.innerWidth < 720; }

  function createParticles() {
    const count = isMobile() ? 34 : 70;
    const colors = ['56,214,138', '79,168,255', '226,147,79'];
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI * 2
    }));
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      const glow = (Math.sin(p.pulse) + 1) / 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + glow * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${0.4 + glow * 0.4})`;
      ctx.fill();
    });

    // Garis penghubung antar-node yang berdekatan (kesan sirkuit/jaringan)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(56,214,138, ${0.12 * (1 - dist / 130)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }

  if (canvas && !isReducedMotion) {
    resizeCanvas();
    createParticles();
    drawParticles();
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
  } else if (canvas) {
    // Hormati preferensi reduced-motion: tampilkan latar statis sederhana
    resizeCanvas();
    createParticles();
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, 0.5)`;
      ctx.fill();
    });
  }

});