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
@app.route('/services', methods=['GET'])
def get_services():
    services = supabase.table('services').select('*').execute()
    return jsonify(services.data), 200

if __name__ == '__main__':
    app.run(debug=True)