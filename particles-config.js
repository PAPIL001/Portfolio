/* ===================================================
   BATMAN PORTFOLIO — PARTICLES-CONFIG.JS
   Gotham Rain & Floating Bat Particles
   =================================================== */

'use strict';

async function initGothamParticles() {
    if (typeof tsParticles === 'undefined') return;

    await tsParticles.load('tsparticles', {
        fullScreen: { enable: false },
        fpsLimit: 60,
        background: { color: { value: 'transparent' } },
        particles: {
            number: {
                value: 80,
                density: { enable: true, area: 1000 }
            },
            color: { value: ['#d1d5db', '#6b7280', '#9ca3af'] },
            shape: { type: 'square' },
            opacity: {
                value: 0.12,
                random: { enable: true, minimumValue: 0.05 }
            },
            size: {
                value: { min: 1, max: 2 }
            },
            // Rain: lines falling vertically
            move: {
                enable: true,
                direction: 'bottom',
                speed: { min: 1.5, max: 3.5 },
                straight: true,
                outModes: { default: 'out', bottom: 'out' }
            },
            rotate: {
                value: {
                    min: 88,
                    max: 92
                },
                direction: 'random',
                animation: { enable: false }
            },
            life: {
                duration: { sync: false, value: 0 }
            },
            // Occasional bat-yellow accent drop
            stroke: {
                width: 1,
                color: { value: '#6b7280' }
            }
        },
        emitters: {
            direction: 'bottom',
            position: { x: 50, y: -10 },
            rate: { quantity: 3, delay: 0.15 },
            size: { width: 110, height: 0 }
        },
        interactivity: {
            detectsOn: 'window',
            events: {
                onHover: { enable: false },
                onClick: { enable: false }
            }
        },
        detectRetina: true,
        pauseOnBlur: true
    });
}
