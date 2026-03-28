const userNameInp = document.querySelector(".username");
const password = document.querySelector(".password");
const confirm = document.querySelector(".confirm");

confirm.addEventListener("click", function(e) {
  e.preventDefault();

  const user = userNameInp.value.trim();
  const pass = password.value.trim();

  if (!user || !pass) {
    showError("Заполните все поля");
    return;
  }

  // Проверяем дефолтный аккаунт
  if (user === "user" && pass === "2422") {
    window.location.href = "/game-launcher/2/index.html";
    return;
  }

  // Проверяем зарегистрированных пользователей
  const users = JSON.parse(localStorage.getItem("gg_users") || "{}");

  if (users[user] && users[user] === pass) {
    localStorage.setItem("gg_current_user", user);
    window.location.href = "/game-launcher/2/index.html";
  } else if (users[user]) {
    showError("Неверный пароль", password);
  } else {
    showError("Пользователь не найден", userNameInp);
  }
});

function showError(msg, field) {
  // Убираем старые ошибки
  document.querySelectorAll(".error-msg").forEach(e => e.remove());
  document.querySelectorAll(".input-error").forEach(e => e.classList.remove("input-error"));

  const err = document.createElement("p");
  err.className = "error-msg";
  err.textContent = msg;
  confirm.parentNode.insertBefore(err, confirm);

  if (field) field.classList.add("input-error");
}

// Сброс ошибки при вводе
[userNameInp, password].forEach(inp => {
  inp.addEventListener("input", () => {
    inp.classList.remove("input-error");
    document.querySelectorAll(".error-msg").forEach(e => e.remove());
  });
});