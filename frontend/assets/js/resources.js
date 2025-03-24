// Функция отображения проектов на странице "Ресурсы"
function renderResources() {
  const resourcesGrid = document.getElementById('resources-grid');
  resourcesGrid.innerHTML = '';

  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.forEach(project => {
    const resourceItem = document.createElement('a');
    resourceItem.className = 'resource-item';
    resourceItem.href = project.url;
    resourceItem.innerHTML = `
            <div class="resource-image-container">
                <img src="${project.image}" alt="${project.title}" class="resource-image">
                <img src="assets/images/light/${project.type}-icon.png" alt="${project.type} Icon" class="resource-icon">
            </div>
            <div class="resource-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
    resourcesGrid.appendChild(resourceItem);
  });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  updateUserMenu();
  renderResources();
});