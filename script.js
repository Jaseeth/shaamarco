// =========================================================
// 1. GSAP PLUGINS
// =========================================================

if (typeof gsap !== "undefined") {
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  if (typeof ScrollToPlugin !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
  }
}

// =========================================================
// 2. EMAILJS CONFIGURATION
// =========================================================

const EMAILJS_PUBLIC_KEY = "DoK2WplCVEFOfgaLt";
const EMAILJS_SERVICE_ID = "service_i0injka";
const EMAILJS_TEMPLATE_ID = "template_94pzaap";

let emailJsInitialized = false;

function initEmailJS() {
  if (emailJsInitialized) {
    return true;
  }

  if (typeof emailjs === "undefined") {
    return false;
  }

  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
  });

  emailJsInitialized = true;

  return true;
}

// =========================================================
// 3. LOAD COMMON HTML COMPONENT
// =========================================================

async function loadPartial(targetId, file) {
  const target = document.getElementById(targetId);

  if (!target) return;

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Could not load ${file}. Status: ${response.status}`);
    }

    const html = await response.text();

    target.innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
}

// =========================================================
// 4. MOBILE MENU
// =========================================================

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");

  if (!mobileMenu) return;

  mobileMenu.classList.toggle("active");
}

// Required because header.html uses onclick=""
window.toggleMobileMenu = toggleMobileMenu;

// =========================================================
// 5. NAVBAR
// =========================================================

function initNavbar() {
  const navbar = document.getElementById("navbar");

  if (!navbar) return;

  const updateNavbar = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", updateNavbar);

  updateNavbar();

  // Active navigation link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");

    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

// =========================================================
// 6. HERO PARTICLES
// =========================================================

function initParticles() {
  const particlesContainer = document.getElementById("particles");

  if (!particlesContainer) return;

  // Prevent duplicates
  if (particlesContainer.children.length > 0) {
    return;
  }

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");

    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration = Math.random() * 10 + 10 + "s";

    particle.style.animationDelay = Math.random() * 10 + "s";

    particle.style.width = Math.random() * 4 + 2 + "px";

    particle.style.height = particle.style.width;

    particlesContainer.appendChild(particle);
  }
}

// =========================================================
// 7. COUNTERS
// =========================================================

function initCounters() {
  const counters = document.querySelectorAll(".counter");

  if (!counters.length) return;

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"), 10) || 0;

    const format = counter.getAttribute("data-format") || "";

    const duration = 2000;

    const stepTime = 16;

    const totalSteps = Math.round(duration / stepTime);

    const increment = target / totalSteps;

    let current = 0;

    let started = false;

    const formatNumber = (value) => {
      const rounded = Math.floor(value);

      if (format === "comma") {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;

            updateCounter();

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(counter);
  });
}

// =========================================================
// 8. GENERAL REVEAL ANIMATION
// =========================================================

function initRevealAnimations() {
  if (typeof gsap === "undefined") {
    return;
  }

  document.querySelectorAll(".reveal").forEach((el, index) => {
    // These already have
    // separate animations

    if (
      el.classList.contains("service-card") ||
      el.classList.contains("feature-card") ||
      el.classList.contains("core-value-card") ||
      el.classList.contains("about-why-item") ||
      el.classList.contains("how-it-works-card") ||
      el.classList.contains("service-cta-wrapper")
    ) {
      return;
    }

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,

        duration: 0.8,

        ease: "power3.out",

        delay: (index % 3) * 0.1,

        scrollTrigger:
          typeof ScrollTrigger !== "undefined"
            ? {
                trigger: el,

                start: "top 85%",

                toggleActions: "play none none none",
              }
            : undefined,
      },
    );
  });
}

// =========================================================
// 9. SERVICES COMPONENT
// =========================================================

async function loadServicesComponent() {
  const container = document.getElementById("services-component");

  if (!container) {
    return;
  }

  try {
    const response = await fetch("components/services-section.html");

    if (!response.ok) {
      throw new Error(
        `Services component failed to load. Status: ${response.status}`,
      );
    }

    const html = await response.text();

    container.innerHTML = html;
  } catch (error) {
    console.error("Services component error:", error);
  }
}

// =========================================================
// 10. SERVICE CARD ANIMATIONS
// =========================================================

function initServiceAnimations() {
  if (typeof gsap === "undefined") {
    return;
  }

  const servicesGrid = document.querySelector(".services-grid");

  if (!servicesGrid) {
    return;
  }

  const serviceCards = servicesGrid.querySelectorAll(".service-card");

  if (!serviceCards.length) {
    return;
  }

  gsap.fromTo(
    serviceCards,
    {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,

      duration: 0.7,

      stagger: 0.15,

      ease: "power3.out",

      scrollTrigger:
        typeof ScrollTrigger !== "undefined"
          ? {
              trigger: servicesGrid,

              start: "top 80%",
            }
          : undefined,
    },
  );

  serviceCards.forEach((card) => {
    // Prevent duplicate
    // mouse events

    if (card.dataset.hoverInitialized === "true") {
      return;
    }

    card.dataset.hoverInitialized = "true";

    card.addEventListener("mouseenter", function () {
      gsap.to(this, {
        y: -8,

        duration: 0.3,

        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", function () {
      gsap.to(this, {
        y: 0,

        duration: 0.3,

        ease: "power2.out",
      });
    });
  });
}

// =========================================================
// 11. FEATURE CARDS
// =========================================================

function initFeatureAnimations() {
  if (typeof gsap === "undefined") {
    return;
  }

  const featuresGrid = document.querySelector(".features-grid");

  if (!featuresGrid) return;

  const cards = featuresGrid.querySelectorAll(".feature-card");

  if (!cards.length) return;

  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,

      duration: 0.8,

      stagger: 0.2,

      ease: "power3.out",

      scrollTrigger:
        typeof ScrollTrigger !== "undefined"
          ? {
              trigger: featuresGrid,

              start: "top 80%",
            }
          : undefined,
    },
  );
}

// =========================================================
// 12. HOME HERO
// =========================================================

function initHeroAnimations() {
  if (typeof gsap === "undefined") {
    return;
  }

  const animations = [
    {
      selector: ".hero-badge",

      y: 20,

      duration: 0.6,

      delay: 0.3,
    },

    {
      selector: ".hero-title",

      y: 30,

      duration: 0.8,

      delay: 0.5,
    },

    {
      selector: ".hero-subtitle",

      y: 20,

      duration: 0.6,

      delay: 0.7,
    },

    {
      selector: ".hero-buttons",

      y: 20,

      duration: 0.6,

      delay: 0.9,
    },
  ];

  animations.forEach((item) => {
    const element = document.querySelector(item.selector);

    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,

        y: item.y,
      },
      {
        opacity: 1,

        y: 0,

        duration: item.duration,

        delay: item.delay,

        ease: "power3.out",
      },
    );
  });
}

// =========================================================
// 13. SMOOTH SCROLL
// =========================================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const href = this.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",

          block: "start",
        });
      }
    });
  });
}

// =========================================================
// 14. HERO PARALLAX
// =========================================================

function initParallax() {
  const heroContent = document.querySelector(".hero-content");

  if (!heroContent) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    if (scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });
}

// =========================================================
// 15. HOME ABOUT
// =========================================================

function initHomeAboutAnimations() {
  if (typeof gsap === "undefined") {
    return;
  }

  const visual = document.querySelector(".home-about-visual");

  if (visual) {
    gsap.fromTo(
      visual,
      {
        opacity: 0,

        x: -60,
      },
      {
        opacity: 1,

        x: 0,

        duration: 1,

        ease: "power3.out",

        scrollTrigger:
          typeof ScrollTrigger !== "undefined"
            ? {
                trigger: visual,

                start: "top 80%",
              }
            : undefined,
      },
    );
  }

  const content = document.querySelector(".home-about-content");

  if (content) {
    gsap.fromTo(
      content,
      {
        opacity: 0,

        x: 60,
      },
      {
        opacity: 1,

        x: 0,

        duration: 1,

        ease: "power3.out",

        scrollTrigger:
          typeof ScrollTrigger !== "undefined"
            ? {
                trigger: content,

                start: "top 80%",
              }
            : undefined,
      },
    );
  }

  const features = document.querySelectorAll(".home-about-feature");

  const featureWrapper = document.querySelector(".home-about-features");

  if (features.length && featureWrapper) {
    gsap.fromTo(
      features,
      {
        opacity: 0,

        y: 20,
      },
      {
        opacity: 1,

        y: 0,

        duration: 0.5,

        stagger: 0.12,

        ease: "power2.out",

        scrollTrigger:
          typeof ScrollTrigger !== "undefined"
            ? {
                trigger: featureWrapper,

                start: "top 85%",
              }
            : undefined,
      },
    );
  }
}

// =========================================================
// 16. STATS BAND
// =========================================================

function initStatsBandAnimations() {
  if (typeof gsap === "undefined") {
    return;
  }

  const items = document.querySelectorAll(".stats-band-item");

  const grid = document.querySelector(".stats-band-grid");

  if (!items.length || !grid) {
    return;
  }

  gsap.fromTo(
    items,
    {
      opacity: 0,

      y: 40,
    },
    {
      opacity: 1,

      y: 0,

      duration: 0.8,

      stagger: 0.15,

      ease: "power3.out",

      scrollTrigger:
        typeof ScrollTrigger !== "undefined"
          ? {
              trigger: grid,

              start: "top 85%",
            }
          : undefined,
    },
  );
}

// =========================================================
// 17. SERVICE BUTTON
// =========================================================

function initServicesBottomButton() {
  if (typeof gsap === "undefined") {
    return;
  }

  const button = document.querySelector(".services .home-about-btn");

  if (!button) return;

  gsap.fromTo(
    button,
    {
      opacity: 0,

      y: 30,

      scale: 0.95,
    },
    {
      opacity: 1,

      y: 0,

      scale: 1,

      duration: 0.7,

      ease: "power3.out",

      scrollTrigger:
        typeof ScrollTrigger !== "undefined"
          ? {
              trigger: button,

              start: "top 90%",
            }
          : undefined,
    },
  );
}

// =========================================================
// 18. INNER PAGE HERO
// =========================================================

function initInnerHeroAnimations() {
  if (typeof gsap === "undefined") {
    return;
  }

  const hero = document.querySelector(".inner-hero");

  if (!hero) return;

  const animations = [
    {
      selector: ".inner-hero-badge",

      y: 20,

      duration: 0.6,

      delay: 0.2,
    },

    {
      selector: ".inner-hero-title",

      y: 35,

      duration: 0.8,

      delay: 0.35,
    },

    {
      selector: ".inner-hero-text",

      y: 25,

      duration: 0.7,

      delay: 0.55,
    },

    {
      selector: ".inner-hero-buttons",

      y: 25,

      duration: 0.7,

      delay: 0.75,
    },
  ];

  animations.forEach((item) => {
    const element = document.querySelector(item.selector);

    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,

        y: item.y,
      },
      {
        opacity: 1,

        y: 0,

        duration: item.duration,

        delay: item.delay,

        ease: "power3.out",
      },
    );
  });
}

// =========================================================
// 19. CORE VALUES
// =========================================================

function initCoreValueAnimations() {
  if (typeof gsap === "undefined") {
    return;
  }

  const cards = document.querySelectorAll(".core-value-card");

  const grid = document.querySelector(".core-values-grid");

  if (!cards.length || !grid) {
    return;
  }

  gsap.fromTo(
    cards,
    {
      opacity: 0,

      y: 45,

      scale: 0.96,
    },
    {
      opacity: 1,

      y: 0,

      scale: 1,

      duration: 0.7,

      stagger: 0.15,

      ease: "power3.out",

      scrollTrigger:
        typeof ScrollTrigger !== "undefined"
          ? {
              trigger: grid,

              start: "top 82%",
            }
          : undefined,
    },
  );
}

// =========================================================
// 20. ABOUT WHY US
// =========================================================

function initAboutWhyAnimations() {
  if (typeof gsap === "undefined") {
    return;
  }

  const items = document.querySelectorAll(".about-why-item");

  const list = document.querySelector(".about-why-list");

  if (!items.length || !list) {
    return;
  }

  gsap.fromTo(
    items,
    {
      opacity: 0,

      y: 30,
    },
    {
      opacity: 1,

      y: 0,

      duration: 0.6,

      stagger: 0.12,

      ease: "power3.out",

      scrollTrigger:
        typeof ScrollTrigger !== "undefined"
          ? {
              trigger: list,

              start: "top 85%",
            }
          : undefined,
    },
  );
}

// =========================================================
// 21. HOW IT WORKS
// =========================================================

function initHowItWorksAnimations() {
  if (typeof gsap === "undefined") {
    return;
  }

  const cards = document.querySelectorAll(".how-it-works-card");

  const grid = document.querySelector(".how-it-works-grid");

  if (!cards.length || !grid) {
    return;
  }

  gsap.fromTo(
    cards,
    {
      opacity: 0,

      y: 40,

      scale: 0.96,
    },
    {
      opacity: 1,

      y: 0,

      scale: 1,

      duration: 0.7,

      stagger: 0.15,

      ease: "power3.out",

      scrollTrigger:
        typeof ScrollTrigger !== "undefined"
          ? {
              trigger: grid,

              start: "top 82%",
            }
          : undefined,
    },
  );
}

// =========================================================
// 22. SERVICE CTA
// =========================================================

function initServiceCtaAnimation() {
  if (typeof gsap === "undefined") {
    return;
  }

  const serviceCta = document.querySelector(".service-cta-wrapper");

  if (!serviceCta) return;

  gsap.fromTo(
    serviceCta,
    {
      opacity: 0,

      y: 40,

      scale: 0.97,
    },
    {
      opacity: 1,

      y: 0,

      scale: 1,

      duration: 0.9,

      ease: "power3.out",

      scrollTrigger:
        typeof ScrollTrigger !== "undefined"
          ? {
              trigger: serviceCta,

              start: "top 85%",
            }
          : undefined,
    },
  );
}

// =========================================================
// 23. HOME SCROLL INDICATOR
// =========================================================

function initScrollIndicator() {
  const scrollToIntro = document.getElementById("scrollToIntro");

  if (!scrollToIntro) return;

  scrollToIntro.addEventListener("click", () => {
    const intro = document.getElementById("intro");

    if (!intro) return;

    if (typeof gsap !== "undefined" && typeof ScrollToPlugin !== "undefined") {
      gsap.to(window, {
        duration: 1.8,

        scrollTo: {
          y: intro,

          offsetY: 70,
        },

        ease: "power2.inOut",
      });
    } else {
      intro.scrollIntoView({
        behavior: "smooth",

        block: "start",
      });
    }
  });
}

// =========================================================
// 24. CONTACT FORM / EMAILJS
// =========================================================

async function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;

  const button = form.querySelector(".submit-btn");

  if (!button) return;

  const originalText = button.innerHTML;

  // Browser validation
  if (!form.checkValidity()) {
    form.reportValidity();

    return;
  }

  // Initialize EmailJS
  if (!initEmailJS()) {
    console.error("EmailJS is not loaded.");

    button.innerHTML =
      '<i class="fas fa-circle-exclamation"></i> Unable to Send';

    setTimeout(() => {
      button.innerHTML = originalText;
    }, 3000);

    return;
  }

  const name = document.getElementById("name");

  const phone = document.getElementById("phone");

  const email = document.getElementById("email");

  const service = document.getElementById("service");

  const message = document.getElementById("message");

  if (!name || !phone || !email || !service || !message) {
    console.error("Contact form fields are missing.");

    return;
  }

  button.disabled = true;

  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  const templateParams = {
    name: name.value.trim(),

    phone: phone.value.trim(),

    email: email.value.trim(),

    service: service.value,

    message: message.value.trim(),
  };

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,

      EMAILJS_TEMPLATE_ID,

      templateParams,
    );

    button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';

    form.reset();

    setTimeout(() => {
      button.innerHTML = originalText;

      button.disabled = false;
    }, 3000);
  } catch (error) {
    console.error("EmailJS error:", error);

    button.innerHTML =
      '<i class="fas fa-circle-exclamation"></i> Failed to Send';

    setTimeout(() => {
      button.innerHTML = originalText;

      button.disabled = false;
    }, 3000);
  }
}

// Needed because form uses:
// onsubmit="handleSubmit(event)"
window.handleSubmit = handleSubmit;

// =========================================================
// 25. INITIALIZE ENTIRE WEBSITE
// =========================================================

async function initSite() {
  // EmailJS only initializes
  // when library exists
  initEmailJS();

  initHeroAirEffect();

  // IMPORTANT:
  // Load components FIRST
  await Promise.all([
    loadPartial("site-header", "components/header.html"),

    loadPartial("site-footer", "components/footer.html"),

    loadServicesComponent(),
  ]);

  // =====================================================
  // HEADER
  // =====================================================

  initNavbar();

  // =====================================================
  // HOME
  // =====================================================

  initParticles();

  initCounters();

  initHeroAnimations();

  initHomeAboutAnimations();

  initStatsBandAnimations();

  initScrollIndicator();

  initParallax();

  // =====================================================
  // GENERAL
  // =====================================================

  initRevealAnimations();

  initFeatureAnimations();

  initSmoothScroll();

  // =====================================================
  // SERVICES
  // =====================================================

  initServiceAnimations();

  initServicesBottomButton();

  initHowItWorksAnimations();

  initServiceCtaAnimation();

  // =====================================================
  // INNER PAGES
  // =====================================================

  initInnerHeroAnimations();

  initCoreValueAnimations();

  initAboutWhyAnimations();

  // Refresh GSAP positions
  if (typeof ScrollTrigger !== "undefined") {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }
}

// =========================================================
// 26. START WEBSITE
// =========================================================

document.addEventListener("DOMContentLoaded", initSite);

// =========================================================
// HERO COOL AIR PARTICLES
// =========================================================

function initHeroAirEffect() {
  const container = document.getElementById("heroAirEffect");

  if (!container) return;

  // Avoid duplicate particles
  if (container.querySelector(".air-particle")) {
    return;
  }

  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");

    particle.className = "air-particle";

    container.appendChild(particle);

    const size = gsap.utils.random(2, 6);

    gsap.set(particle, {
      width: size,

      height: size,

      x: gsap.utils.random(0, window.innerWidth),

      y: gsap.utils.random(0, container.offsetHeight),

      opacity: gsap.utils.random(0.55, 0.9),
    });

    animateAirParticle(particle, container);
  }
}

function animateAirParticle(particle, container) {
  const duration = gsap.utils.random(6, 11);

  const startX = gsap.utils.random(0, container.offsetWidth);

  const startY = container.offsetHeight + gsap.utils.random(20, 100);

  const endX = startX + gsap.utils.random(-120, 120);

  gsap.set(particle, {
    x: startX,

    y: startY,

    opacity: 0,
  });

  gsap.to(particle, {
    x: endX,

    y: gsap.utils.random(-80, -20),

    opacity: 0.9,

    duration: duration,

    ease: "none",

    onComplete: () => {
      animateAirParticle(particle, container);
    },
  });

  gsap.to(particle, {
    opacity: 0,

    delay: duration * 0.65,

    duration: duration * 0.25,
  });
}
