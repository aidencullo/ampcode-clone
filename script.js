// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-based navbar background
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
    }

    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.thread-card, .news-item, .testimonial-card, .install-option').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add interactive hover effect to CTA button
const ctaButton = document.querySelector('.btn-cta');
if (ctaButton) {
    ctaButton.addEventListener('mousemove', (e) => {
        const rect = ctaButton.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctaButton.style.setProperty('--mouse-x', `${x}px`);
        ctaButton.style.setProperty('--mouse-y', `${y}px`);
    });
}

// Dynamic gradient effect on hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        const color1 = `hsl(${hue}, 70%, 85%)`;
        const color2 = `hsl(${(hue + 60) % 360}, 50%, 70%)`;
        heroTitle.style.backgroundImage = `linear-gradient(135deg, ${color1}, ${color2})`;
    }, 50);
}

// Add typing effect to hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let index = 0;

    const typeWriter = () => {
        if (index < text.length) {
            heroSubtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    };

    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// Add particle effect to background (lightweight)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.backgroundColor = 'rgba(99, 102, 241, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-10px';
    particle.style.zIndex = '1';

    document.body.appendChild(particle);

    const duration = 3000 + Math.random() * 2000;
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress < 1) {
            particle.style.top = (progress * window.innerHeight) + 'px';
            particle.style.opacity = 1 - progress;
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }

    animate();
}

// Create particles periodically
setInterval(createParticle, 300);

// Add click ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-cta').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('Amp website loaded successfully!');
