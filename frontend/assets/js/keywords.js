const keywords = [
  { keyword: "программист", url: "about.html" },
  { keyword: "ресурсы", url: "resources.html" },
  { keyword: "поддержать", url: "support.html" },
  { keyword: "о сайте", url: "about.html" },
  { keyword: "контакты", url: "support.html" },
  { keyword: "проекты", url: "resources.html" },
  { keyword: "github", url: "resources.html" },
  { keyword: "youtube", url: "about.html" },
  { keyword: "java", url: "resources.html" },
  { keyword: "python", url: "resources.html" },
  { keyword: "javascript", url: "resources.html" },
  { keyword: "html", url: "resources.html" },
  { keyword: "css", url: "resources.html" },
  { keyword: "react", url: "resources.html" },
  { keyword: "nodejs", url: "resources.html" },
  { keyword: "sql", url: "resources.html" },
  { keyword: "mongodb", url: "resources.html" },
  { keyword: "api", url: "resources.html" },
  { keyword: "frontend", url: "resources.html" },
  { keyword: "backend", url: "resources.html" },
  { keyword: "разработка", url: "about.html" },
  { keyword: "дизайн", url: "about.html" },
  { keyword: "технологии", url: "resources.html" },
  { keyword: "код", url: "resources.html" },
  { keyword: "dermitkes", url: "about.html" },
  { keyword: "поиск", url: "index.html" }
];

function handleInput() {
  const input = document.getElementById('search-input').value.toLowerCase();
  const suggestions = document.getElementById('autocomplete-suggestions');
  const searchBar = document.getElementById('search-bar');
  const clearIcon = document.getElementById('clear-icon');

  suggestions.innerHTML = '';

  if (input.length > 0) {
    clearIcon.classList.add('active');
    const filteredKeywords = keywords.filter(item => item.keyword.toLowerCase().startsWith(input));

    if (filteredKeywords.length > 0) {
      searchBar.classList.add('active');
      suggestions.classList.add('active');
      filteredKeywords.forEach(item => {
        const suggestion = document.createElement('div');
        suggestion.textContent = item.keyword;
        suggestion.onclick = () => {
          document.getElementById('search-input').value = item.keyword;
          window.location.href = item.url;
        };
        suggestions.appendChild(suggestion);
      });
    } else {
      searchBar.classList.remove('active');
      suggestions.classList.remove('active');
    }
  } else {
    clearIcon.classList.remove('active');
    searchBar.classList.remove('active');
    suggestions.classList.remove('active');
  }
}

function clearSearch() {
  const input = document.getElementById('search-input');
  const suggestions = document.getElementById('autocomplete-suggestions');
  const searchBar = document.getElementById('search-bar');
  const clearIcon = document.getElementById('clear-icon');

  input.value = '';
  suggestions.innerHTML = '';
  searchBar.classList.remove('active');
  suggestions.classList.remove('active');
  clearIcon.classList.remove('active');
}

function search() {
  const input = document.getElementById('search-input').value.toLowerCase();
  const match = keywords.find(item => item.keyword.toLowerCase() === input);

  if (match) {
    window.location.href = match.url;
  }
  // Если совпадений нет, ничего не делаем
}