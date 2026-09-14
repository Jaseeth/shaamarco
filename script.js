// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Load common HTML partials
async function loadPartial(targetId, file) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const response = await fetch(file);
    if (!response.ok) throw new Error(`Could not load ${file}`);
    target.innerHTML = await response.text();
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) mobileMenu.classList.toggle('active');
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const updateNavbar = () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    };

    window.addEventListener('scroll', updateNavbar);
    updateNavbar();

    // Highlight current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

function initCounters() {
    // Counter animation
const counters = document.querySelectorAll('.counter');

if (counters.length > 0) {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target')) || 0;
        const format = counter.getAttribute('data-format') || '';
        const duration = 2000;
        const stepTime = 16;
        const totalSteps = Math.round(duration / stepTime);
        const increment = target / totalSteps;

        let current = 0;
        let started = false;

        const formatNumber = (value) => {
            const rounded = Math.floor(value);

            if (format === 'comma') {
                return rounded.toLocaleString();
            }

            return rounded;
        };

        const updateCounter = () => {
            current += increment;

            if (current < target) {
                counter.textContent = formatNumber(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = formatNumber(target);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !started) {
                    started = true;
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}
}

function initRevealAnimations() {
    document.querySelectorAll('.reveal').forEach((el, index) => {
        gsap.fromTo(el,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                delay: index % 3 * 0.1
            }
        );
    });
}

function initServiceAnimations() {
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        gsap.fromTo('.service-card',
            { opacity: 0, y: 50, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: { trigger: servicesGrid, start: 'top 80%' }
            }
        );
    }

    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, { y: -8, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', function() {
            gsap.to(this, { y: 0, duration: 0.3, ease: 'power2.out' });
        });
    });
}

function initFeatureAnimations() {
    const featuresGrid = document.querySelector('.features-grid');
    if (!featuresGrid) return;

    gsap.fromTo('.feature-card',
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: featuresGrid, start: 'top 80%' }
        }
    );
}

function initHeroAnimations() {
    if (document.querySelector('.hero-badge')) {
        gsap.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.3 });
    }
    if (document.querySelector('.hero-title')) {
        gsap.fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 });
    }
    if (document.querySelector('.hero-subtitle')) {
        gsap.fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.7 });
    }
    if (document.querySelector('.hero-buttons')) {
        gsap.fromTo('.hero-buttons', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.9 });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.submit-btn');
    if (!btn) return;

    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #00d4aa 0%, #0066cc 100%)';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = '';
            e.target.reset();
        }, 3000);
    }, 2000);
}

async function initSite() {
    try {
        await Promise.all([
            loadPartial('site-header', 'components/header.html'),
            loadPartial('site-footer', 'components/footer.html')
        ]);
    } catch (error) {
        console.error(error);
    }

    initNavbar();
    initParticles();
    initCounters();
    initRevealAnimations();
    initServiceAnimations();
    initFeatureAnimations();
    initHeroAnimations();
    initSmoothScroll();
    initParallax();
    ScrollTrigger.refresh();
}

document.addEventListener('DOMContentLoaded', initSite);

// Home About Image Animation
const homeAboutVisual = document.querySelector('.home-about-visual');

if (homeAboutVisual) {

    gsap.fromTo(
        homeAboutVisual,
        {
            opacity: 0,
            x: -60
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',

            scrollTrigger: {
                trigger: homeAboutVisual,
                start: 'top 80%'
            }
        }
    );

}


// Home About Content Animation
const homeAboutContent = document.querySelector('.home-about-content');

if (homeAboutContent) {

    gsap.fromTo(
        homeAboutContent,
        {
            opacity: 0,
            x: 60
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',

            scrollTrigger: {
                trigger: homeAboutContent,
                start: 'top 80%'
            }
        }
    );

}


// About feature items stagger
const homeAboutFeatures =
    document.querySelectorAll('.home-about-feature');

