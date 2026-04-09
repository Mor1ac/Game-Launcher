const userNameInp = document.querySelector(".username");
const password = document.querySelector(".password");
const confirmBtn = document.querySelector(".confirm");

confirmBtn.addEventListener("click", function(e) {
  // 1. Останавливаем переход по ссылке href, чтобы выполнить проверку
  e.preventDefault();

  const user = userNameInp.value.trim();
  const pass = password.value.trim();

  // Очищаем старые ошибки перед новой проверкой
  clearErrors();

  // 2. ПРОВЕРКА НА ПУСТЫЕ ПОЛЯ
  // Если оба поля пустые
  if (!user && !pass) {
    showError("Введите логин и пароль", [userNameInp, password]);
    return; // Останавливаем код, переход не случится
  } 
  
  // Если пусто только имя
  if (!user) {
    showError("Поле логина не заполнено", userNameInp);
    return;
  }

  // Если пуст только пароль
  if (!pass) {
    showError("Поле пароля не заполнено", password);
    return;
  }

  // 3. ПРОВЕРКА ДАННЫХ (если поля заполнены)
  
  // Проверка стандартного админ-аккаунта
  if (user === "user" && pass === "2422") {
    localStorage.setItem("gg_current_user", user);
    window.location.href = "Page2/index.html"; 
    return;
  }

  // Проверка через базу данных (localStorage) для зарегистрированных
  const users = JSON.parse(localStorage.getItem("gg_users") || "{}");
  
  if (users[user] && users[user] === pass) {
    localStorage.setItem("gg_current_user", user);
    window.location.href = "Page2/index.html";
  } else {
    // Если логин/пароль не подошли
    showError("Неверный логин или пароль", [userNameInp, password]);
  }
});

// Функция для вывода ошибки
function showError(msg, fields) {
  const err = document.createElement("p");
  err.className = "error-msg";
  err.textContent = msg;

  // Вставляем текст ошибки ПЕРЕД кнопкой
  confirmBtn.parentNode.insertBefore(err, confirmBtn);

  // Подсвечиваем поля красной рамкой
  if (Array.isArray(fields)) {
    fields.forEach(f => f.classList.add("input-error"));
  } else {
    fields.classList.add("input-error");
  }
}

// Функция очистки ошибок
function clearErrors() {
  const existingError = document.querySelector(".error-msg");
  if (existingError) existingError.remove();
  
  userNameInp.classList.remove("input-error");
  password.classList.remove("input-error");
}

// Дополнительно: убираем красную рамку сразу, как только пользователь начал что-то печатать
[userNameInp, password].forEach(input => {
  input.addEventListener("input", () => {
    input.classList.remove("input-error");
    const err = document.querySelector(".error-msg");
    if (err) err.remove();
  });
});