// ═══════════════════════════════════════════════════════
// BATMAN PORTFOLIO — ENHANCEMENT FEATURES JS (F2-F13)
// All functions appended to script.js via enhancements.js
// ═══════════════════════════════════════════════════════

'use strict';

// ─────────────────────────────────────────
// F10 — BAT CURSOR TRAIL
// ─────────────────────────────────────────
function initCursorTrail() {
    if (typeof isTouchDevice === 'function' && isTouchDevice()) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const TRAIL_COUNT = 6;
    const trails = [];
    const BAT_PATH = 'M 600,650 C 540,450 430,400 320,420 C 290,300 190,220 40,180 C 190,130 380,150 500,250 L 570,120 L 570,200 L 630,200 L 630,120 L 700,250 C 820,150 1010,130 1160,180 C 1010,220 910,300 880,420 C 770,400 660,450 600,650 Z';

    for (let i = 0; i < TRAIL_COUNT; i++) {
        const el = document.createElement('div');
        el.className = 'cursor-trail';
        el.innerHTML = `<svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
      <path d="${BAT_PATH}" fill="rgba(240,192,64,0.55)" />
    </svg>`;
        document.body.appendChild(el);
        trails.push(el);
    }

    let trailIndex = 0;
    document.addEventListener('mousemove', (e) => {
        const el = trails[trailIndex % TRAIL_COUNT];
        trailIndex++;
        el.style.left = e.clientX + 'px';
        el.style.top = e.clientY + 'px';
        el.classList.remove('trail-animate');
        void el.offsetWidth; // force reflow
        el.classList.add('trail-animate');
    }, { passive: true });
}

// ─────────────────────────────────────────
// F6 — SCROLL-LINKED NAVBAR BAT CHARGE
// ─────────────────────────────────────────
function initNavCharge() {
    const navBat = document.querySelector('.nav-bat');
    if (!navBat) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;
        const progress = Math.min(scrolled / maxScroll, 1);
        const glowSize = 4 + progress * 20;
        const glowOpacity = 0.3 + progress * 0.7;
        const scaleAmt = 1 + progress * 0.15;
        navBat.style.filter = `drop-shadow(0 0 ${glowSize}px rgba(240,192,64,${glowOpacity.toFixed(2)}))`;
        navBat.style.transform = `scale(${scaleAmt.toFixed(3)})`;
    }, { passive: true });
}

// ─────────────────────────────────────────
// F3 — ARSENAL VIEW TOGGLE (icon ↔ skill bars)
// ─────────────────────────────────────────
function initArsenalToggle() {
    const btnIcon = document.getElementById('btn-icon-view');
    const btnSystem = document.getElementById('btn-system-view');
    const iconGrid = document.querySelector('.arsenal-grid');
    const barsGrid = document.getElementById('skill-bars-grid');
    if (!btnIcon || !barsGrid || !iconGrid) return;

    let barsAnimated = false;

    function animateBars() {
        if (barsAnimated) return;
        barsAnimated = true;
        document.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
            setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, i * 80);
        });
    }

    btnSystem.addEventListener('click', () => {
        iconGrid.classList.add('hidden');
        barsGrid.classList.add('active');
        barsGrid.removeAttribute('aria-hidden');
        btnIcon.classList.remove('active');
        btnSystem.classList.add('active');
        btnSystem.setAttribute('aria-pressed', 'true');
        btnIcon.setAttribute('aria-pressed', 'false');
        animateBars();
    });

    btnIcon.addEventListener('click', () => {
        iconGrid.classList.remove('hidden');
        barsGrid.classList.remove('active');
        barsGrid.setAttribute('aria-hidden', 'true');
        btnSystem.classList.remove('active');
        btnIcon.classList.add('active');
        btnIcon.setAttribute('aria-pressed', 'true');
        btnSystem.setAttribute('aria-pressed', 'false');
    });
}

// ─────────────────────────────────────────
// F5 — INTERROGATION ROOM (contact section)
// ─────────────────────────────────────────
function initInterrogationRoom() {
    const signalLinks = document.querySelector('.signal-links');
    if (!signalLinks) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                signalLinks.classList.add('evidence-placed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    observer.observe(signalLinks);
}

// ─────────────────────────────────────────
// F7 — CASE NUMBER COUNTER SCRAMBLE
// ─────────────────────────────────────────
function initCaseCounter() {
    const counter = document.getElementById('case-counter');
    if (!counter) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            let count = 0;
            const target = 30;
            const interval = 800 / target;
            const tick = setInterval(() => {
                count++;
                if (count < target) {
                    counter.textContent = String(Math.floor(Math.random() * 9)).padStart(3, '0');
                } else {
                    counter.textContent = '001';
                    counter.style.color = 'var(--bat-yellow)';
                    clearInterval(tick);
                }
            }, interval);
        });
    }, { threshold: 0.5 });
    observer.observe(counter);
}

