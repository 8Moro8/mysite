document.addEventListener("DOMContentLoaded", function() {
    // Получаем элементы из DOM
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const mainContainer = document.getElementById('main-container');
    const homeLink = document.getElementById('homeLink');

    const menuBtn = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');
    const closeBtn = document.querySelector('.close-btn');

    const aboutLink = document.getElementById('about-link');
    const contactLink = document.getElementById('contact-link');
    const logoutBtn = document.getElementById('logout-btn');

    // Обработчик для меню
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('open');
        menu.style.left = menu.style.left === '0px' ? '-250px' : '0px';
    });

    // Обработчик для закрытия меню
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            menu.classList.remove('open');
            menu.style.left = '-250px'; // Скрываем меню
        });
    }

    // Функция для отображения главной страницы
    function showMain() {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'none';
        mainContainer.style.display = 'block';
    }

    if (homeLink) {
        homeLink.addEventListener('click', (event) => {
            event.preventDefault();
            showMain(); // Показываем главную страницу
        });
    }

    if (aboutLink) {
        aboutLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'about.html'; // Переход на страницу "О нас"
        });
    }

    if (contactLink) {
        contactLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'contacts.html'; // Переход на страницу "Контакты"
        });
    }

    // Обработчик для выхода из аккаунта
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            showMain(); // Показать главную страницу после выхода
        });
    }

    showMain(); // По умолчанию показываем главную страницу
});