// i18n dictionary
const translations = {
    ar: {
        "nav.home": "الرئيسية",
        "nav.about": "عن الشركة",
        "nav.services": "خدماتنا",
        "nav.products": "المنتجات",
        "nav.projects": "أعمالنا",
        "nav.news": "الأخبار",
        "nav.contact": "اطلب الآن",
        "lang.toggle": "EN"
    },
    en: {
        "nav.home": "Home",
        "nav.about": "About Us",
        "nav.services": "Services",
        "nav.products": "Products",
        "nav.projects": "Projects",
        "nav.news": "News",
        "nav.contact": "Order Now",
        "lang.toggle": "عربي"
    }
};

let currentLang = localStorage.getItem('lang') || 'ar'; // Default language

function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if(el.tagName === 'A' && el.querySelector('i')){
                const icon = el.querySelector('i').outerHTML;
                el.innerHTML = lang === 'en' && key === 'lang.toggle' ? icon + ' عربي' : (key === 'lang.toggle' ? icon + ' EN' : translations[lang][key] + ' ' + icon);
            } else {
                el.innerText = translations[lang][key];
            }
        }
    });
    
    // Toggle direction
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    
    if (lang === 'en') {
        document.body.classList.add('en-lang');
    } else {
        document.body.classList.remove('en-lang');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(currentLang);
    
    const langSwitchers = document.querySelectorAll('#langSwitcher');
    langSwitchers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            localStorage.setItem('lang', currentLang);
            applyTranslations(currentLang);
        });
    });
});
