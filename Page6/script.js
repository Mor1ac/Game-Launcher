const email    = document.querySelector(".email");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const password2= document.querySelector(".password2");
const confirm  = document.querySelector(".confirm");

confirm.addEventListener("click", function(e) {
  e.preventDefault(); // Останавливаем переход, пока не проверим поля
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
    showError("Поле никнейма не заполнено", username); 
    return; 
  }
  if (!pass) { 
    showError("Введите пароль", password); 
    return; 
  }
  if (!pass2) { 
    showError("Повторите пароль", password2); 
    return; 
  }

  // ===== ВАЛИДАЦИЯ =====
  if (pass !== pass2) { 
    showError("Пароли не совпадают", password2); 
    return; 
  }
  if (pass.length < 4) { 
    showError("Пароль слишком короткий (мин. 4 символа)", password); 
    return; 
  }

  // ===== СОХРАНЕНИЕ ДАННЫХ =====
  const users = JSON.parse(localStorage.getItem("gg_users") || "{}");

  if (users[user]) {
    showError("Этот никнейм уже занят", username);
    return;
  }

  // Сохраняем в базу данных
  users[user] = pass;
  localStorage.setItem("gg_users", JSON.stringify(users));
  
  // Сохраняем ТЕКУЩЕГО пользователя для главной страницы
  localStorage.setItem("gg_current_user", user);

  // Переход на главную (убедись, что путь верный)
  window.location.href = "../Page2/index.html"; 
});

function showError(msg, field) {
  const err = document.createElement("p");
  err.className = "error-msg";
  err.style.color = "#ff4d4d"; // Красный цвет текста
  err.style.fontSize = "13px";
  err.style.marginBottom = "15px";
  err.style.textAlign = "center";
  err.textContent = msg;
  
  confirm.parentNode.insertBefore(err, confirm);
  
  if (field) {
    field.classList.add("input-error");
    field.focus();
  }
}

function clearErrors() {
  document.querySelectorAll(".error-msg").forEach(e => e.remove());
  document.querySelectorAll("input").forEach(inp => inp.classList.remove("input-error"));
}