// server/server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

// Разрешаем CORS, чтобы фронтенд мог отправлять запросы
app.use(cors());
app.use(express.json());

// Путь к projects.json
const projectsFilePath = path.join(__dirname, '../frontend/assets/data/projects.json');

// Эндпоинт для получения списка проектов
app.get('/api/projects', async (req, res) => {
  try {
    const data = await fs.readFile(projectsFilePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Ошибка при чтении projects.json:', error);
    res.status(500).json({ error: 'Не удалось загрузить проекты' });
  }
});

// Эндпоинт для сохранения списка проектов
app.post('/api/save-projects', async (req, res) => {
  try {
    const projects = req.body;
    await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка при сохранении projects.json:', error);
    res.status(500).json({ error: 'Не удалось сохранить проекты' });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});