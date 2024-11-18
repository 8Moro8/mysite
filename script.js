document.addEventListener("DOMContentLoaded", function() {
    const mainContainer = document.getElementById('main-container');
    const menuBtn = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const closeBtn = document.querySelector('.close-btn');
    const aboutLink = document.getElementById('about-link');
    const contactLink = document.getElementById('contact-link');
    const logoutBtn = document.getElementById('logout-btn');
    const openMessageBtn = document.querySelector('.open-message-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const messageModal = document.querySelector('.message-modal');
    const closeMessageBtn = document.querySelector('.close-message-btn');

    let users = [];

    // Открытие меню
    menuBtn.addEventListener('click', () => {
        menu.classList.add('active');
    });

    // Закрытие меню
    closeBtn.addEventListener('click', () => {
        menu.classList.remove('active');
    });
    
    // Функция для открытия модального окна
    openMessageBtn.addEventListener('click', () => {
        messageModal.style.display = 'block'; // Показываем модальное окно
        modalOverlay.style.display = 'block'; // Показываем фон
  });
   
   // Функция для закрытия модального окна
   closeMessageBtn.addEventListener('click', () => {
    messageModal.style.display = 'none'; // Скрываем модальное окно
    modalOverlay.style.display = 'none'; // Скрываем фон
  });

  // Закрытие модального окна при клике на фон
  modalOverlay.addEventListener('click', () => {
    messageModal.style.display = 'none'; // Скрываем модальное окно
    modalOverlay.style.display = 'none'; // Скрываем фон
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
