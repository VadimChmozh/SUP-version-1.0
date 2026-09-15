document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ⚙️ НАСТРОЙКА УВЕДОМЛЕНИЙ В TELEGRAM
    // Вставьте сюда ваши данные (в кавычках)
    // ==========================================
    const TELEGRAM_BOT_TOKEN = '8993404394:AAFlQj9A6x8UciEJYHAEMyspC-jh6DYbt9Y'; // Пример: '123456789:ABCdefGhIJKlm...'
    const TELEGRAM_CHAT_ID = '2069230132';       // Пример: '987654321'


    // ==========================================
    // 1. Мобильное гамбургер-меню
    // ==========================================
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (burgerBtn && navMenu) {
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
    }

    // ==========================================
    // 2. Аккордеон Вопросы-Ответы (FAQ)
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
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
        }
    });

    // ==========================================
    // 3. Лайтбокс для просмотра фотографий
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    window.openLightbox = function(element) {
        const img = element.querySelector('img');
        if (img && lightbox && lightboxImg) {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        }
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });

    // ==========================================
    // 4. Отправка заявки в Telegram
    // ==========================================
    const rentForm = document.getElementById('rentForm');

    if (rentForm) {
        rentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = rentForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // Считываем значения полей
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const typeSelect = document.getElementById('type');
            const type = typeSelect ? typeSelect.options[typeSelect.selectedIndex].text : 'Не указан';
            const count = document.getElementById('count').value;

            // Формируем текст сообщения для Telegram
            const message = `🏄‍♂️ *НОВАЯ ЗАЯВКА НА САПБОРД!*\n\n` +
                            `👤 *Имя:* ${name}\n` +
                            `📞 *Телефон:* ${phone}\n` +
                            `📋 *Тариф:* ${type}\n` +
                            `🔢 *Количество:* ${count} шт.`;

            // Меняем текст кнопки во время отправки
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;

            try {
                // Отправляем запрос в Telegram API
                const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: message,
                        parse_mode: 'Markdown'
                    })
                });

                if (response.ok) {
                    alert(`Спасибо, ${name}! Ваша заявка принята. Мы свяжемся с вами по номеру ${phone} в течение 10-15 минут.`);
                    rentForm.reset();
                } else {
                    alert('Ошибка при отправке. Пожалуйста, позвоните нам или напишите в WhatsApp!');
                }
            } catch (error) {
                alert('Не удалось отправить заявку. Свяжитесь с нами по телефону!');
            } finally {
                // Возвращаем кнопку в исходное состояние
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

});
