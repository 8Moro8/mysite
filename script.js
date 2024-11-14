document.addEventListener("DOMContentLoaded", function() {
    // Проверка поддержки localStorage
    if (typeof(Storage) === "undefined") {
        alert("Ваш браузер не поддерживает локальное хранилище.");
        return;
    }

    // Получаем элементы из DOM
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const mainContainer = document.getElementById('main-container');
    const homeLink = document.getElementById('homeLink');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const registerBtn = document.getElementById('register-btn');
    const backToLoginBtn = document.getElementById('back-to-login');
    const menuBtn = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');
    const closeBtn = document.querySelector('.close-btn');
    const aboutLink = document.getElementById('about-link');
    const contactLink = document.getElementById('contact-link');
    const logoutBtn = document.getElementById('logout-btn');

    let users = [];

    // Обработчик для меню
    menuBtn?.addEventListener('click', () => {
        menu.classList.toggle('open');
        menu.style.left = menu.style.left === '0px' ? '-250px' : '0px';
    });

    // Обработчик для закрытия меню
    closeBtn?.addEventListener('click', () => {
        menu.classList.remove('open');
        menu.style.left = '-250px';
    });

    // Загрузка пользователей из localStorage при инициализации
    function loadUsers() {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            users = JSON.parse(storedUsers);
        } else {
            users.push({
                username: "testUser",
                email: "test@example.com",
                country: "Казахстан",
                phone: "+7 (777) 123-45-67",
                password: hashPassword("password123") // Захэшированный пароль
            });
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    // Сохранение пользователей в localStorage
    function saveUsers() {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Установка состояния авторизации
    function setLoggedIn(user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        showMain();
    }

    // Проверка состояния входа пользователя
    function checkLoginStatus() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            showMain();
        } else {
            showLogin();
        }
    }

    // Функция для отображения окна авторизации
    function showLogin() {
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
        mainContainer.style.display = 'none';
    }

    // Функция для отображения окна регистрации
    function showRegister() {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
        mainContainer.style.display = 'none';
    }

    // Функция для отображения главной страницы
    function showMain() {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'none';
        mainContainer.style.display = 'block';
    }

    homeLink?.addEventListener('click', (event) => {
        event.preventDefault();
        showMain();
    });

    aboutLink?.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = 'about.html';
    });

    contactLink?.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = 'contacts.html';
    });

    registerBtn?.addEventListener('click', () => {
        showRegister();
    });

    // Обработка регистрации
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const username = document.getElementById("reg-username").value.trim();
            const email = document.getElementById("reg-email").value.trim();
            const country = document.getElementById("reg-country").value.trim();
            const phone = document.getElementById("reg-phone").value.trim();
            const password = document.getElementById("reg-password").value;

            if (username === "" || email === "" || country === "" || phone === "" || password === "") {
                alert("Все поля должны быть заполнены!");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Введите корректный адрес электронной почты!");
                return;
            }

            const userExists = users.some(user => user.username === username || user.email === email);
            if (userExists) {
                alert("Пользователь с таким именем или email уже существует!");
                return;
            }

            const hashedPassword = hashPassword(password);

            users.push({
                username: username,
                email: email,
                country: country,
                phone: phone,
                password: hashedPassword
            });

            saveUsers();

            showLogin();
            alert("Регистрация прошла успешно! Теперь можно авторизоваться.");
        });
    }

    // Обработка авторизации
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const loginIdentifier = document.getElementById("login-identifier").value.trim();
            const password = document.getElementById("password").value;

            if (!loginIdentifier || !password) {
                alert("Пожалуйста, заполните все поля.");
                return;
            }

            const hashedPassword = hashPassword(password);

            const user = users.find(user =>
                (user.username === loginIdentifier || user.email === loginIdentifier) && user.password === hashedPassword
            );

            if (user) {
                setLoggedIn(user);
            } else {
                alert("Неверные данные для входа!");
            }
        });
    }

    // Обработка выхода из аккаунта
    logoutBtn?.addEventListener("click", function() {
        localStorage.removeItem('loggedInUser');
        showLogin();
    });

    backToLoginBtn?.addEventListener('click', () => {
        showLogin();
    });

    loadUsers(); // Загрузить пользователей при загрузке
    checkLoginStatus(); // Проверить состояние входа при загрузке
});

// Функция для хэширования пароля
function hashPassword(password) {
    return CryptoJS.SHA256(password).toString();
}
