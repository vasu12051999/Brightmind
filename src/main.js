document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const contactForm = document.getElementById('contactForm');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const formMessage = document.getElementById('formMessage');

            const name = formData.get('name');
            const email = formData.get('email');
            const inquiry = formData.get('inquiry');
            const message = formData.get('message');

            if (!name || !email || !inquiry || !message) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please fill in all required fields.';
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please enter a valid email address.';
                return;
            }

            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you for your message! We will get back to you within 24 hours.';

            contactForm.reset();

            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }

    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }

        lastScrollTop = scrollTop;
    });

    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    if (mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                    }
                }
            }
        });
    });

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

    const animatedElements = document.querySelectorAll('.service-card, .value-card, .case-card, .benefit-card, .metric-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const currentPage = window.location.pathname;
    const navLinksAll = document.querySelectorAll('.nav-link');
    navLinksAll.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPage || (currentPage === '/' && link.href.includes('index.html'))) {
            link.classList.add('active');
        }
    });
});
