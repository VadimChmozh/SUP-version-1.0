document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Мобильное гамбургер-меню
    // ==========================================
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    burgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burgerBtn.classList.toggle('active');
    });

    // Закрывать меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            burgerBtn.classList.remove('active');
        });
    });

    // ==========================================
    // 2. Аккордеон Вопросы-Ответы (FAQ)
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            // Закрыть остальные открытые вопросы
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Переключить текущий
            item.classList.toggle('active');
        });
    });

    // ==========================================
    // 3. Лайтбокс для просмотра фотографий
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    window.openLightbox = function(element) {
        const img = element.querySelector('img');
        if (img) {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        }
    };

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });

    // ==========================================
    // 4. Обработка формы бронирования
    // ==========================================
    const rentForm = document.getElementById('rentForm');

    rentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const count = document.getElementById('count').value;

        alert(`Спасибо, ${name}! Ваша заявка на ${count} сапборд(а) принята. Мы перезвоним вам по номеру ${phone} в течение 10-15 минут.`);
        rentForm.reset();
    });

});