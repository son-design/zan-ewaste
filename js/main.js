// ===== MAIN.JS =====

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initLanguage();
    initMobileMenu();
    initStatsCounter();
    initGallery();
    initProjectFilters();
});

// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Language Toggle
function initLanguage() {
    const langToggle = document.getElementById('langToggle');
    const html = document.documentElement;
    
    const savedLang = localStorage.getItem('language') || 'sw';
    html.setAttribute('data-lang', savedLang);
    updateLangButtons(savedLang);
    
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const currentLang = html.getAttribute('data-lang');
            const newLang = currentLang === 'sw' ? 'en' : 'sw';
            
            html.setAttribute('data-lang', newLang);
            localStorage.setItem('language', newLang);
            updateLangButtons(newLang);
        });
    }
}

function updateLangButtons(lang) {
    const langSw = document.querySelector('.lang-sw');
    const langEn = document.querySelector('.lang-en');
    
    if (lang === 'sw') {
        langSw.style.color = 'var(--accent)';
        langSw.style.fontWeight = '700';
        langEn.style.color = '';
        langEn.style.fontWeight = '';
    } else {
        langEn.style.color = 'var(--accent)';
        langEn.style.fontWeight = '700';
        langSw.style.color = '';
        langSw.style.fontWeight = '';
    }
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            const icon = this.querySelector('i');
            icon.className = navMenu.classList.contains('show') ? 'fas fa-times' : 'fas fa-bars';
        });
    }
}

// Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-target'));
                animateNumber(element, 0, target, 2000);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / (end - start)));
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Gallery functions
let galleryItems = [];

function initGallery() {
    // Load sample gallery items
    galleryItems = [
        { id: 1, type: 'image', src: 'assets/image/founder/iShot_109.jpg', title: 'Collection' },
        { id: 2, type: 'image', src: 'assets/image/founder/iShot_109.jpg', title: 'Recycling' }
    ];
    
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        galleryItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `<img src="${item.src}" alt="${item.title}">`;
            div.onclick = () => openLightbox(item);
            galleryGrid.appendChild(div);
        });
    }
}

function openLightbox(item) {
    // Lightbox implementation
    alert('Open image: ' + item.title);
}

// Project filters
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            projects.forEach(project => {
                if (filter === 'all' || project.dataset.status === filter || project.dataset.media === filter) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

// Video modal
function playVideo(src) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    if (modal && video) {
        video.src = src;
        modal.classList.add('show');
        video.play();
    }
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    if (modal && video) {
        video.pause();
        modal.classList.remove('show');
    }
}

// Admin login
function showAdminLogin() {
    const password = prompt('Enter admin password:');
    if (password === 'admin123') {
        document.getElementById('uploadPanel').style.display = 'block';
    }
}