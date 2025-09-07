    // Theme toggle functionality
    function toggleTheme() {
        const body = document.body;
        const themeToggle = document.querySelector('.theme-toggle');
        
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            themeToggle.textContent = '🌙';
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
        }
    }

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

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Add active class to navbar on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            if (document.body.getAttribute('data-theme') === 'dark') {
                navbar.style.background = 'rgba(17, 24, 39, 0.98)';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (document.body.getAttribute('data-theme') === 'dark') {
                navbar.style.background = 'rgba(17, 24, 39, 0.95)';
            }
        }
    });

    // Initialize theme based on user preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-toggle').textContent = '☀️';
    }