// #region agent log
fetch('http://127.0.0.1:7242/ingest/9bb22711-365a-4cba-a649-3ce91773d604',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app.js:entry',message:'app.js loaded and executing',data:{readyState:document.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
// #endregion

// #region agent log
(function() {
    const bodyStyle = window.getComputedStyle(document.body);
    const fontFamily = bodyStyle.getPropertyValue('font-family');
    const backgroundColor = bodyStyle.getPropertyValue('background-color');
    const color = bodyStyle.getPropertyValue('color');
    fetch('http://127.0.0.1:7242/ingest/9bb22711-365a-4cba-a649-3ce91773d604',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app.js:css-check',message:'Computed styles check',data:{fontFamily:fontFamily,backgroundColor:backgroundColor,color:color,hasCss:fontFamily.includes('JetBrains')||fontFamily.includes('Courier')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
})();
// #endregion

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

// Skills tab switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        const content = document.getElementById(tabId);
        if (content) {
            content.classList.add('active');
        }
    });
});

// Add active class to navbar on scroll
// window.addEventListener('scroll', () => {
//     const navbar = document.querySelector('.navbar');
//     if (window.scrollY > 50) {
//         navbar.style.background = 'rgba(0, 0, 0, 0.98)';
//     } else {
//         navbar.style.background = 'rgba(0, 0, 0, 0.95)';
//     }
// });
