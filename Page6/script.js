const email    = document.querySelector(".email");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const password2= document.querySelector(".password2");
const confirmBtn = document.querySelector(".confirm");

confirmBtn.addEventListener("click", function(e) {
  // Останавливаем любое стандартное действие ссылки
  e.preventDefault();
  
  // Очищаем старые ошибки и рамки
  clearErrors();

  const em   = email    ? email.value.trim()    : "";
  const user = username ? username.value.trim() : "";
  const pass = password ? password.value.trim() : "";
  const pass2= password2? password2.value.trim(): "";

  // ===== ГЛАВНАЯ ПРОВЕРКА =====
  // Если хоть одно важное поле пустое - выводим ошибку и СТОП
  if (!em || !user || !pass || !pass2) {
    showError("Ошибка: Заполните все поля!", [email, username, password, password2]);
    return; // Важно! Этот return не дает коду идти дальше к переходу
  }

  // Проверка совпадения паролей
  if (pass !== pass2) {
    showError("Пароли не совпадают!", password2);
    return;
  }

  // Проверка длины
  if (pass.length < 4) {
    showError("Пароль слишком короткий!", password);
    return;
  }

  // ===== ЕСЛИ ВСЁ ОК — СОХРАНЯЕМ И ПЕРЕХОДИМ =====
  
  // 1. Сохраняем в общую базу (для будущих входов)
  const users = JSON.parse(localStorage.getItem("gg_users") || "{}");
  if (users[user]) {
    showError("Этот никнейм уже занят", username);
    return;
  }
  users[user] = pass;
  localStorage.setItem("gg_users", JSON.stringify(users));

  // 2. Сохраняем ТЕКУЩЕГО юзера для отображения "Hello, Name"
  localStorage.setItem("gg_current_user", user);

  // 3. Только теперь делаем переход
  window.location.href = "../Page2/index.html";
});

// ФУНКЦИЯ ВЫВОДА ОШИБКИ
function showError(msg, fields) {
  const err = document.createElement("p");
  err.className = "error-msg";
  err.textContent = msg;
  
  // Вставляем текст ошибки перед кнопкой
  confirmBtn.parentNode.insertBefore(err, confirmBtn);
  
  // Подсвечиваем поля красным
  if (Array.isArray(fields)) {
    fields.forEach(f => { if(f) f.classList.add("input-error"); });
  } else if (fields) {
    fields.classList.add("input-error");
  }
}

// ФУНКЦИЯ ОЧИСТКИ
function clearErrors() {
  document.querySelectorAll(".error-msg").forEach(e => e.remove());
  document.querySelectorAll("input").forEach(inp => inp.classList.remove("input-error"));
}