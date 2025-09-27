document.addEventListener('DOMContentLoaded', () => {
    // --- Global State ---
    const translations = {};

    // --- DOM Elements ---
    const navLinks = document.getElementById('navLinks');
    const menuOpenBtn = document.querySelector('.fa-bars');
    const menuCloseBtn = document.querySelector('.fa-times');
    const faqItems = document.querySelectorAll('.faq-item');
    const languageDropdown = document.getElementById('dropdown-content');
    const langButton = document.getElementById('language-btn');

    // --- Functions ---

    // Mobile Menu
    function showMenu() {
        navLinks.classList.add('active');
    }

    function hideMenu() {
        navLinks.classList.remove('active');
    }

    // Internationalization (i18n)
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`locales/${lang}.json?v=1.2`); // Cache-busting
            if (!response.ok) {
                console.error(`Could not load ${lang}.json. Status: ${response.status}`);
                if (lang !== 'en') loadTranslations('en'); // Fallback to English
                return;
            }
            translations[lang] = await response.json();
            updateContent(lang);
        } catch (error) {
            console.error(`Error fetching or parsing ${lang}.json:`, error);
            if (lang !== 'en') loadTranslations('en'); // Fallback to English
        }
    }

    function updateContent(lang) {
        if (!translations[lang]) return;

        // Translate text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        // Update page title
        if (translations[lang].pageTitle) {
            document.title = translations[lang].pageTitle;
        }

        // Update language button text
        const langKey = `lang${capitalize(lang)}`;
        if (translations[lang][langKey]) {
            langButton.querySelector('span').textContent = translations[lang][langKey];
        } else if (lang === 'en') {
            langButton.querySelector('span').textContent = 'English';
        }

        // Update images
        updateImages(lang);
    }
    
    function updateImages(lang) {
        document.querySelectorAll('.gallery-img').forEach(img => {
            img.style.display = 'none';
        });
        document.querySelectorAll(`.lang-${lang}`).forEach(img => {
            img.style.display = 'block';
        });
    }

    function capitalize(lang) {
        const langMap = {
            en: 'English',
            cn: 'Chinese',
            tw: 'TraditionalChinese',
            ja: 'Japanese',
            ms: 'Malay'
        };
        return langMap[lang] || lang;
    }

    function setLanguage(lang) {
        localStorage.setItem('language', lang);
        if (translations[lang]) {
            updateContent(lang);
        } else {
            loadTranslations(lang);
        }
    }

    // --- Event Listeners ---

    // Menu Toggle
    menuOpenBtn.addEventListener('click', showMenu);
    menuCloseBtn.addEventListener('click', hideMenu);

    // FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                if (window.innerWidth <= 768) {
                    hideMenu();
                }
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Language Switcher
    languageDropdown.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang');
            setLanguage(lang);
        }
    });

    // --- Initialization ---
    function init() {
        // Detect device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        document.documentElement.setAttribute('data-device', isMobile ? 'mobile' : 'desktop');

        // Set initial language
        const savedLang = localStorage.getItem('language') || 'cn';
        setLanguage(savedLang);
    }

    init();
});