// ─────────────────────────────────────────
// F8 — GITHUB STATS IMAGE FADE-IN
// ─────────────────────────────────────────
function initGithubStats() {
    document.querySelectorAll('.github-stats-img').forEach(img => {
        if (img.complete) { img.classList.add('loaded'); }
        else { img.addEventListener('load', () => img.classList.add('loaded')); }
    });
}

// ─────────────────────────────────────────
// F9 — WANTED POSTER HERO INTRO
// ─────────────────────────────────────────
function runHeroGSAP() {
    if (typeof gsap === 'undefined') {
        document.querySelectorAll('#hero [data-animate]').forEach(el => el.classList.add('animated'));
        initGlitchAuto();
        return;
    }
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from('#profile-hex', { opacity: 0, scale: 0.9, duration: 0.7, ease: 'power2.out' })
        .from('.hero-init', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from('#hero-name', {
            opacity: 0, y: 30, duration: 0.6, ease: 'power2.out',
            onComplete: () => { const n = document.getElementById('hero-name'); if (n) n.classList.add('animated'); }
        }, '-=0.2')
        .from('.hero-role-badge', { opacity: 0, x: -20, duration: 0.5, ease: 'power2.out' }, '-=0.2');
    initGlitchAuto();
}

// ─────────────────────────────────────────
// F2 — BAT COMPUTER TERMINAL EASTER EGG
// ─────────────────────────────────────────
function initBatTerminal() {
    const terminal = document.getElementById('bat-terminal');
    const output = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');
    const closeBtn = document.getElementById('terminal-close');
    if (!terminal) return;

    let buffer = '';
    document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
        if (terminal.classList.contains('open')) return;
        buffer += e.key.toUpperCase();
        if (buffer.length > 6) buffer = buffer.slice(-6);
        if (buffer === 'BATMAN') { openTerminal(); buffer = ''; }
    });

    function openTerminal() {
        terminal.classList.add('open');
        terminal.removeAttribute('aria-hidden');
        printWelcome();
        setTimeout(() => input && input.focus(), 300);
    }
    function closeTerminal() {
        terminal.classList.remove('open');
        terminal.setAttribute('aria-hidden', 'true');
        if (output) output.innerHTML = '';
        if (input) input.value = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeTerminal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && terminal.classList.contains('open')) closeTerminal();
    });

    function printLine(text, cls = '', delayMs = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = 't-line' + (cls ? ' ' + cls : '');
                div.innerHTML = text;
                if (output) { output.appendChild(div); output.scrollTop = output.scrollHeight; }
                resolve();
            }, delayMs);
        });
    }

    async function printWelcome() {
        await printLine('', '', 0);
        await printLine('████████████████████████████████████████████████████', 'yellow', 80);
        await printLine('&nbsp; BAT-COMPUTER INTERFACE — AUTHORIZED ACCESS ONLY &nbsp;', 'yellow', 120);
        await printLine('████████████████████████████████████████████████████', 'yellow', 160);
        await printLine('', '', 200);
        await printLine('&gt; System online. Welcome, Detective.', '', 260);
        await printLine('&gt; Type <span class="yellow">help</span> to see available commands.', 'dim', 340);
        await printLine('', '', 380);
    }

    const COMMANDS = {
        help: () => [
            { t: '┌─ AVAILABLE COMMANDS ──────────────────────────────┐', c: 'yellow' },
            { t: '│  whoami     — Identity profile                    │', c: '' },
            { t: '│  skills     — Full tech arsenal                   │', c: '' },
            { t: '│  projects   — Case files / deployed work          │', c: '' },
            { t: '│  experience — Employment record                   │', c: '' },
            { t: '│  contact    — Signal / communication channels     │', c: '' },
            { t: '│  status     — Current availability                │', c: '' },
            { t: '│  gotham     — ???                                 │', c: 'dim' },
            { t: '│  clear      — Clear terminal                      │', c: '' },
            { t: '│  exit       — Close terminal                      │', c: '' },
            { t: '└───────────────────────────────────────────────────┘', c: 'yellow' },
        ],
        whoami: () => [
            { t: '&gt; IDENTITY: <span class="yellow">PAPIL VERMA</span>', c: '' },
            { t: '&gt; ALIAS: Full Stack Engineer, Gotham City', c: '' },
            { t: '&gt; SPECIALIZATION: Interactive UI + Scalable Systems', c: '' },
            { t: '&gt; STATUS: <span class="yellow">AVAILABLE FOR HIRE</span>', c: '' },
            { t: '&gt; EMAIL: papil.verma.5@gmail.com', c: '' },
            { t: '&gt; GITHUB: github.com/PAPIL001', c: '' },
            { t: '&gt; LINKEDIN: linkedin.com/in/papil-verma-0a0181337', c: '' },
        ],
        skills: () => [
            { t: '&gt; TECH ARSENAL — CONFIRMED PROFICIENCY:', c: 'yellow' },
            { t: '  [██████████████████░░] HTML5/CSS3  92%', c: '' },
            { t: '  [██████████████████░░] Python      90%', c: '' },
            { t: '  [█████████████████░░░] JavaScript  85%', c: '' },
            { t: '  [████████████████░░░░] React.js    80%', c: '' },
            { t: '  [████████████████░░░░] Node.js     80%', c: '' },
            { t: '  [███████████████░░░░░] Django      75%', c: '' },
            { t: '  [██████████████░░░░░░] MongoDB     70%', c: '' },
            { t: '  [█████████████░░░░░░░] Azure/GCP   65%', c: '' },
            { t: '  [████████████░░░░░░░░] Java / C    60%', c: '' },
        ],
        projects: () => [
            { t: '&gt; CASE FILES — DEPLOYED OPERATIONS:', c: 'yellow' },
            { t: '  #001 — Music Streaming App       [Node.js / MongoDB / Express]', c: '' },
            { t: '  #002 — EntityGraph AI            [Python / OpenAI / Graph]', c: '' },
            { t: '  #003 — Healthcare Web Platform   [Django / React / Azure]', c: '' },
            { t: '  #004 — Data Pipeline Automation  [Python / GCP / ML]', c: '' },
            { t: '  #005 — Batman Portfolio          [HTML / CSS / JS / GSAP]', c: '' },
            { t: '  #006 — REST API Microservices    [Node.js / Express / REST]', c: '' },
            { t: '&gt; github.com/PAPIL001 — View all source files', c: 'dim' },
        ],
        experience: () => [
            { t: '&gt; EMPLOYMENT RECORD:', c: 'yellow' },
            { t: '  CASE #001 — ZYNOVA REMEDIES PRIVATE LIMITED', c: 'white' },
            { t: '  ROLE: Full Stack Engineer', c: '' },
            { t: '  DURATION: July 2025 — Present (ACTIVE)', c: '' },
            { t: '  STACK: React.js · Node.js · MongoDB · Django · Azure', c: '' },
            { t: '  → Production healthcare web apps', c: 'dim' },
            { t: '  → Scalable REST APIs + cloud deployments', c: 'dim' },
            { t: '  → Automated data pipelines with Python', c: 'dim' },
        ],
        contact: () => [
            { t: '&gt; SIGNAL CHANNELS — OPEN FOR TRANSMISSION:', c: 'yellow' },
            { t: '  GMAIL    → papil.verma.5@gmail.com', c: '' },
            { t: '  GITHUB   → github.com/PAPIL001', c: '' },
            { t: '  LINKEDIN → linkedin.com/in/papil-verma-0a0181337', c: '' },
            { t: '  LEETCODE → leetcode.com/u/vpapil', c: '' },
            { t: '&gt; Response time: &lt; 24 hours', c: 'dim' },
        ],
        status: () => [
            { t: '&gt; CHECKING AVAILABILITY...', c: '' },
            { t: '  ● OPEN TO: Full-time roles', c: 'yellow' },
            { t: '  ● OPEN TO: Freelance projects', c: 'yellow' },
            { t: '  ● OPEN TO: Contract / consulting', c: 'yellow' },
            { t: '  ● LOCATION: Gotham City (Remote-friendly)', c: '' },
            { t: '  ● NOTICE PERIOD: Available immediately', c: '' },
        ],
        gotham: () => [
            { t: '', c: '' },
            { t: '  "I am vengeance."', c: 'yellow' },
            { t: '  "I am the night."', c: 'yellow' },
            { t: '  "I... am also available for senior dev roles."', c: 'white' },
            { t: '', c: '' },
        ],
        clear: () => { if (output) output.innerHTML = ''; return []; },
        exit: () => { setTimeout(closeTerminal, 200); return [{ t: '&gt; Closing secure channel...', c: 'dim' }]; },
    };

    if (input) {
        input.addEventListener('keydown', async (e) => {
            if (e.key !== 'Enter') return;
            const cmd = input.value.trim().toLowerCase();
            input.value = '';
            if (!cmd) return;
            await printLine(`<span class="yellow">BATMAN@GOTHAM:~$</span> ${cmd}`, 'white');
            const handler = COMMANDS[cmd];
            if (handler) {
                const lines = handler();
                if (lines && lines.length > 0) {
                    for (let i = 0; i < lines.length; i++) {
                        await printLine(lines[i].t, lines[i].c, i * 40);
                    }
                }
            } else {
                await printLine(`&gt; Command not found: "${cmd}". Type <span class="yellow">help</span>.`, 'red');
            }
            await printLine('', '', 0);
        });
    }
}

