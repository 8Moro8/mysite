import bcrypt
from supabase import create_client, Client
from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__)

# Настройки Supabase (переменные окружения для безопасности)
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://mmlykvajpysgizmspxwd.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tbHlrdmFqcHlzZ2l6bXNweHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MjczNzIsImV4cCI6MjA0ODIwMzM3Mn0.14jlDv22D1g5PvBva5zEZ09GjR2cs5jHYFbPHeXAjxc')
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Главная страница
@app.route('/')
def home():
    return send_from_directory('templates', 'index.html')

@app.route('/reg.html')
def reg():
    return send_from_directory('templates', 'reg.html')

@app.route('/index.html')
def index():
    return send_from_directory('templates', 'index.html')

@app.route('/about.html')
def about():
    return send_from_directory('templates', 'about.html')

@app.route('/packages.html')
def packages():
    return send_from_directory('templates', 'packages.html')

# Регистрация пользователя
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    # Проверяем, есть ли пользователь с таким email
    existing_user = supabase.table('users').select('*').eq('email', email).execute()
    if existing_user.data:
        return jsonify({'error': 'Email уже зарегистрирован'}), 400

    # Хэшируем пароль с использованием bcrypt
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Создаем пользователя
    supabase.table('users').insert({
        'email': email,
        'password_hash': password_hash.decode('utf-8'),
        'username': username
    }).execute()
    
    return jsonify({'message': 'Пользователь зарегистрирован'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Запрос к базе данных Supabase
    response = supabase.table('users').select('*').eq('email', email).execute()

    # Проверка существования пользователя
    if not response.data:
        return jsonify({"error": "Пользователь не найден"}), 404

    user = response.data[0]  # Получаем пользователя

    # Проверка пароля с использованием bcrypt
    if not bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
        return jsonify({"error": "Неверный пароль"}), 401

    return jsonify({"message": "Успешный вход", "user": user}), 200

# Получение списка услуг
@app.route('/products_services', methods=['GET'])
def get_products_services():
    products_services = supabase.table('products_services').select('*').execute()
    return jsonify(products_services.data), 200

@app.route('/add-product', methods=['POST'])
def add_product():
    name = request.form.get('name')
    price = request.form.get('price')
    is_service = request.form.get('isService') == 'true'
    photo = request.files.get('photo')

    if not name or not price or not photo:
        return jsonify({'error': 'Все поля обязательны для заполнения'}), 400

    # Загружаем фото в Supabase (или другую систему хранения)
    file_path = f"products/{photo.filename}"
    file = supabase.storage.from_("public").upload(file_path, photo)

    # Добавляем товар в таблицу
    product_data = {
        'name': name,
        'price': price,
        'is_service': is_service,
        'photo_url': file['publicURL']
    }

    response = supabase.table('products').insert([product_data]).execute()

    if response.status_code == 201:
        return jsonify({'message': 'Товар успешно добавлен'}), 201
    else:
        return jsonify({'error': 'Ошибка при добавлении товара'}), 500

if __name__ == '__main__':
    app.run(debug=True)