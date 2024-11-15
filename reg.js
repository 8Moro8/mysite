// Переход между окнами авторизации и регистрации
document.getElementById('register-btn').addEventListener('click', function() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
});

document.getElementById('back-to-login').addEventListener('click', function() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

// Обработчики для формы авторизации
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let identifier = document.getElementById('login-identifier').value;
    let password = document.getElementById('password').value;

    // Получаем список пользователей из localStorage
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Проверяем, существует ли пользователь с таким идентификатором и паролем
    const loggedInUser = users.find(user =>
        (user.username === identifier || user.email === identifier) &&
        user.password === hashPassword(password)
    );

    if (loggedInUser) {
        // Сохраняем данные о вошедшем пользователе
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

        // Редирект на главную страницу
        window.location.href = "index.html"; 
    } else {
        alert('Неверный идентификатор или пароль!');
    }
});

// Обработчики для формы регистрации
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let username = document.getElementById('reg-username').value;
    let email = document.getElementById('reg-email').value;
    let country = document.getElementById('reg-country').value;
    let phone = document.getElementById('reg-phone').value;
    let password = document.getElementById('reg-password').value;

    // Получаем список пользователей из localStorage
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Проверяем, существует ли пользователь с таким же именем или email
    const existingUser = users.find(user => user.username === username || user.email === email);
    
    if (existingUser) {
        alert('Пользователь с таким именем или email уже существует!');
        return;
    }

    // Создаем нового пользователя
    const newUser = {
        username: username,
        email: email,
        country: country,
        phone: phone,
        password: hashPassword(password)
    };

    // Добавляем нового пользователя в список пользователей
    users.push(newUser);

    // Сохраняем обновленный список пользователей в localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Выводим сообщение об успешной регистрации и возвращаемся на страницу авторизации
    alert('Регистрация прошла успешно');
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

function hashPassword(password) {
    return CryptoJS.SHA256(password).toString();
}
