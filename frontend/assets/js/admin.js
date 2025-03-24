// assets/js/admin.js

let projects = [];
let currentEditIndex = -1;

// Функция для загрузки проектов с сервера
async function loadProjects() {
  try {
    const response = await fetch('http://localhost:3000/api/projects');
    if (!response.ok) {
      throw new Error('Не удалось загрузить проекты');
    }
    projects = await response.json();
    updateProjectsList();
  } catch (error) {
    console.error('Ошибка при загрузке проектов:', error);
  }
}

// Функция для обновления списка проектов
function updateProjectsList() {
  const projectsList = document.getElementById('projects-list');
  if (!projectsList) {
    console.error('Элемент projects-list не найден');
    return;
  }
  projectsList.innerHTML = '';

  projects.forEach((project, index) => {
    const projectItem = document.createElement('div');
    projectItem.className = 'project-item';
    projectItem.innerHTML = `
      <h4>${project.title} (${project.type})</h4>
      <div class="project-actions">
        <button onclick="editProject(${index})">Редактировать</button>
        <button onclick="deleteProject(${index})">Удалить</button>
      </div>
    `;
    projectsList.appendChild(projectItem);
  });
}

// Функция для сохранения проектов на сервер
async function saveProjects() {
  try {
    const response = await fetch('http://localhost:3000/api/save-projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projects)
    });
    if (!response.ok) {
      throw new Error('Не удалось сохранить проекты');
    }
    console.log('Проекты успешно сохранены');
  } catch (error) {
    console.error('Ошибка при сохранении проектов:', error);
  }
}

// Функция для добавления проекта
async function addProject() {
  const title = document.getElementById('project-title').value.trim();
  const description = document.getElementById('project-description').value.trim();
  const type = document.getElementById('project-type').value;
  const url = document.getElementById('project-url').value.trim();
  const image = document.getElementById('project-image').value.trim();
  const errorMessage = document.getElementById('add-error-message');

  if (!title || !description || !url || !image) {
    errorMessage.textContent = 'Пожалуйста, заполните все поля.';
    return;
  }

  const newProject = { title, description, type, url, image };
  projects.push(newProject);
  await saveProjects();
  updateProjectsList();
  closeWidget('add-project-widget');
  document.getElementById('project-title').value = '';
  document.getElementById('project-description').value = '';
  document.getElementById('project-url').value = '';
  document.getElementById('project-image').value = '';
  errorMessage.textContent = '';
}

// Функция для редактирования проекта
function editProject(index) {
  currentEditIndex = index;
  const project = projects[index];
  document.getElementById('edit-project-title').value = project.title;
  document.getElementById('edit-project-description').value = project.description;
  document.getElementById('edit-project-type').value = project.type;
  document.getElementById('edit-project-url').value = project.url;
  document.getElementById('edit-project-image').value = project.image;
  showWidget('edit-project-widget');
}

// Функция для сохранения отредактированного проекта
async function saveProject() {
  const title = document.getElementById('edit-project-title').value.trim();
  const description = document.getElementById('edit-project-description').value.trim();
  const type = document.getElementById('edit-project-type').value;
  const url = document.getElementById('edit-project-url').value.trim();
  const image = document.getElementById('edit-project-image').value.trim();
  const errorMessage = document.getElementById('edit-error-message');

  if (!title || !description || !url || !image) {
    errorMessage.textContent = 'Пожалуйста, заполните все поля.';
    return;
  }

  projects[currentEditIndex] = { title, description, type, url, image };
  await saveProjects();
  updateProjectsList();
  closeWidget('edit-project-widget');
  errorMessage.textContent = '';
}

// Функция для удаления проекта
async function deleteProject(index) {
  if (confirm('Вы уверены, что хотите удалить этот проект?')) {
    projects.splice(index, 1);
    await saveProjects();
    updateProjectsList();
  }
}