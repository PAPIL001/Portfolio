<div align="center">
  <img src="https://media.giphy.com/media/l0NwGpoOVLTAyUJSo/giphy.gif" alt="Batman Signal" width="150" />
  
  # 🦇 Batman Portfolio

  <p>
    <strong>A cinematic, Gotham-noir themed developer portfolio built with Vanilla HTML/CSS/JS.</strong>
  </p>
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-22c55e?style=for-the-badge&logo=vercel)](https://portfolio-six-pi-dd5xa3wta1.vercel.app/)
  [![GitHub License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)
</div>

<br />

Welcome to the Batcave. This portfolio was engineered from the ground up to provide a unique, interactive, and immersive experience inspired by Gotham City and the Dark Knight. It uses zero component frameworks—just pure, optimized Vanilla HTML5, CSS3, and JavaScript ES6+ powered by GSAP for high-performance animations.

---

## ✨ Features

- **🎬 Cinematic Boot Sequence:** An immersive terminal decoding animation that introduces the user to the portfolio before revealing the main interface.
- **🦇 Gotham Aesthetic & Design System:** A meticulously crafted dark theme (`--bat-black`, `--gotham-steel`, `--bat-yellow`) with a complete, reusable CSS variable system.
- **🌧️ Dynamic Environment:** Interactive `tsParticles` configuration simulating the relentless Gotham rain in the hero background.
- **🎭 GSAP Scroll Animations:** High-performance, viewport-triggered reveal animations across all sections (fade-ups, glitch text, staggered lists) controlled via custom `data-animate` HTML attributes.
- **💻 The Bat-Computer Terminal (Easter Egg):** A hidden, fully-functional full-screen terminal accessible by typing `BATMAN` on the keyboard, featuring custom commands (`help`, `whoami`, `projects`, `clear`, `exit`, `sudo`).
- **👀 Custom Bat-Cursor Trail:** A high-performance, GSAP-powered custom cursor that leaves an animated trail of fading bat logos as you move your mouse.
- **🃏 "Wanted Poster" Intro:** A stylistic, comic-book inspired "Wanted" poster overlay that dissolves into the main hero section.
- **📁 Interactive Intelligence Files (Projects):** 3D-flipping project cards. The front features a VS Code-style syntax-highlighted code preview, while the back reveals a detailed "Intelligence File" dossier.
- **📊 Live GitHub Stats:** Fetches and displays real-time GitHub contributions and streaks using the GitHub Readme Stats API.
- **⚡ Dynamic Arsenal:** A dual-view skills section allowing users to toggle between a DevIcon grid view and animated proficiency progress bars.
- **🚨 Interrogation Room Contact Form:** A visually striking contact section styled like a Gotham interrogation room, complete with evidence drop animations and spotlight gradients.

---

## 🛠️ Tech Stack & Architecture

This project deliberately avoids heavy SPA frameworks (React/Vue/Angular) in favor of a lean, highly optimized vanilla stack.

**Core Web Technologies:**
*   **HTML5:** Semantic architecture, accessible aria-labels, and data-attributes for JS binding.
*   **CSS3:** Custom properties (variables), CSS Grid/Flexbox layouts, complex keyframe animations, 3D transforms (`preserve-3d`, `rotateY`), and responsive media queries.
*   **JavaScript (ES6+):** Modular pattern (IIFEs and closures), DOM manipulation, Intersection Observer API, and event delegation.

**Libraries & APIs:**
*   **[GSAP 3](https://gsap.com/):** For complex sequencing, timeline management, and scroll-triggered animations.
*   **[GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/):** To anchor animations to scroll positions.
*   **[tsParticles](https://particles.js.org/):** For the highly configurable, lightweight rain simulation.
*   **[Font Awesome 6](https://fontawesome.com/):** For scalable vector icons.
*   **[DevIcons](https://devicon.dev/):** For accurate technology stack logos.

---

## 📂 Project Structure

```text
├── index.html            # Main markup file (SPA structure)
├── style.css             # Base design system, layouts, and core CSS
├── enhancements.css      # CSS specifically for the 13 advanced interactive features
├── script.js             # Base initialization script and Intersection Observers
├── enhancements.js       # Logic for all interactive features (Terminal, Cursor, 3D Cards, etc.)
├── particles-config.js   # tsParticles configuration for Gotham rain
├── media/                # Directory containing images and assets (Dp.webp, etc.)
└── README.md             # This file
```

---

## 🚀 Getting Started

Because this is a static, vanilla web project, there is no server-side compilation or node modules required to run it locally.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PAPIL001/Portfolio.git
   ```

2. **Navigate to the directory:**
   ```bash
   cd Portfolio
   ```

3. **Run locally:**
   Simply open the `index.html` file in any modern web browser.
   *Alternatively, for an optimal experience (to avoid CORS issues with local files if adding future APIs), use a local development server like VS Code's "Live Server" extension.*

---

## 🕵️‍♂️ Easter Eggs Reference

If you are exploring the code or evaluating the site, try these hidden features:
1. **The Terminal:** Press the keys `B`, `A`, `T`, `M`, `A`, `N` sequentially anywhere on the page to override the UI and access the Bat-Computer. Try typing `help`.
2. **The Encrypted Resume:** Click the "View Resume" button to trigger a brief "decryption sequence" before the file actually opens.
3. **The Footer Secret:** Click the copyright year (`2026`) in the footer 3 times rapidly to trigger a hidden Batman boot sequence.

---

<div align="center">
  <p><i>"It’s not who I am underneath, but what I do that defines me."</i></p>
  <p>Built with 🦇 by <a href="https://github.com/PAPIL001">Papil Verma</a></p>
</div>
