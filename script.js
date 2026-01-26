/* =====================================================
   ID TAXI - JavaScript Interactions
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide icons
    lucide.createIcons();

    // Logo Animation
    initLogoAnimation();

    // Header scroll effect
    initHeaderScroll();

    // Mobile menu
    initMobileMenu();

    // Smooth scroll for anchor links
    initSmoothScroll();

    // Form submission
    initContactForm();

    // Scroll animations
    initScrollAnimations();

    // Testimonials carousel
    initTestimonialsCarousel();
});

/* Header Scroll Effect (Optimisé avec throttle)
   ===================================================== */
function initHeaderScroll() {
    const header = document.getElementById('header');
    let ticking = false;

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    handleScroll(); // Initial check
}

/* Mobile Menu
   ===================================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        if (header) header.classList.toggle('menu-open');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';

        // Re-initialize icons to ensure they show up if added dynamically
        lucide.createIcons();
    });

    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            if (header) header.classList.remove('menu-open');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            if (header) header.classList.remove('menu-open');
            document.body.style.overflow = '';
        }
    });
}

/* Smooth Scroll (Optimisé)
   ===================================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* Contact Form
   ===================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate form
        const requiredFields = ['name', 'phone', 'email', 'service'];
        let isValid = true;

        requiredFields.forEach(field => {
            const input = form.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });

        if (!isValid) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Envoi en cours...</span>';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Create mailto link with form data
            const subject = encodeURIComponent(`Demande de devis - ${data.service}`);
            const body = encodeURIComponent(
                `Nom: ${data.name}\n` +
                `Téléphone: ${data.phone}\n` +
                `Email: ${data.email}\n` +
                `Service: ${data.service}\n\n` +
                `Message:\n${data.message || 'Non spécifié'}`
            );

            window.location.href = `mailto:idtaxi@gmail.com?subject=${subject}&body=${body}`;

            showNotification('Votre demande a été préparée. Votre client mail va s\'ouvrir.', 'success');

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 1000);
    });
}

/* Notification System
   ===================================================== */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    const closeBtn = notification.querySelector('button');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        line-height: 1;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

/* Scroll Animations (Optimisé - moins d'éléments, plus fluide)
   ===================================================== */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('animate-in');
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Éléments principaux uniquement (réduit pour performance)
    const elementsToAnimate = [
        '.section-header',
        '.feature-card',
        '.service-card',
        '.contact-card',
        '.about-card',
        '.zones-highlight',
        '.zones-visual',
        '.cta-content'
    ];

    const elements = document.querySelectorAll(elementsToAnimate.join(', '));

    elements.forEach((el) => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });
}

/* Testimonials Carousel
   ===================================================== */