// ─────────────────────────────────────────
// F11 — DECRYPT RESUME ANIMATION
// ─────────────────────────────────────────
function initDecryptResume() {
    const resumeBtn = document.getElementById('btn-resume');
    const overlay = document.getElementById('decrypt-overlay');
    const textEl = document.getElementById('decrypt-text');
    const barEl = document.getElementById('decrypt-bar');
    const filenameEl = document.getElementById('decrypt-filename');
    if (!resumeBtn || !overlay) return;

    const RESUME_URL = 'https://drive.google.com/file/d/1rmVV_Hu-P17HWaiYD48w9gHd3v1B1O4Y/view?usp=sharing';
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const MESSAGES = [
        'DECRYPTING CLASSIFIED FILE...',
        'BYPASSING ENCRYPTION LAYERS...',
        'AUTHENTICATING CREDENTIALS...',
        'EXTRACTING SECURE DOCUMENT...',
        'ACCESS GRANTED — OPENING FILE...'
    ];

    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.classList.add('active');
        overlay.removeAttribute('aria-hidden');

        let progress = 0;
        let messageIndex = 0;
        if (filenameEl) filenameEl.classList.remove('show');
        if (barEl) barEl.style.width = '0%';

        let scrambleIv = setInterval(() => {
            if (textEl) {
                textEl.textContent = MESSAGES[messageIndex]
                    .split('').map(c => c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
            }
        }, 60);

        const barIv = setInterval(() => {
            progress += 2;
            if (barEl) barEl.style.width = progress + '%';

            const newIdx = Math.min(Math.floor(progress / 25), MESSAGES.length - 1);
            if (newIdx !== messageIndex) {
                messageIndex = newIdx;
                if (textEl) textEl.textContent = MESSAGES[messageIndex];
            }

            if (progress >= 100) {
                clearInterval(barIv);
                clearInterval(scrambleIv);
                if (textEl) textEl.textContent = MESSAGES[MESSAGES.length - 1];
                if (filenameEl) filenameEl.classList.add('show');

                setTimeout(() => {
                    window.open(RESUME_URL, '_blank', 'noopener');
                    setTimeout(() => {
                        overlay.classList.remove('active');
                        overlay.setAttribute('aria-hidden', 'true');
                        if (barEl) barEl.style.width = '0%';
                        if (filenameEl) filenameEl.classList.remove('show');
                    }, 400);
                }, 500);
            }
        }, 25);
    });
}

// ─────────────────────────────────────────
// F13 — MOBILE NAV OVERLAY ATMOSPHERE
// (patches initHamburger — called after DOMContentLoaded)
// ─────────────────────────────────────────
function patchMobileNavAtmosphere() {
    const overlay = document.querySelector('.nav-overlay');
    if (!overlay || overlay.querySelector('.mobile-nav-top')) return;

    const BAT_PATH = 'M 600,650 C 540,450 430,400 320,420 C 290,300 190,220 40,180 C 190,130 380,150 500,250 L 570,120 L 570,200 L 630,200 L 630,120 L 700,250 C 820,150 1010,130 1160,180 C 1010,220 910,300 880,420 C 770,400 660,450 600,650 Z';
    const atm = document.createElement('div');
    atm.className = 'mobile-nav-top';
    atm.innerHTML = `
    <svg class="mobile-nav-bat" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
      <path d="${BAT_PATH}" fill="#000" stroke="#e08a22" stroke-width="14"/>
    </svg>
    <span class="mobile-nav-brand">GOTHAM SYSTEMS</span>
    <span class="mobile-nav-sub">// SECURE NAVIGATION</span>
  `;
    overlay.insertAdjacentElement('afterbegin', atm);
}
