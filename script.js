// ─── MATRIX BACKGROUND ───
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ∑∆∇⊕⊗ABCDEFabcdef0123456789';
const fontSize = 13;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(6, 12, 26, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00d9ff';
    ctx.font = fontSize + 'px Fira Code';
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}

setInterval(drawMatrix, 45);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ─── STICKY NAVBAR ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(11, 19, 40, 0.95)';
    } else {
        navbar.style.background = '';
    }
});

// ─── ACTIVE NAV LINK ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) link.classList.add('active');
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ─── SMOOTH SCROLL ───
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ─── TABS ───
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById('tab-' + tab);
        if (target) {
            target.classList.add('active');
            // Animate skill bars in this tab
            setTimeout(() => animateSkillBars(target), 100);
        }
    });
});

// ─── SKILL BAR ANIMATIONS ───
function animateSkillBars(container) {
    const fills = container.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
        const w = fill.style.getPropertyValue('--w');
        fill.style.width = w;
    });
}

// ─── INTERSECTION OBSERVER ───
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate lang bars
            const langFills = entry.target.querySelectorAll('.lang-fill');
            langFills.forEach(fill => {
                fill.style.width = fill.style.width; // trigger transition
            });

            // Animate skill bars
            const skillFills = entry.target.querySelectorAll('.skill-fill');
            skillFills.forEach(fill => {
                const w = fill.style.getPropertyValue('--w');
                fill.style.width = w;
            });

            // Counters
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .stat-card, .skill-card, .project-card, .timeline-item, .formation-card, .language-card').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
});

// Trigger initial tab bars
setTimeout(() => {
    animateSkillBars(document.getElementById('tab-cyber'));
}, 500);

// ─── COUNTER ANIMATION ───
function animateCounter(el, target) {
    let current = 0;
    const step = Math.ceil(target / 30);
    const interval = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        el.textContent = current + '+';
    }, 50);
}

// ─── FORM SUBMIT ───
function handleFormSubmit() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }

    // Show success (in real deployment, send via emailjs or formspree)
    document.getElementById('form-success').style.display = 'block';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';

    setTimeout(() => {
        document.getElementById('form-success').style.display = 'none';
    }, 4000);
}

// ─── TYPING EFFECT on section titles ───
function typeText(el, text, speed = 50) {
    let i = 0;
    el.textContent = '';
    const interval = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
    }, speed);
}

// ─── GLITCH on hover for profile name ───
const h1 = document.querySelector('.profile-info h1');
if (h1) {
    h1.addEventListener('mouseenter', () => {
        h1.style.animation = 'glitch 0.3s ease';
        setTimeout(() => h1.style.animation = '', 300);
    });
}

// ─── CURSOR GLOW EFFECT ───
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,217,255,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});
