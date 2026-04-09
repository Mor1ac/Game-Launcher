const usernameInput = document.querySelector(".username");
const passwordInput = document.querySelector(".password");
const loginBtn      = document.querySelector(".confirm");

loginBtn.addEventListener("click", function(e) {
  e.preventDefault();
  clearErrors();

  const user = usernameInput.value.trim();
  const pass = passwordInput.value.trim();

  // 1. Проверка пустых полей
  if (!user) {
    showError("Введите никнейм", usernameInput);
    return;
  }
  if (!pass) {
    showError("Введите пароль", passwordInput);
    return;
  }

  // 2. Получаем базу пользователей
  const users = JSON.parse(localStorage.getItem("gg_users") || "{}");

  // 3. Проверка существования пользователя и пароля
  if (!users[user]) {
    showError("Пользователь не найден", usernameInput);
  } else if (users[user] !== pass) {
    showError("Неверный пароль", passwordInput);
  } else {
    // Если всё верно:
    // Сохраняем никнейм для отображения в лаунчере
    localStorage.setItem("userNickname", user);
    
    // Переходим на главную
    window.location.href = "../Page2/index.html";
  }
});

// Функция вывода ошибок (как в регистрации)
function showError(msg, field) {
  const err = document.createElement("p");
  err.className = "error-msg";
  err.textContent = msg;
  
  loginBtn.parentNode.insertBefore(err, loginBtn);
  
  if (field) {
    field.classList.add("input-error");
    field.focus();
  }
}

// Очистка ошибок
function clearErrors() {
  document.querySelectorAll(".error-msg").forEach(e => e.remove());
  document.querySelectorAll("input").forEach(inp => inp.classList.remove("input-error"));
}

// Сброс красной рамки при вводе
document.querySelectorAll("input").forEach(inp => {
  inp.addEventListener("input", () => {
    inp.classList.remove("input-error");
    const existingError = document.querySelector(".error-msg");
    if (existingError) existingError.remove();
  });
});