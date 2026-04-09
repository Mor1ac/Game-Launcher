const userNameInp = document.querySelector(".username");
const password = document.querySelector(".password");
const confirmBtn = document.querySelector(".confirm");

confirmBtn.addEventListener("click", function(e) {
  // 1. ПЕРВОЕ ДЕЛО: Останавливаем автоматический переход по ссылке <a>
  e.preventDefault();

  const user = userNameInp.value.trim();
  const pass = password.value.trim();

  // Очищаем старые ошибки перед новой проверкой
  clearErrors();

  // 2. ПРОВЕРКА НА ПУСТЫЕ ПОЛЯ
  if (!user && !pass) {
    showError("Введите логин и пароль", [userNameInp, password]);
    return; // Останавливаем выполнение функции, дальше код не пойдет
  } 
  
  if (!user) {
    showError("Поле логина не заполнено", userNameInp);
    return;
  }

  if (!pass) {
    showError("Поле пароля не заполнено", password);
    return;
  }

  // 3. ПРОВЕРКА ДАННЫХ (если поля не пустые)
  if (user === "user" && pass === "2422") {
    localStorage.setItem("gg_current_user", user);
    window.location.href = "Page2/index.html"; // Переход только при успехе
    return;
  }

  // Проверка через localStorage для зарегистрированных
  const users = JSON.parse(localStorage.getItem("gg_users") || "{}");
  if (users[user] && users[user] === pass) {
    localStorage.setItem("gg_current_user", user);
    window.location.href = "Page2/index.html";
  } else {
    showError("Неверный логин или пароль", [userNameInp, password]);
  }
});

// Функция для вывода ошибки
function showError(msg, fields) {
  const err = document.createElement("p");
  err.className = "error-msg";
  err.style.color = "#ff4d4d"; // Красный текст
  err.style.fontSize = "12px";
  err.style.marginTop = "10px";
  err.textContent = msg;

  // Вставляем текст ошибки перед кнопкой
  confirmBtn.parentNode.insertBefore(err, confirmBtn);

  // Добавляем красную рамку полям
  if (Array.isArray(fields)) {
    fields.forEach(f => f.classList.add("input-error"));
  } else {
    fields.classList.add("input-error");
  }
}

// Функция очистки ошибок
function clearErrors() {
  document.querySelectorAll(".error-msg").forEach(e => e.remove());
  document.querySelectorAll(".input-error").forEach(e => e.classList.remove("input-error"));
}