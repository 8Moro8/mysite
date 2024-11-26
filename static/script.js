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
    
    // Регистрация нового пользователя
    const registerUser = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;
    
        const hashedPassword = hashPassword(password);  // Хешируем пароль

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password: hashedPassword, name }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Регистрация успешна');
        } else {
            alert(`Ошибка: ${result.error || 'Невозможно зарегистрировать пользователя'}`);
        }
    };

    // Загрузка услуг с сервера
    const loadServices = async () => {
        const response = await fetch('/services');
        const services = await response.json();
    
        const servicesContainer = document.getElementById('services');
        servicesContainer.innerHTML = '';
    
        services.forEach(service => {
            const item = document.createElement('div');
            item.className = 'service-item';
            item.innerHTML = `
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <p>Цена: ${service.price || 'договорная'}</p>
                <img src="${service.image_url}" alt="${service.name}" />
            `;
            servicesContainer.appendChild(item);
        });
    };
    
    window.onload = loadServices;
    
    // Открытие меню
    menuBtn.addEventListener('click', () => {
        menu.classList.add('active');
    });

    // Закрытие меню
    closeBtn.addEventListener('click', () => {
        menu.classList.remove('active');
    });
    
    // Открытие модального окна
    openMessageBtn.addEventListener('click', () => {
        messageModal.classList.add('show'); // Используем класс для показа модального окна
        modalOverlay.classList.add('show'); // Используем класс для фона
    });
   
    // Закрытие модального окна
    closeMessageBtn.addEventListener('click', () => {
        messageModal.classList.remove('show');
        modalOverlay.classList.remove('show');
    });

    // Закрытие модального окна при клике на фон
    modalOverlay.addEventListener('click', () => {
        messageModal.classList.remove('show');
        modalOverlay.classList.remove('show');
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
        localStorage.removeItem('loggedInUser');
        window.location.href = 'reg.html';
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

document.addEventListener("DOMContentLoaded", function() {
    const addProductBtn = document.getElementById('add-product-btn');
    const addProductModal = document.getElementById('add-product-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const addProductForm = document.getElementById('add-product-form');

    // Открытие модального окна
    addProductBtn.addEventListener('click', () => {
        addProductModal.style.display = 'flex';
    });

    // Закрытие модального окна
    closeModalBtn.addEventListener('click', () => {
        addProductModal.style.display = 'none';
    });

    // Обработка отправки формы
    addProductForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const isService = document.getElementById('is-service').checked;
        const photo = document.getElementById('product-photo').files[0];

        if (!name || !price || !photo) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('isService', isService);
        formData.append('photo', photo);

        // Отправка данных на сервер
        try {
            const response = await fetch('/add-product', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Товар успешно добавлен!');
                addProductModal.style.display = 'none'; // Закрытие модального окна
            } else {
                alert('Ошибка при добавлении товара: ' + result.error);
            }
        } catch (error) {
            alert('Произошла ошибка при отправке данных.');
        }
    });
});


// Хеширование пароля
function hashPassword(password) {
    return CryptoJS.SHA256(password).toString();
}
