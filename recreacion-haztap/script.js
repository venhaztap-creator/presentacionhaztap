// ==========================================================================
// HAZTAP — Home: scroll normal, secciones que revelan al entrar en viewport
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // Split hero titles into animatable words (efecto de entrada del texto)
    document.querySelectorAll('.hero-title').forEach(title => {
        let html = '';
        const lines = title.innerHTML.split('<br>');
        lines.forEach((line, index) => {
            const words = line.trim().split(' ');
            words.forEach(word => {
                if (word.trim() !== '') {
                    html += `<div class="word"><div>${word}</div></div> `;
                }
            });
            if (index < lines.length - 1) html += '<br>';
        });
        title.innerHTML = html;
    });

    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // --- Hero: entrada inicial (siempre visible al cargar) ---
    gsap.set('.home-hero .word > div', { y: '0%' });
    gsap.set('.home-hero .fade-in-up', { autoAlpha: 1, y: 0 });
    gsap.set('.home-scroll-hint', { autoAlpha: 1, y: 0 });

    const introTl = gsap.timeline();
    introTl.from('.home-hero .word > div', { y: '100%', duration: 1, ease: 'power3.out', stagger: 0.05 }, 0.2)
           .from('.home-hero .fade-in-up', { autoAlpha: 0, y: 30, duration: 1, ease: 'power3.out', stagger: 0.1 }, '-=0.7')
           .from('.home-scroll-hint', { autoAlpha: 0, y: -10, duration: 0.8, ease: 'power2.out' }, '-=0.5');

    // --- Resto de secciones: revelan al hacer scroll ---
    document.querySelectorAll('.home-showreel, .home-clients, .home-closing').forEach((section) => {
        gsap.set(section.querySelectorAll('.fade-in-up'), { autoAlpha: 1, y: 0 });
        gsap.set(section.querySelectorAll('.hero-title .word > div'), { y: '0%' });

        gsap.from(section.querySelectorAll('.fade-in-up'), {
            autoAlpha: 0,
            y: 30,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
                trigger: section,
                start: 'top 75%'
            }
        });

        const words = section.querySelectorAll('.hero-title .word > div');
        if (words.length) {
            gsap.from(words, {
                y: '100%',
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.04,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%'
                }
            });
        }
    });
});

// ==========================================================================
// HERO: leve parallax del fondo con el scroll (barato, solo transform)
// ==========================================================================
(function () {
    const bg = document.querySelector('.home-hero-bg');
    if (!bg || typeof gsap === 'undefined') return;
    gsap.to(bg, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
            trigger: '.home-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
})();

// ==========================================================================
// VIDEO INSTITUCIONAL: reproducir al hacer tap en el botón play
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('home-showreel-video');
    const playBtn = document.getElementById('home-showreel-play-btn');
    if (!video || !playBtn) return;

    playBtn.addEventListener('click', () => {
        video.play();
        video.setAttribute('preload', 'auto');
    });

    video.addEventListener('play', () => playBtn.classList.add('is-hidden'));
    video.addEventListener('pause', () => playBtn.classList.remove('is-hidden'));
    video.addEventListener('ended', () => playBtn.classList.remove('is-hidden'));
});


