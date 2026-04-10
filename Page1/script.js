const userNameInp = document.querySelector(".username");
const password = document.querySelector(".password");
const confirmBtn = document.querySelector(".confirm");

confirmBtn.addEventListener("click", function(e) {
  // 1. Останавливаем переход по ссылке
  e.preventDefault();

  const user = userNameInp.value.trim();
  const pass = password.value.trim();

  // Очищаем старые ошибки перед новой проверкой
  clearErrors();

  // 2. ПРОВЕРКА НА ПУСТЫЕ ПОЛЯ
  // Если хотя бы одно из полей (или оба) пустые
  if (!user || !pass) {
    const emptyFields = [];
    if (!user) emptyFields.push(userNameInp);
    if (!pass) emptyFields.push(password);
    
    // Пишем "Ничего нет", если поля пустые
    showError("Ничего нет", emptyFields);
    return;
  }

  // 3. ПРОВЕРКА ДАННЫХ
  // Проверка твоего нового аккаунта: Morlac / 12345
  if (user === "Morlac" && pass === "12345") {
    localStorage.setItem("gg_current_user", user);
    window.location.href = "Page2/index.html"; 
    return;
  }

  // Проверка через "базу данных" (localStorage) для остальных
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

// Убираем красную рамку сразу, когда пользователь начинает печатать
[userNameInp, password].forEach(input => {
  input.addEventListener("input", () => {
    input.classList.remove("input-error");
    const err = document.querySelector(".error-msg");
    if (err) err.remove();
  });
});