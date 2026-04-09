const email    = document.querySelector(".email");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const password2= document.querySelector(".password2");
const confirm  = document.querySelector(".confirm");

confirm.addEventListener("click", function(e) {
  e.preventDefault();
  clearErrors();

  const em   = email    ? email.value.trim()    : "";
  const user = username ? username.value.trim() : "";
  const pass = password ? password.value.trim() : "";
  const pass2= password2? password2.value.trim(): "";

  // ===== ПРОВЕРКА ПУСТЫХ ПОЛЕЙ =====
  if (!em) { 
    showError("Введите ваш Email", email); 
    return; 
  }
  if (!user) { 
    showError("Придумайте никнейм", username); 
    return; 
  }
  if (!pass) { 
    showError("Введите пароль", password); 
    return; 
  }
  if (!pass2) { 
    showError("Повторите пароль для проверки", password2); 
    return; 
  }

  // ===== ПРОВЕРКА ВАЛИДНОСТИ =====
  if (pass !== pass2) { 
    showError("Пароли не совпадают", password2); 
    return; 
  }
  if (pass.length < 4) { 
    showError("Пароль слишком короткий (минимум 4 символа)", password); 
    return; 
  }

  // ===== ЛОГИКА СОХРАНЕНИЯ =====
  const users = JSON.parse(localStorage.getItem("gg_users") || "{}");

  if (users[user]) {
    showError("Этот никнейм уже занят", username);
    return;
  }

  // Сохраняем пользователя в общую базу
  users[user] = pass;
  localStorage.setItem("gg_users", JSON.stringify(users));
  
  // Сохраняем НИКНЕЙМ для главной страницы (Page2)
  localStorage.setItem("userNickname", user);

  // Переходим в лаунчер (путь согласно твоей структуре папок)
  window.location.href = "../Page2/index.html";
});

// ФУНКЦИЯ ВЫВОДА ОШИБКИ
function showError(msg, field) {
  clearErrors();
  
  const err = document.createElement("p");
  err.className = "error-msg";
  err.textContent = msg;
  
  // Вставляем ошибку перед кнопкой подтверждения
  confirm.parentNode.insertBefore(err, confirm);
  
  // Подсвечиваем поле красным
  if (field) {
    field.classList.add("input-error");
    field.focus(); 
  }
}

// ФУНКЦИЯ ОЧИСТКИ ОШИБОК
function clearErrors() {
  document.querySelectorAll(".error-msg").forEach(e => e.remove());
  document.querySelectorAll("input").forEach(inp => inp.classList.remove("input-error"));
}

// Убираем красную рамку при вводе
document.querySelectorAll("input").forEach(inp => {
  inp.addEventListener("input", () => {
    inp.classList.remove("input-error");
    const existingError = document.querySelector(".error-msg");
    if (existingError) existingError.remove();
  });
});