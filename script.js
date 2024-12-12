// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-bg';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 33);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typewriter Effect
function typeWriter() {
    const text = "Web Designer | Web Developer | Security Researcher";
    const element = document.getElementById('typewriter-text');
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                element.textContent = '';
                index = 0;
                type();
            }, 3000);
        }
    }

    type();
}

// Scroll Reveal Animation
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
            } else {
                entry.target.classList.add('hidden');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });
}

// Form Handling
function initFormHandling() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add glitch animation to button
            const button = form.querySelector('button');
            button.classList.add('glitch');
            
            // Simulate form submission
            setTimeout(() => {
                alert('Message sent successfully!');
                form.reset();
                button.classList.remove('glitch');
            }, 1000);
        });
    }
}

// Glitch Effect on Hover
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.animation = 'none';
            void element.offsetWidth; // Trigger reflow
            element.style.animation = null;
        });
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createMatrixRain();
    initScrollReveal();
    initGlitchEffect();

    // Only run typeWriter on the home page
    if (document.getElementById('typewriter-text')) {
        typeWriter();
    }

    // Only run form handling on pages with the contact form
    if (document.getElementById('contact-form')) {
        initFormHandling();
    }

});

// Smooth scrolling for navigation links
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



// Sound management
const buttonSound = new Audio('');
const hoverSound = new Audio('portfolio-website/microwave-button-82493.mp3');

function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(error => console.error('Error playing sound:', error));
}

// Initialize HUD sounds
function initHUDSounds() {
    const buttons = document.querySelectorAll('.btn-hack, .nav-link, .neon-icon');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            playSound(hoverSound);
        });
        
        button.addEventListener('click', () => {
            playSound(buttonSound);
        });
    });

    // Play boot sound when page loads
    window.addEventListener('load', () => {
        playSound(new Audio('sounds/boot.mp3'));
        // Trigger scan effect on profile image
        const profileContainer = document.querySelector('.profile-container');
        if (profileContainer) {
            profileContainer.classList.add('scanning');
            playSound(new Audio('sounds/scan.mp3'));
        }
    });
}