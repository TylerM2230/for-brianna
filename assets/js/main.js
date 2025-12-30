/*==================== BRIANNA MIRANDA TRIBUTE WEBSITE ====================*/
/*==================== GSAP ANIMATIONS & INTERACTIONS ====================*/

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/*==================== MOBILE NAVIGATION ====================*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
}

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

/*==================== HEADER SCROLL EFFECT ====================*/
const header = document.getElementById('header');

function scrollHeader() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', scrollHeader);

/*==================== ACTIVE NAVIGATION LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*==================== CREATE PARTICLES ====================*/
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 4 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particlesContainer.appendChild(particle);
    }

    // Animate particles
    gsap.utils.toArray('.particle').forEach(particle => {
        gsap.to(particle, {
            y: `random(-50, 50)`,
            x: `random(-30, 30)`,
            duration: `random(4, 8)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        // Subtle opacity pulsing
        gsap.to(particle, {
            opacity: `random(0.1, 0.6)`,
            duration: `random(2, 4)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
}

/*==================== HERO ANIMATIONS ====================*/
function initHeroAnimations() {
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Animate subtitle
    heroTimeline.to('.hero__subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5
    });

    // Animate each letter with stagger
    heroTimeline.to('.hero__letter', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'back.out(1.7)'
    }, '-=0.5');

    // Animate archetype text
    heroTimeline.to('.hero__archetype', {
        opacity: 1,
        y: 0,
        duration: 1
    }, '-=0.3');

    // Animate scroll indicator
    heroTimeline.to('.hero__scroll', {
        opacity: 1,
        duration: 1
    }, '-=0.5');
}

/*==================== SCROLL-TRIGGERED ANIMATIONS ====================*/
function initScrollAnimations() {
    // Letter card animation
    gsap.from('.letter__card', {
        scrollTrigger: {
            trigger: '.letter',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Letter text paragraphs stagger
    gsap.from('.letter__text', {
        scrollTrigger: {
            trigger: '.letter__content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
    });

    // Intro section animations
    gsap.from('.intro__quote', {
        scrollTrigger: {
            trigger: '.intro',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.from('.intro__theme', {
        scrollTrigger: {
            trigger: '.intro__themes',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Etymology blocks
    gsap.utils.toArray('.etymology__block').forEach((block, index) => {
        gsap.from(block, {
            scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Etymology combined section
    gsap.from('.etymology__combined', {
        scrollTrigger: {
            trigger: '.etymology__combined',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Etymology axes animation
    gsap.from('.etymology__axis', {
        scrollTrigger: {
            trigger: '.etymology__axes',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.4)'
    });

    // Number cards - subtle scale animation on scroll (cards remain visible)
    gsap.utils.toArray('.number-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                once: true
            },
            scale: 0.95,
            duration: 0.5,
            delay: index * 0.08,
            ease: 'power2.out'
        });
    });

    // Archetype primary section
    gsap.from('.archetype__primary', {
        scrollTrigger: {
            trigger: '.archetype__primary',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Archetype skills - scale animation only (maintains visibility)
    gsap.utils.toArray('.archetype__skill').forEach((skill, index) => {
        gsap.from(skill, {
            scrollTrigger: {
                trigger: skill,
                start: 'top 90%',
                once: true
            },
            scale: 0.95,
            duration: 0.5,
            delay: index * 0.08,
            ease: 'power2.out'
        });
    });

    // Spiritual nature items - scale animation only (maintains visibility)
    gsap.utils.toArray('.archetype__spiritual-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                once: true
            },
            scale: 0.95,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // Path journey steps - scale animation only (maintains visibility)
    gsap.utils.toArray('.path__step').forEach((step, index) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: 'top 90%',
                once: true
            },
            scale: 0.95,
            duration: 0.5,
            delay: index * 0.15,
            ease: 'power2.out'
        });
    });

    // Path connectors - safe animation
    gsap.utils.toArray('.path__connector').forEach((connector, index) => {
        gsap.from(connector, {
            scrollTrigger: {
                trigger: connector,
                start: 'top 90%',
                once: true
            },
            scaleX: 0.5,
            duration: 0.4,
            delay: index * 0.2,
            ease: 'power2.out'
        });
    });

    // Path conclusion - scale animation
    gsap.from('.path__conclusion', {
        scrollTrigger: {
            trigger: '.path__conclusion',
            start: 'top 90%',
            once: true
        },
        scale: 0.95,
        duration: 0.6,
        ease: 'power2.out'
    });

    // Summary table - scale animation
    gsap.from('.path__table', {
        scrollTrigger: {
            trigger: '.path__summary',
            start: 'top 90%',
            once: true
        },
        scale: 0.98,
        duration: 0.6,
        ease: 'power2.out'
    });

    // Footer - scale animation
    gsap.from('.footer__content', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 95%',
            once: true
        },
        scale: 0.98,
        duration: 0.5,
        ease: 'power2.out'
    });
}

/*==================== NUMBER COUNTER ANIMATION ====================*/
function initNumberCounters() {
    const numberElements = document.querySelectorAll('.number-card__number');

    numberElements.forEach(numEl => {
        const target = parseInt(numEl.getAttribute('data-target'));

        // Set initial value to 0
        numEl.textContent = '0';

        gsap.to(numEl, {
            scrollTrigger: {
                trigger: numEl.closest('.number-card'),
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
                numEl.textContent = Math.round(this.targets()[0].textContent);
            }
        });
    });
}

/*==================== PARALLAX EFFECTS ====================*/
function initParallax() {
    // Hero gradient parallax
    gsap.to('.hero__gradient', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        opacity: 0.5
    });

    // Subtle parallax on section titles
    gsap.utils.toArray('.section__title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
}

/*==================== HOVER ANIMATIONS ====================*/
function initHoverEffects() {
    // Number cards hover enhancement
    const numberCards = document.querySelectorAll('.number-card');

    numberCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Etymology cards hover
    const etymologyCards = document.querySelectorAll('.etymology__card');

    etymologyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                x: 5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                x: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

/*==================== SMOOTH SCROLL ====================*/
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 70
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });
}

/*==================== SCROLL TO TOP ====================*/
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: 0 },
            ease: 'power3.inOut'
        });
    });

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            gsap.to(scrollTopBtn, {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.3
            });
        } else {
            gsap.to(scrollTopBtn, {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.3
            });
        }
    });
}

/*==================== TEXT REVEAL ANIMATION ====================*/
function initTextReveal() {
    // Animate emphasized text on scroll
    gsap.utils.toArray('em, strong').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 0.3,
            duration: 0.5
        });
    });
}

/*==================== INITIALIZE ALL ANIMATIONS ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Create particles first
    createParticles();

    // Initialize hero animations
    initHeroAnimations();

    // Initialize scroll-triggered animations
    initScrollAnimations();

    // Initialize number counters
    initNumberCounters();

    // Initialize parallax effects
    initParallax();

    // Initialize hover effects
    initHoverEffects();

    // Initialize text reveal
    initTextReveal();

    // Set initial state for scroll-top button
    if (scrollTopBtn) {
        gsap.set(scrollTopBtn, { opacity: 0, pointerEvents: 'none' });
    }
});

/*==================== REFRESH SCROLLTRIGGER ON RESIZE ====================*/
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
