// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {

    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Ne plus cacher les sections - juste scroll vers la section
            const targetSection = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetSection);
            if (target) {
                // Scroll to target section smoothly
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop &&
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // // Show contacts button functionality
    // const showContactsBtn = document.querySelector('.show-contacts-btn');
    // if (showContactsBtn) {
    //     showContactsBtn.addEventListener('click', function () {
    //         showContactModal();
    //     });
    // }

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Create mailto link
            const mailtoLink = `mailto:zeidibraheem07@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            showSuccessMessage('Votre client email va s\'ouvrir avec le message pré-rempli !');

            // Reset form
            this.reset();
        });
    }

    // Intersection Observer for animations
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.stat-card, .language-card, .skill-category, .soft-skill, ' +
        '.interest-card, .timeline-item, .contact-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for stats
    const statsSection = document.querySelector('.stats-section');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statObserver.observe(statsSection);
    }

    // Typing effect for role
    const roleElement = document.querySelector('.role');
    if (roleElement) {
        const originalText = roleElement.textContent;
        typeWriter(roleElement, originalText, 100);
    }
});

// Show contact modal function
function showContactModal() {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Informations de Contact</h3>
            <div class="contact-details">
                <div class="modal-contact-item">
                    <strong>📧 Email:</strong>
                    <a href="mailto:zeidibraheem07@gmail.com">zeidibraheem07@gmail.com</a>
                </div>
                <div class="modal-contact-item">
                    <strong>📱 Téléphone:</strong>
                    <a href="tel:+33623377739">06 23 37 77 39</a>
                </div>
                <div class="modal-contact-item">
                    <strong>📍 Localisation:</strong>
                    <span>Nice, France</span>
                </div>
                <div class="modal-contact-item">
                    <strong>💼 LinkedIn:</strong>
                    <a href="https://www.linkedin.com/in/zeid-ibraheem/" target="_blank">Profil LinkedIn</a>
                </div>
                <div class="modal-contact-item">
                    <strong>👨‍💻 GitHub:</strong>
                    <a href="https://github.com/SeldomZed" target="_blank">SeldomZed</a>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add fade-in animation
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        closeModal(modal);
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Close modal function
function closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
        if (modal.parentNode) {
            document.body.removeChild(modal);
        }
    }, 300);
}

// Counter animation function
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h4');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    });
}

// Typing effect function
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Show success message function
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #e4a175;
        color: #1c1c1c;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    successDiv.textContent = message;

    document.body.appendChild(successDiv);

    // Animate in
    setTimeout(() => {
        successDiv.style.opacity = '1';
        successDiv.style.transform = 'translateX(0)';
    }, 10);

    // Remove after 4 seconds
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (successDiv.parentNode) {
                document.body.removeChild(successDiv);
            }
        }, 300);
    }, 4000);
}

// Smooth scrolling for internal links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(42, 42, 42, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#2a2a2a';
        navbar.style.backdropFilter = 'none';
    }
});

// Add hover effects to cards
document.addEventListener('mouseover', function (e) {
    if (e.target.closest('.stat-card, .language-card, .skill-category, .soft-skill, .interest-card')) {
        const card = e.target.closest('.stat-card, .language-card, .skill-category, .soft-skill, .interest-card');
        card.style.boxShadow = '0 10px 30px rgba(228, 161, 117, 0.2)';
    }
});

document.addEventListener('mouseout', function (e) {
    if (e.target.closest('.stat-card, .language-card, .skill-category, .soft-skill, .interest-card')) {
        const card = e.target.closest('.stat-card, .language-card, .skill-category, .soft-skill, .interest-card');
        card.style.boxShadow = 'none';
    }
});

// Initialize modal styles
const modalStyles = `
.contact-modal {
    opacity: 0;
    transition: opacity 0.3s ease;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
