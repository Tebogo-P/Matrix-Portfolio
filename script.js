// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-=<>[]{}";
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * canvas.height;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00FF41';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = matrix.charAt(Math.floor(Math.random() * matrix.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Hamburger Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');
    
    if (navLinks.classList.contains('active') && 
        !navContainer.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const themeBtn = document.querySelector('.theme-toggle');
    
    if (currentTheme === 'light') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        themeBtn.textContent = '◐ THEME';
    } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeBtn.textContent = '◑ THEME';
    }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.querySelector('.theme-toggle');
    
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeBtn) themeBtn.textContent = '◑ THEME';
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Highlighting
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let current = '';
    const navHeight = document.querySelector('nav').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        link.style.textShadow = '';
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.style.color = 'var(--matrix-green)';
            link.style.textShadow = 'var(--glow-text)';
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);
window.addEventListener('load', highlightActiveSection);

// Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll(
        '.project-card, .quote-card, .certificate-badge, .stat-box, .skill-category, .contact-btn'
    );
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
});

// Contact Form Handler
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Replace with your actual form submission endpoint
    // Example endpoints:
    // - FormSpree: 'https://formspree.io/f/YOUR_FORM_ID'
    // - Netlify Forms: Built-in (just add name="contact" to form)
    // - Your own backend API endpoint
    
    const endpoint = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your endpoint
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert('> MESSAGE_SENT_SUCCESSFULLY\n> THANK_YOU_FOR_CONTACTING_ME\n> I_WILL_RESPOND_SOON');
            form.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('> ERROR_SENDING_MESSAGE\n> PLEASE_TRY_EMAIL_DIRECTLY:\n> piitebogo12@gmail.com');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Performance Optimization: Debounce scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedHighlight = debounce(highlightActiveSection, 10);
window.removeEventListener('scroll', highlightActiveSection);
window.addEventListener('scroll', debouncedHighlight);

// Console Easter Egg
console.log('%c> SYSTEM_INITIALIZED', 'color: #00FF41; font-size: 20px; font-family: monospace; font-weight: bold;');
console.log('%c> WELCOME_TO_TEBOGO.DEV', 'color: #00FF41; font-size: 16px; font-family: monospace;');
console.log('%c> ========================================', 'color: #008F11; font-size: 12px; font-family: monospace;');
console.log('%c> STATUS: SEEKING_INTERNSHIP_OPPORTUNITIES', 'color: #00CC33; font-size: 14px; font-family: monospace;');
console.log('%c> EDUCATION: CPUT_DIPLOMA_STUDENT', 'color: #00CC33; font-size: 14px; font-family: monospace;');
console.log('%c> SPECIALIZATION: JAVA | SQL | WEB_DEV', 'color: #00CC33; font-size: 14px; font-family: monospace;');
console.log('%c> ========================================', 'color: #008F11; font-size: 12px; font-family: monospace;');
console.log('%c> CONTACT: piitebogo12@gmail.com', 'color: #008F11; font-size: 12px; font-family: monospace;');
console.log('%c> PHONE: 067_120_7297', 'color: #008F11; font-size: 12px; font-family: monospace;');
console.log('%c> GITHUB: github.com/Tebogo-P', 'color: #008F11; font-size: 12px; font-family: monospace;');
console.log('%c> ========================================', 'color: #008F11; font-size: 12px; font-family: monospace;');

// Add smooth fade-in on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth hover effects for project and blog cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .blog-card, .certificate-badge');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add typing effect to hero section (optional - can be disabled)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Accessibility: Add focus visible for keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
});

// Add keyboard navigation styling
const style = document.createElement('style');
style.textContent = `
    body.keyboard-nav *:focus {
        outline: 2px solid var(--matrix-green);
        outline-offset: 3px;
    }
`;
document.head.appendChild(style);

// Error handling for images
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// Smooth scroll to top function (optional)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button (optional - appears after scrolling down)
document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--matrix-green);
        color: var(--black);
        border: none;
        border-radius: 0;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        font-weight: bold;
    `;
    
    scrollBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    }, 100));
    
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = 'var(--glow-medium)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Print CV information to console for recruiters
console.log('%c\n📄 CV QUICK INFO', 'color: #00FF41; font-size: 18px; font-family: monospace; font-weight: bold;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #008F11; font-family: monospace;');
console.log('%cName: Tebogo Pii', 'color: #00CC33; font-family: monospace;');
console.log('%cEducation: CPUT - Diploma in ICT: Application Development (2nd Year)', 'color: #00CC33; font-family: monospace;');
console.log('%cSkills: Java, SQL, HTML5, CSS3, JavaScript, JDBC, Apache Derby', 'color: #00CC33; font-family: monospace;');
console.log('%cProjects: 4+ Academic & Personal Projects', 'color: #00CC33; font-family: monospace;');
console.log('%cCertifications: 13+ Completed (Including Google IT Support)', 'color: #00CC33; font-family: monospace;');
console.log('%cStatus: Seeking Internship Opportunities', 'color: #00FF41; font-family: monospace; font-weight: bold;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #008F11; font-family: monospace;');
console.log('%c📥 Download Full CV: Click the "DOWNLOAD CV" button above', 'color: #008F11; font-family: monospace;');
console.log('%c\n', 'color: #008F11;');

// Analytics event tracking (optional - for Google Analytics)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track CV downloads
document.addEventListener('DOMContentLoaded', () => {
    const cvButtons = document.querySelectorAll('a[download], a[href*="CV"]');
    cvButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('Engagement', 'CV_Download', 'Download_CV_Button');
            console.log('%c> CV_DOWNLOAD_INITIATED', 'color: #00FF41; font-family: monospace;');
        });
    });
    
    // Track external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', () => {
            const url = link.href;
            if (url.includes('github')) {
                trackEvent('External_Link', 'GitHub_Click', url);
            } else if (url.includes('linkedin')) {
                trackEvent('External_Link', 'LinkedIn_Click', url);
            }
        });
    });
});