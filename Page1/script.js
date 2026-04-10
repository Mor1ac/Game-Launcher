const userNameInp = document.querySelector(".username");
const password = document.querySelector(".password");
const confirmBtn = document.querySelector(".confirm");

// Основной обработчик клика на кнопку CONFIRM
confirmBtn.addEventListener("click", function (e) {
  // 1. Отменяем стандартный переход по ссылке
  e.preventDefault();

  const user = userNameInp.value.trim();
  const pass = password.value.trim();

  // Очищаем старые ошибки перед новой проверкой
  clearErrors();

  // 2. ПРОВЕРКА НА ПУСТЫЕ ПОЛЯ
  if (!user || !pass) {
    const emptyFields = [];
    if (!user) emptyFields.push(userNameInp);
    if (!pass) emptyFields.push(password);

    // Выводим "Ничего нет", если хотя бы одно поле пустое
    showError("Ничего нет", emptyFields);
    return; // Прерываем выполнение
  }

  // 3. ПРОВЕРКА ДАННЫХ
  // Твой новый админ-аккаунт
  if (user === "Morlac" && pass === "12345") {
    localStorage.setItem("gg_current_user", user);
    window.location.href = "../Page2/index.html";
    return;
  }

  // Проверка через локальную базу данных (localStorage)
  const users = JSON.parse(localStorage.getItem("gg_users") || "{}");

  if (users[user] && users[user] === pass) {
    localStorage.setItem("gg_current_user", user);
    window.location.href = "../Page2/index.html";
  } else {
    // Если данные введены, но они неверны
    showError("Неверный логин или пароль", [userNameInp, password]);
  }
});

/**
 * Функция вывода ошибки
 * @param {string} msg - Текст ошибки
 * @param {HTMLElement|HTMLElement[]} fields - Поле или массив полей для подсветки
 */
function showError(msg, fields) {
  // Создаем элемент <p> с твоим классом из CSS
  const err = document.createElement("p");
  err.className = "error-msg"; // Использует стили: фон, рамка, анимация fadeIn
  err.textContent = msg;

  // Вставляем сообщение прямо перед кнопкой CONFIRM
  confirmBtn.parentNode.insertBefore(err, confirmBtn);

  // Добавляем класс подсветки инпутов из твоего CSS
  if (Array.isArray(fields)) {
    fields.forEach((f) => f.classList.add("input-error"));
  } else {
    fields.classList.add("input-error");
  }
}

/**
 * Функция удаления всех ошибок
 */
function clearErrors() {
  // Удаляем текст сообщения
  const existingError = document.querySelector(".error-msg");
  if (existingError) existingError.remove();

  // Убираем красные рамки у инпутов
  userNameInp.classList.remove("input-error");
  password.classList.remove("input-error");
}

/**
 * Живое слушание ввода: убираем ошибку сразу, как только пользователь начал печатать
 */
[userNameInp, password].forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("input-error");
    const err = document.querySelector(".error-msg");
    if (err) err.remove();
  });
});