function initTestimonialsCarousel() {
    const track = document.getElementById('testimonialsTrack');
    if (!track) return;

    // Data for generating reviews
    const names = [
        "Marie D.", "Pierre L.", "Sophie M.", "Jean-Claude R.", "Thomas B.",
        "Lucas M.", "Camille D.", "Nicolas F.", "Julie P.", "Antoine B.",
        "Sarah L.", "David G.", "Emma R.", "Julien T.", "Aurélie M.",
        "François D.", "Céline B.", "Mathieu S.", "Emilie V.", "Alexandre C.",
        "Léa M.", "Paul D.", "Chloé R.", "Guillaume P.", "Manon L.",
        "Maxime G.", "Laura B.", "Romain S.", "Elodie D.", "Kevin M.",
        "Audrey F.", "Benoit C.", "Alice P.", "Jérémy T.", "Marine L.",
        "Florian B.", "Charlotte D.", "Adrien M.", "Mélanie S.", "Vincent R."
    ];

    const cities = [
        "Enghien-les-Bains", "Saint-Gratien", "Argenteuil", "Ermont",
        "Eaubonne", "Montmorency", "Paris", "Sannois", "Franconville",
        "Deuil-la-Barre", "Soisy-sous-Montmorency", "Saint-Ouen", "Cergy",
        "Pontoise", "Bezons", "Herblay", "Taverny", "Groslay", "Montmagny", "Sarcelles"
    ];

    const services = [
        "Transfert Aéroport", "Trajet Personnalisé", "Transfert Gare",
        "RDV Médical", "Navette Orly", "Navette Roissy", "Déplacement Pro", "Sortie de nuit"
    ];

    const comments = [
        "Service impeccable, chauffeur très ponctuel.",
        "Je recommande vivement, voiture très propre.",
        "Trajet agréable, merci pour le professionnalisme.",
        "Parfait pour mes déplacements vers Roissy.",
        "Chauffeur sympathique et conduite douce.",
        "Toujours à l'heure, jamais déçu.",
        "Excellent rapport qualité prix.",
        "Très pratique pour aller à la gare avec les bagages.",
        "Merci pour la patience et la courtoisie.",
        "Le meilleur taxi du Val-d'Oise !",
        "Réservation facile et rapide.",
        "Conduite très sécurisante.",
        "Véhicule confortable, top.",
        "Service 5 étoiles, rien à dire.",
        "Ponctualité irréprochable à 4h du matin.",
        "Très bon service, je recommande.",
        "Chauffeur très aimable.",
        "Trajet rapide et efficace.",
        "Merci pour votre disponibilité.",
        "Super expérience, à bientôt."
    ];

    // Generate 20 unique reviews (réduit pour performance)
    let generatedReviews = [];
    for (let i = 0; i < 20; i++) {
        const name = names[i % names.length];
        const city = cities[i % cities.length];
        const service = services[i % services.length];
        const comment = comments[i % comments.length];

        generatedReviews.push({ name, city, service, comment });
    }

    // Function to create HTML card
    function createCard(review) {
        return `
            <div class="testimonial-card">
                <div class="testimonial-rating">
                    <i data-lucide="star" class="filled"></i>
                    <i data-lucide="star" class="filled"></i>
                    <i data-lucide="star" class="filled"></i>
                    <i data-lucide="star" class="filled"></i>
                    <i data-lucide="star" class="filled"></i>
                </div>
                <p class="testimonial-text">"${review.comment}"</p>
                <div class="testimonial-author">
                    <div class="author-avatar">${review.name.substring(0, 2)}</div>
                    <div class="author-info">
                        <span class="author-name">${review.name}</span>
                        <span class="author-location">${review.city}</span>
                    </div>
                </div>
                <span class="testimonial-service">${review.service}</span>
            </div>
        `;
    }

    // Add Loop Set 1
    generatedReviews.forEach(review => {
        track.innerHTML += createCard(review);
    });

    // Add Loop Set 2 (Clone for infinite scroll)
    generatedReviews.forEach(review => {
        track.innerHTML += createCard(review);
    });

    // Re-initialize icons for new elements
    lucide.createIcons();
}

/* Phone Number Formatting
   ===================================================== */
document.addEventListener('input', function (e) {
    if (e.target.matches('input[type="tel"]')) {
        let value = e.target.value.replace(/\D/g, '');

        // Format as French phone number
        if (value.length > 0) {
            if (value.startsWith('33')) {
                value = '0' + value.slice(2);
            }

            let formatted = '';
            for (let i = 0; i < value.length && i < 10; i++) {
                if (i > 0 && i % 2 === 0) {
                    formatted += ' ';
                }
                formatted += value[i];
            }
            e.target.value = formatted;
        }
    }
});

/* Active Navigation Link (Optimisé avec throttle)
   ===================================================== */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

let navTicking = false;
window.addEventListener('scroll', function() {
    if (!navTicking) {
        requestAnimationFrame(() => {
            updateActiveNavLink();
            navTicking = false;
        });
        navTicking = true;
    }
}, { passive: true });

/* Service Worker Registration (for PWA support)
   ===================================================== */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration can be added here for PWA support
        // navigator.serviceWorker.register('/sw.js');
    });
}

/* Logo Animation
   ===================================================== */
function initLogoAnimation() {
    const logoId = document.querySelector('.logo-id');
    const logoTaxi = document.querySelector('.logo-taxi');
    const logoLink = document.querySelector('.logo');

    if (!logoId || !logoTaxi || !logoLink) return;

    // Avoid double-initialization
    if (logoId.querySelector('span')) return;

    // Split text into spans for "ID"
    const idText = logoId.textContent;
    logoId.innerHTML = '';
    idText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${index * 0.1}s`;
        logoId.appendChild(span);
    });

    // Split text into spans for "TAXI"
    const taxiText = logoTaxi.textContent;
    logoTaxi.innerHTML = '';
    taxiText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        // Start "TAXI" after "ID" finishes (2 chars * 0.1s + small buffer)
        span.style.animationDelay = `${(idText.length * 0.1) + (index * 0.1)}s`;
        logoTaxi.appendChild(span);
    });

    // Add Underline
    const underline = document.createElement('div');
    underline.className = 'logo-underline';
    // Style override to match user request (start hidden then expand)
    logoLink.appendChild(underline);
}
