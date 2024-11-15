document.addEventListener("DOMContentLoaded", function() {
    const mainContainer = document.getElementById('main-container');
    const menuBtn = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');
    const closeBtn = document.querySelector('.close-btn');
    const aboutLink = document.getElementById('about-link');
    const contactLink = document.getElementById('contact-link');
    const logoutBtn = document.getElementById('logout-btn');
    let users = [];

    // Открытие меню
    menuBtn?.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    // Закрытие меню
    closeBtn?.addEventListener('click', () => {
        menu.classList.remove('active');
    });

    // Переход на страницу "О нас"
    aboutLink?.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = 'about.html';
    });

    // Переход на страницу "Контакты"
    contactLink?.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = 'contacts.html';
    });

    // Логика выхода из аккаунта
    logoutBtn?.addEventListener("click", function() {
        localStorage.removeItem('loggedInUser'); // Удаляем данные о пользователе
        window.location.href = 'reg.html'; // Переход на страницу авторизации
    });

    // Загрузка пользователей из localStorage
    function loadUsers() {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            users = JSON.parse(storedUsers);
        }
    }

    // Проверка статуса авторизации
    function checkLoginStatus() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            showMain();
        } else {
            showLogin(); // Перенаправление на страницу авторизации
        }
    }

    // Показать главную страницу
    function showMain() {
        mainContainer.style.display = 'block';
    }

    // Показать страницу авторизации
    function showLogin() {
        window.location.href = 'reg.html'; // Перенаправление на страницу авторизации
    }

    loadUsers();
    checkLoginStatus();
});

function hashPassword(password) {
    return CryptoJS.SHA256(password).toString();
}
