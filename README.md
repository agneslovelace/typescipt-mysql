# TypeORM + Express Backend Application

Это простое REST API приложение для управления словарем, построенное на Express.js и TypeORM с использованием SQLite.

## 🚀 Технологии

- **Node.js** - среда выполнения
- **Express.js** - веб-фреймворк
- **TypeORM** - ORM для работы с базой данных
- **SQLite** - база данных
- **TypeScript** - типизированный JavaScript
- **CORS** - middleware для кросс-доменных запросов

## 📋 Предварительные требования

- Node.js (версия 14 или выше)
- npm или yarn

## 🔧 Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/agneslovelace/typescipt-mysql.git
cd typescipt-mysql
```
2. Установите зависимости:

```bash
npm install
```
3. Настройте базу данных:

Приложение автоматически создаст SQLite базу данных при первом запуске. Вы можете настроить параметры подключения в файле `data-source.ts`.

## 🏃 Запуск приложения

```bash
npm run dev
```

# 📝 Примеры использования

## Создание слова через curl

```bash
curl -X POST http://localhost:3000/api/words \
  -H "Content-Type: application/json" \
  -d '{"word":"dog","translation":"собака"}'
```

## Получение всех слов

```bash
curl http://localhost:3000/api/words
```
## Обновление слова
```bash
curl -X PUT http://localhost:3000/api/words/1 \
  -H "Content-Type: application/json" \
  -d '{"word":"puppy"}'
```

## Удаление слова

```bash
curl -X DELETE http://localhost:3000/api/words/1
```

