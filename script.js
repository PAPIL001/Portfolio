/* ===================================================
   BATMAN PORTFOLIO — SCRIPT.JS
   Gotham Noir Interactive Experience
   =================================================== */

'use strict';

// ── GSAP Registration ──
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Utility ──
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. BOOT SEQUENCE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initBootSequence() {
  const boot = $('#boot-screen');
  if (!boot) return;

  // Timeout matches last boot-line delay (1.8s) + animation (0.4s) + buffer (0.8s)
  setTimeout(() => {
    boot.classList.add('hidden');
    // Trigger hero entrance after boot
    triggerHeroEntrance();
  }, 3200);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. CUSTOM CURSOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initCursor() {
  if (isTouchDevice()) return;

  const bat = $('#cursor-bat');
  const ring = $('#cursor-ring');
  if (!bat || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    bat.style.left = mouseX + 'px';
    bat.style.top = mouseY + 'px';
  });

  // Ring follows with lag for "cursor trail" effect
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expand on interactive elements
  const interactiveSelector = 'a, button, .tech-icon, .project-card, .signal-link, .cta-btn, .copy-btn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      bat.classList.add('expanded');
      ring.classList.add('expanded');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      bat.classList.remove('expanded');
      ring.classList.remove('expanded');
    }
  });

  // Hide on mouse leave
  document.addEventListener('mouseleave', () => {
    bat.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    bat.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. BAT SIGNAL SPOTLIGHT (Hero)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initBatSignal() {
  if (isTouchDevice()) return;

  const hero = $('#hero');
  const spotlight = $('#hero-spotlight');
  if (!hero || !spotlight) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    spotlight.style.background = `radial-gradient(
      ellipse 500px 500px at ${x}% ${y}%,
      rgba(240, 192, 64, 0.10) 0%,
      rgba(240, 192, 64, 0.04) 30%,
      transparent 70%
    )`;
  });

  hero.addEventListener('mouseleave', () => {
    spotlight.style.background = `radial-gradient(
      ellipse 600px 600px at 50% 50%,
      rgba(240, 192, 64, 0.06) 0%,
      transparent 70%
    )`;
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. PARALLAX TILT (Profile Image)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initParallaxTilt() {
  if (isTouchDevice()) return;

  const hero = $('#hero');
  const hexFrame = $('#profile-hex');
  if (!hero || !hexFrame) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / (rect.width / 2);
    const dy = (e.clientY - centerY) / (rect.height / 2);
    const tiltX = dy * -6;  // max 6deg
    const tiltY = dx * 6;

    hexFrame.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  hero.addEventListener('mouseleave', () => {
    hexFrame.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. MAGNETIC BUTTONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initMagneticButtons() {
  if (isTouchDevice()) return;

  $$('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 80;

      if (dist < maxDist) {
        const strength = (maxDist - dist) / maxDist;
        btn.style.transform = `translate(${dx * strength * 0.3}px, ${dy * strength * 0.3}px)`;
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. NAVBAR: SCROLL SPY + SHRINK
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initNavbar() {
  const navbar = $('#navbar');
  const navLinks = $$('.nav-link');
  if (!navbar) return;

  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;

    // Shrink on scroll down
    if (currentY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = currentY;

    // Scroll Spy
    const sections = $$('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');
      if (currentY >= sectionTop) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.dataset.section === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = $(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Bat-yellow flash
          target.style.boxShadow = '0 0 0 2px rgba(240,192,64,0.4)';
          setTimeout(() => { target.style.boxShadow = ''; }, 600);
        }
        // Close mobile overlay if open
        closeMobileNav();
      }
    });
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. HAMBURGER MENU
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let mobileOverlay = null;

function initHamburger() {
  const hamburger = $('#hamburger');
  if (!hamburger) return;

  // Create mobile nav overlay dynamically
  mobileOverlay = document.createElement('div');
  mobileOverlay.classList.add('nav-overlay');
  mobileOverlay.setAttribute('id', 'nav-overlay');

  const links = [
    { href: '#hero', label: 'Home', section: 'hero' },
    { href: '#arsenal', label: 'Skills', section: 'arsenal' },
    { href: '#case-files', label: 'Experience', section: 'case-files' },
    { href: '#projects', label: 'Projects', section: 'projects' },
    { href: '#intel', label: 'About', section: 'intel' },
    { href: '#signal', label: 'Contact', section: 'signal' },
  ];

  links.forEach(({ href, label, section }) => {
    const a = document.createElement('a');
    a.href = href;
    a.className = 'nav-link';
    a.dataset.section = section;
    a.textContent = label;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileNav();
      const target = $(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
    mobileOverlay.appendChild(a);
  });

  document.body.appendChild(mobileOverlay);

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    if (isOpen) { closeMobileNav(); }
    else {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
}

function closeMobileNav() {
  const hamburger = $('#hamburger');
  if (hamburger) {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  if (mobileOverlay) mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. INTERSECTION OBSERVER — SCROLL ANIMATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initScrollAnimations() {
  const animatedEls = $$('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.02,                    // trigger as soon as 2% is visible
    rootMargin: '0px 0px 100px 0px'    // start triggering 100px before entering viewport
  });

  animatedEls.forEach(el => observer.observe(el));

  // Mark body as loaded so CSS fallback can kick in
  setTimeout(() => document.body.classList.add('loaded'), 3500);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. GSAP SCROLL ANIMATIONS
// (Only used for elements NOT controlled by data-animate)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initGSAP() {
  // All GSAP gsap.from() calls that set opacity:0 have been removed.
  // They conflict with the CSS visibility override and IntersectionObserver.
  // Contact links (.signal-link), social buttons, and CTA buttons are
  // always visible via the CSS rule with opacity:1 !important.
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. HERO ENTRANCE (F9: wanted poster → hero GSAP)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function triggerHeroEntrance() {
  const wanted = document.getElementById('wanted-overlay');

  if (wanted) {
    wanted.classList.add('show');
    setTimeout(() => {
      wanted.classList.add('dissolve');
      setTimeout(() => {
        wanted.style.display = 'none';
        if (typeof runHeroGSAP === 'function') runHeroGSAP();
        else _fallbackHeroEntrance();
      }, 800);
    }, 2200);
  } else {
    if (typeof runHeroGSAP === 'function') runHeroGSAP();
    else _fallbackHeroEntrance();
  }
}

function _fallbackHeroEntrance() {
  if (typeof gsap === 'undefined') {
    $$('#hero [data-animate]').forEach(el => el.classList.add('animated'));
    return;
  }
  const tl = gsap.timeline({ delay: 0.15 });
  tl.from('#profile-hex', { opacity: 0, scale: 0.9, duration: 0.7, ease: 'power2.out' })
    .from('.hero-init', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    .from('#hero-name', {
      opacity: 0, y: 30, duration: 0.6, ease: 'power2.out',
      onComplete: () => { const n = $('#hero-name'); if (n) n.classList.add('animated'); }
    }, '-=0.2')
    .from('.hero-role-badge', { opacity: 0, x: -20, duration: 0.5, ease: 'power2.out' }, '-=0.2');
  // NOTE: .social-btn, .cta-btn, .status-badge are always visible via CSS override
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11. GLITCH TEXT AUTO-TRIGGER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initGlitchAuto() {
  const name = $('#hero-name');
  if (!name) return;

  function triggerGlitch() {
    name.classList.add('glitch');
    setTimeout(() => name.classList.remove('glitch'), 350);
  }

  // Delay start until after the boot sequence (3.2s) + hero entrance (~1s)
  // so glitch never fires while boot screen is covering the hero
  setTimeout(() => setInterval(triggerGlitch, 8000), 4500);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 12. COUNTER ANIMATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initCounters() {
  const counters = $$('.stat-num[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1500;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(c => observer.observe(c));
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 13. TYPEWRITER EFFECT (About section)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initTypewriter() {
  const target = $('#typewriter-target');
  if (!target) return;

  // We'll animate opacity of each paragraph on scroll
  const paragraphs = $$('p', target);
  paragraphs.forEach((p, i) => {
    p.style.opacity = '0';
    p.style.transform = 'translateY(12px)';
    p.style.transition = `opacity 0.6s ease ${i * 0.2}s, transform 0.6s ease ${i * 0.2}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        paragraphs.forEach(p => {
          p.style.opacity = '1';
          p.style.transform = 'translateY(0)';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(target);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 14. COPY EMAIL TO CLIPBOARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initCopyEmail() {
  const btn = $('#copy-email-btn');
  const toast = $('#copy-toast');
  if (!btn || !toast) return;

  btn.addEventListener('click', async () => {
    const email = 'papil.verma.5@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      showToast(toast);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      showToast(toast);
    }
  });

  function showToast(el) {
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2500);
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 15. SIGNAL SECTION PULSE ON ENTER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initSignalPulse() {
  const signalSection = $('#signal');
  const glowRing = $('.signal-glow-ring');
  if (!signalSection || !glowRing) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        glowRing.style.animationDuration = '1.5s';
        setTimeout(() => { glowRing.style.animationDuration = '3s'; }, 3000);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(signalSection);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INIT ALL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
document.addEventListener('DOMContentLoaded', () => {
  initBootSequence();
  initCursor();
  if (typeof initCursorTrail === 'function') initCursorTrail();   // F10
  initBatSignal();
  initParallaxTilt();
  initMagneticButtons();
  initNavbar();
  if (typeof initNavCharge === 'function') initNavCharge();        // F6
  initHamburger();
  if (typeof patchMobileNavAtmosphere === 'function') {            // F13
    // Defer so overlay is built first
    setTimeout(patchMobileNavAtmosphere, 100);
  }
  initScrollAnimations();
  initGSAP();
  // initGlitchAuto() is now called inside runHeroGSAP() / triggerHeroEntrance (F9)
  initCounters();
  if (typeof initCaseCounter === 'function') initCaseCounter();    // F7
  initTypewriter();
  initCopyEmail();
  initSignalPulse();
  if (typeof initArsenalToggle === 'function') initArsenalToggle();       // F3
  if (typeof initInterrogationRoom === 'function') initInterrogationRoom(); // F5
  if (typeof initDecryptResume === 'function') initDecryptResume();        // F11
  if (typeof initBatTerminal === 'function') initBatTerminal();            // F2
  if (typeof initGithubStats === 'function') initGithubStats();            // F8

  // Init tsParticles if config exists
  if (typeof initGothamParticles === 'function') {
    initGothamParticles();
  }
});
