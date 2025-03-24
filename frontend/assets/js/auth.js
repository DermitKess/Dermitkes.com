// Пример auth.js
function handleAuth(type) {
  if (type === 'login') {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Пример проверки (замените на вашу логику)
    if (username && password) {
      localStorage.setItem('isLoggedIn', 'true');
      closeWidget('account-widget');
      updateUserMenu(); // Обновляем меню после входа
    } else {
      alert('Пожалуйста, заполните все поля.');
    }
  } else if (type === 'register') {
    const nickname = document.getElementById('register-nickname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const date = document.getElementById('register-date').value;

    // Пример проверки (замените на вашу логику)
    if (nickname && email && password && date) {
      localStorage.setItem('isLoggedIn', 'true');
      closeWidget('account-widget');
      updateUserMenu(); // Обновляем меню после регистрации
    } else {
      alert('Пожалуйста, заполните все поля.');
    }
  }
}

function showTab(tabId) {
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.style.display = 'none';
  });
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  document.getElementById(tabId).style.display = 'block';
  document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
}

function toggleCalendar() {
  const calendar = document.getElementById('calendar-widget');
  calendar.style.display = calendar.style.display === 'block' ? 'none' : 'block';
}

function changeMonth(direction) {
  // Логика изменения месяца (добавьте вашу реализацию)
}