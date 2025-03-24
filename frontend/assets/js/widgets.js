// assets/js/widgets.js

function toggleUserMenu() {
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
  }
}

function showWidget(widgetId) {
  const widget = document.getElementById(widgetId);
  const overlay = document.getElementById('overlay');
  if (widget && overlay) {
    widget.style.display = 'block';
    overlay.style.display = 'block';
  }
}

function closeWidget(widgetId) {
  const widget = document.getElementById(widgetId);
  const overlay = document.getElementById('overlay');
  if (widget && overlay) {
    widget.style.display = 'none';
    overlay.style.display = 'none';
  }
}

function showAccountWidget() {
  showWidget('account-widget');
}

function showSettingsWidget() {
  showWidget('settings-widget');
}

function showHelpWidget() {
  showWidget('help-widget');
}

// Добавляем функцию для открытия виджета управления ресурсами
function showResourcesAdminWidget() {
  showWidget('resources-admin-widget');
  if (typeof loadProjects === 'function') {
    loadProjects(); // Загружаем проекты при открытии виджета
  }
}

// Добавляем функцию для открытия виджета добавления проекта
function showAddProjectWidget() {
  showWidget('add-project-widget');
}

function showTab(tabId) {
  document.querySelectorAll('.auth-tab').forEach(tab => tab.style.display = 'none');
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  const tab = document.getElementById(tabId);
  if (tab) {
    tab.style.display = 'block';
    event.target.classList.add('active');
  }
}

function toggleCalendar() {
  const calendar = document.getElementById('calendar-widget');
  if (calendar) {
    calendar.style.display = calendar.style.display === 'block' ? 'none' : 'block';
    if (calendar.style.display === 'block') {
      renderCalendar();
    }
  }
}

function renderCalendar() {
  const dateInput = document.getElementById('register-date');
  const calendarDates = document.getElementById('calendar-dates');
  const monthYear = document.getElementById('calendar-month-year');
  if (!dateInput || !calendarDates || !monthYear) return;

  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  monthYear.textContent = `${months[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  calendarDates.innerHTML = '';

  for (let i = 0; i < adjustedFirstDay; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'empty';
    calendarDates.appendChild(emptyDiv);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.textContent = day;
    dayDiv.onclick = () => {
      dateInput.value = `${day}.${currentMonth + 1}.${currentYear}`;
      toggleCalendar();
    };
    calendarDates.appendChild(dayDiv);
  }
}

function changeMonth(direction) {
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  currentMonth += direction;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  renderCalendar();
}

// Функция переключения темы
function toggleTheme() {
  const darkModeCheckbox = document.getElementById('dark-mode');
  const themeStylesheet = document.getElementById('theme-stylesheet');
  if (darkModeCheckbox && themeStylesheet) {
    if (darkModeCheckbox.checked) {
      themeStylesheet.href = 'assets/css/dark/styles.css';
      localStorage.setItem('theme', 'dark');
      updateImages('dark');
    } else {
      themeStylesheet.href = 'assets/css/light/styles.css';
      localStorage.setItem('theme', 'light');
      updateImages('light');
    }
  }
}

// Загрузка темы при старте
function loadTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  const darkModeCheckbox = document.getElementById('dark-mode');
  const themeStylesheet = document.getElementById('theme-stylesheet');
  if (darkModeCheckbox && themeStylesheet) {
    if (theme === 'dark') {
      darkModeCheckbox.checked = true;
      themeStylesheet.href = 'assets/css/dark/styles.css';
      updateImages('dark');
    } else {
      darkModeCheckbox.checked = false;
      themeStylesheet.href = 'assets/css/light/styles.css';
      updateImages('light');
    }
  }
}

// Обновление изображений в зависимости от темы
function updateImages(theme) {
  const images = {
    'header-logo-img': 'logo.png',
    'user-icon': 'user.png',
    'calendar-icon': 'calendar.png',
    'help-image': 'hidden_content.png',
    'help-meme': 'help_meme.png'
  };

  for (const [id, filename] of Object.entries(images)) {
    const element = document.getElementById(id);
    if (element) {
      element.src = `assets/images/${theme}/${filename}`;
    }
  }

  // Обновление иконок проектов на странице ресурсов
  const resourceIcons = document.querySelectorAll('.resource-icon');
  resourceIcons.forEach(icon => {
    const type = icon.src.match(/\/([^\/]+)\.png$/);
    if (type) {
      icon.src = `assets/images/${theme}/${type[1]}.png`;
    }
  });
}