if (homeAboutFeatures.length > 0) {

    gsap.fromTo(
        homeAboutFeatures,
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,

            duration: 0.5,

            stagger: 0.12,

            ease: 'power2.out',

            scrollTrigger: {
                trigger: '.home-about-features',
                start: 'top 85%'
            }
        }
    );

}

// Stats band stagger animation
const statsBandItems = document.querySelectorAll('.stats-band-item');

if (statsBandItems.length > 0) {
    gsap.fromTo(
        statsBandItems,
        {
            opacity: 0,
            y: 40
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.stats-band-grid',
                start: 'top 85%'
            }
        }
    );
}

// Services bottom button animation
const servicesBottomBtn = document.querySelector(
    '.services .home-about-btn'
);

if (servicesBottomBtn) {
    gsap.fromTo(
        servicesBottomBtn,
        {
            opacity: 0,
            y: 30,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: servicesBottomBtn,
                start: 'top 90%'
            }
        }
    );
}


//about page
// Inner page hero animation
const innerHero = document.querySelector('.inner-hero');

if (innerHero) {

    gsap.fromTo(
        '.inner-hero-badge',
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: 'power3.out'
        }
    );


    gsap.fromTo(
        '.inner-hero-title',
        {
            opacity: 0,
            y: 35
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.35,
            ease: 'power3.out'
        }
    );


    gsap.fromTo(
        '.inner-hero-text',
        {
            opacity: 0,
            y: 25
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.55,
            ease: 'power3.out'
        }
    );


    gsap.fromTo(
        '.inner-hero-buttons',
        {
            opacity: 0,
            y: 25
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.75,
            ease: 'power3.out'
        }
    );

}

// Core Values Cards Animation
const coreValueCards =
    document.querySelectorAll('.core-value-card');

if (coreValueCards.length > 0) {

    gsap.fromTo(
        coreValueCards,
        {
            opacity: 0,
            y: 45,
            scale: 0.96
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,

            duration: 0.7,

            stagger: 0.15,

            ease: 'power3.out',

            scrollTrigger: {
                trigger: '.core-values-grid',
                start: 'top 82%'
            }
        }
    );

}

// About Why Choose Us Animation
const aboutWhyItems =
    document.querySelectorAll('.about-why-item');

if (aboutWhyItems.length > 0) {

    gsap.fromTo(
        aboutWhyItems,
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,

            duration: 0.6,

            stagger: 0.12,

            ease: 'power3.out',

            scrollTrigger: {
                trigger: '.about-why-list',
                start: 'top 85%'
            }
        }
    );

}

//service page
// How It Works stagger animation
const howItWorksCards =
    document.querySelectorAll('.how-it-works-card');

if (howItWorksCards.length > 0) {

    gsap.fromTo(
        howItWorksCards,
        {
            opacity: 0,
            y: 40,
            scale: 0.96
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,

            duration: 0.7,

            stagger: 0.15,

            ease: 'power3.out',

            scrollTrigger: {
                trigger: '.how-it-works-grid',
                start: 'top 82%'
            }
        }
    );

}

const serviceCta = document.querySelector('.service-cta-wrapper');

if (serviceCta) {

    gsap.fromTo(
        serviceCta,
        {
            opacity: 0,
            y: 40,
            scale: 0.97
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,

            duration: 0.9,

            ease: 'power3.out',

            scrollTrigger: {
                trigger: serviceCta,
                start: 'top 85%'
            }
        }
    );

}


//home banner scroller effect
const scrollToIntro = document.getElementById('scrollToIntro');

if (scrollToIntro) {
    scrollToIntro.addEventListener('click', () => {

        const introSection = document.getElementById('intro');

        if (introSection) {
            gsap.to(window, {
                duration: 1.8,
                scrollTo: {
                    y: introSection,
                    offsetY: 70
                },
                ease: 'power2.inOut'
            });
        }

    });
}