# 🚀 Quick Start Guide

## Как запустить демонстрационный e-commerce проект

### 📋 Требования
- Node.js v18+ 
- npm или yarn

### 🔧 Установка и запуск

#### 1. Установка зависимостей
```bash
# Установка зависимостей фронтенда
npm install

# Установка зависимостей бэкенда
cd backend-demo
npm install
cd ..
```

#### 2. Запуск бэкенда
```bash
cd backend-demo
npm start
```
**Бэкенд будет доступен на:** http://localhost:4000

#### 3. Запуск фронтенда (в новом терминале)
```bash
npm run dev
```
**Фронтенд будет доступен на:** http://localhost:3000

### 🌐 Доступные URL

#### Фронтенд
- **Главная страница:** http://localhost:3000
- **Админ панель:** http://localhost:3000/admin

#### Бэкенд API
- **Health check:** http://localhost:4000/api/health
- **Продукты:** http://localhost:4000/api/products
- **Заказы:** http://localhost:4000/api/orders
- **Документация API:** http://localhost:4000/api

### 🛠️ Команды разработки

#### Фронтенд
```bash
npm run dev          # Запуск в режиме разработки
npm run build        # Сборка для продакшена
npm run preview      # Предварительный просмотр сборки
```

#### Бэкенд
```bash
cd backend-demo
npm start            # Запуск в продакшене
npm run dev          # Запуск с автоперезагрузкой
```

### 📊 База данных
- **Файл:** `backend-demo/ecommerce.db`
- **Тип:** SQLite3
- **Автоматическое создание:** При первом запуске бэкенда
- **Демо данные:** 8 продуктов автоматически добавляются

### 🔍 Проверка работы

1. **Откройте браузер:** http://localhost:3000
2. **Проверьте API:** http://localhost:4000/api/health
3. **Посмотрите продукты:** http://localhost:4000/api/products

### 🚨 Устранение проблем

#### Порт занят
Если порт 3000 или 4000 занят:
```bash
# Измените порт в vite.config.ts
server: { port: 3001 }

# Или в backend-demo/server.js
const PORT = process.env.PORT || 4001
```

#### Ошибки зависимостей
```bash
# Переустановите зависимости
rm -rf node_modules package-lock.json
npm install

cd backend-demo
rm -rf node_modules package-lock.json
npm install
```

### 📝 Примечания
- Это **демонстрационный проект**, не для продакшена
- Все данные хранятся локально в SQLite
- Платежи симулированы
- Админ панель интегрирована в фронтенд для удобства

### 🎯 Что можно тестировать
- ✅ Просмотр продуктов
- ✅ Поиск и фильтрация
- ✅ Добавление в корзину
- ✅ Оформление заказа
- ✅ Админ панель (CRUD операции)
- ✅ API endpoints
