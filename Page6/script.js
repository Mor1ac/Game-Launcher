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

  // Валидация
  if (!user || !pass) { showError("Заполните все обязательные поля"); return; }
  if (pass !== pass2) { showError("Пароли не совпадают", password2); return; }
  if (pass.length < 4) { showError("Пароль должен быть не менее 4 символов", password); return; }

  // Сохраняем пользователя
  const users = JSON.parse(localStorage.getItem("gg_users") || "{}");

  if (users[user]) {
    showError("Этот username уже занят", username);
    return;
  }

  users[user] = pass;
  localStorage.setItem("gg_users", JSON.stringify(users));
  localStorage.setItem("gg_current_user", user);

  // Переходим на главную
  window.location.href = "/game-launcher/2/index.html";
});

function showError(msg, field) {
  clearErrors();
  const err = document.createElement("p");
  err.className = "error-msg";
  err.textContent = msg;
  confirm.parentNode.insertBefore(err, confirm);
  if (field) field.classList.add("input-error");
}

function clearErrors() {
  document.querySelectorAll(".error-msg").forEach(e => e.remove());
  document.querySelectorAll(".input-error").forEach(e => e.classList.remove("input-error"));
}

// Сброс ошибок при вводе
document.querySelectorAll("input").forEach(inp => {
  inp.addEventListener("input", () => {
    inp.classList.remove("input-error");
    document.querySelectorAll(".error-msg").forEach(e => e.remove());
  });
});