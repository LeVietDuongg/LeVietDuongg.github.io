/* ...existing code... */

// Example scroll animation or DOM event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.getElementById('navbar');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Fixed header on scroll
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '20px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
});
