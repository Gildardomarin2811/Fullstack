// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll animations
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function isElementPartiallyInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return (rect.top < windowHeight && rect.bottom > 0);
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.module, .benefit, .testimonial, .pricing-card');
    
    elements.forEach(el => {
        if (isElementPartiallyInViewport(el) && !el.classList.contains('animated')) {
            el.classList.add('animate-on-scroll');
            setTimeout(() => {
                el.classList.add('animated');
            }, Math.random() * 200);
        }
    });
}

// Initial check
document.addEventListener('DOMContentLoaded', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Add initial animation class to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.module, .benefit, .testimonial, .pricing-card');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Reset form
        this.reset();
        
        // Show success message
        submitButton.textContent = '¡Mensaje Enviado!';
        submitButton.style.background = 'var(--success-500)';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = 'var(--primary-600)';
        }, 2000);
        
        // You would typically send this data to your server here
        console.log('Form submitted:', { name, email, subject, message });
    }, 1500);
});

// Pricing button interactions
document.querySelectorAll('.pricing-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const card = this.closest('.pricing-card');
        const planName = card.querySelector('h3').textContent;
        const price = card.querySelector('.amount').textContent;
        
        // Simulate purchase process
        const originalText = this.textContent;
        this.textContent = 'Procesando...';
        this.disabled = true;
        
        setTimeout(() => {
            alert(`¡Gracias por elegir el plan ${planName}! Serás redirigido al proceso de pago.`);
            this.textContent = originalText;
            this.disabled = false;
        }, 1500);
        
        // You would typically redirect to a payment processor here
        console.log('Plan selected:', { planName, price });
    });
});

// Hero CTA buttons
document.querySelectorAll('.hero-buttons .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('Comenzar')) {
            e.preventDefault();
            // Scroll to pricing section
            document.getElementById('precios').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else if (this.textContent.includes('Demo')) {
            e.preventDefault();
            // Show demo modal or redirect to demo
            alert('¡Demo gratuita disponible! Serás redirigido a nuestra plataforma de demostración.');
            console.log('Demo requested');
        }
    });
});

// Add typing effect to hero title
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

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.innerHTML;
    
    // Add a slight delay before starting the typing effect
    setTimeout(() => {
        typeWriter(heroTitle, originalText.replace(/<[^>]*>/g, ''), 50);
    }, 500);
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add pulse effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'pulse 1s infinite';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.animation = 'none';
        });
    });
    
    // Add tilt effect to cards
    const cards = document.querySelectorAll('.module, .testimonial, .pricing-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .code-preview {
        animation: float 6s ease-in-out infinite;
    }
    
    .hero-stats .stat {
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .hero-stats .stat:nth-child(1) { animation-delay: 0.2s; }
    .hero-stats .stat:nth-child(2) { animation-delay: 0.4s; }
    .hero-stats .stat:nth-child(3) { animation-delay: 0.6s; }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});