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
    
    // Добавьте здесь логику для проверки учетных данных (например, AJAX запрос к серверу)
    // Для примера просто проверим, что поля не пустые
    if (identifier && password) {
        // В случае успешной авторизации, редирект на главную страницу
        window.location.href = "index.html"; // Здесь main.html - это ваша главная страница
    } else {
        alert('Пожалуйста, заполните все поля!');
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
    
    // Добавьте здесь логику для регистрации (например, отправка данных на сервер)
    if (username && email && password) {
        // В случае успешной регистрации, редирект на страницу авторизации
        alert('Регистрация прошла успешно');
        document.getElementById('register-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
});
