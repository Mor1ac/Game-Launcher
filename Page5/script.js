document.addEventListener("DOMContentLoaded", () => {
  const nameDisplay = document.querySelector(".name");
  const currentUser = localStorage.getItem("gg_current_user");

  if (currentUser && nameDisplay) {
    nameDisplay.textContent = `Hello, ${currentUser}`;
  }
});

// ===== ЭЛЕМЕНТЫ =====
const o = document.querySelector(".o");
const burgerMenu = document.querySelector(".burger-menu");
const btnChat = document.getElementById("btnChat");
const btnFriends = document.getElementById("btnFriends");
const btnNotif = document.getElementById("btnNotif");
const m1 = document.getElementById("panelFriends");
const m2 = document.getElementById("panelChat");
const m3 = document.getElementById("panelNotif");
const forSearch = document.querySelector(".for__search");
const searchCont = document.querySelector(".search__cont");
const launcherContainer = document.getElementById("launcherContainer");
const settingsBtn = document.querySelector(".im8"); // Кнопка настроек
let burgerOpen = false;

// Универсальная функция закрытия всех панелей
function closeAll() {
  const panels = [m1, m2, m3, launcherContainer, searchCont];
  panels.forEach(panel => {
    if (panel) panel.style.display = "none";
  });
}

// ===== БУРГЕР =====
if (burgerMenu) {
  burgerMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    burgerOpen = !burgerOpen;
    o.style.display = burgerOpen ? "flex" : "none";
    o.classList.toggle("oo", burgerOpen);
  });
}

// ===== ИКОНКИ (ПАНЕЛИ) =====
if (btnChat) {
  btnChat.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = m2.style.display === "flex";
    closeAll();
    m2.style.display = open ? "none" : "flex";
  });
}

if (btnFriends) {
  btnFriends.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = m1.style.display === "flex";
    closeAll();
    m1.style.display = open ? "none" : "flex";
  });
}

if (btnNotif) {
  btnNotif.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = m3.style.display === "flex";
    closeAll();
    if (!open) {
      m3.style.display = "flex";
      const badge = document.querySelector(".img3__badge");
      if (badge) badge.style.display = "none";
    }
  });
}

// ===== ПОИСК (ИСПРАВЛЕНО) =====
if (forSearch) {
  forSearch.addEventListener("focus", (e) => {
    e.stopPropagation();
    const rect = forSearch.getBoundingClientRect();
    searchCont.style.top = rect.bottom + 10 + "px";
    searchCont.style.left = rect.left + rect.width / 2 + "px";
    searchCont.style.transform = "translateX(-50%)";
    searchCont.style.display = "flex";
  });

  // Останавливаем закрытие при клике внутри инпута
  forSearch.addEventListener("click", (e) => e.stopPropagation());
}

const cards = document.querySelectorAll(".search__card");
cards.forEach((card) => {
  const p = card.querySelector("p");
  if (p) card.dataset.text = p.textContent.trim();
});

if (forSearch) {
  forSearch.addEventListener("input", function () {
    const value = this.value.trim().toLowerCase();
    cards.forEach((card) => {
      const textEl = card.querySelector("p");
      const orig = card.dataset.text;
      if (!orig) return;

      if (!value) {
        card.classList.remove("hide");
        textEl.innerHTML = orig;
        return;
      }
      const idx = orig.toLowerCase().indexOf(value);
      if (idx === -1) {
        card.classList.add("hide");
      } else {
        card.classList.remove("hide");
        textEl.innerHTML =
          orig.slice(0, idx) +
          `<span class="highlight">${orig.slice(idx, idx + value.length)}</span>` +
          orig.slice(idx + value.length);
      }
    });
  });
}

// ===== ЛАУНЧЕР НАСТРОЕК (ИСПРАВЛЕНО) =====
if (settingsBtn && launcherContainer) {
  settingsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (launcherContainer.style.display === "block") {
      launcherContainer.style.display = "none";
    } else {
      closeAll(); // Закрываем другие панели перед открытием
      const rect = settingsBtn.getBoundingClientRect();
      launcherContainer.style.display = "block";
      const h = launcherContainer.offsetHeight;
      let top = rect.top;
      if (top + h > window.innerHeight - 20) top = window.innerHeight - h - 20;
      launcherContainer.style.top = top + "px";
      launcherContainer.style.left = rect.right + 12 + "px";
    }
  });
}

const menuItems = document.querySelectorAll(".menu__item");
const launcherSettings = document.querySelectorAll(".launcher__settings");

menuItems.forEach((item, idx) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation(); // Чтобы настройки не закрывались при переключении табов
    menuItems.forEach((i) => i.classList.remove("menu__item-active"));
    launcherSettings.forEach((s) => s.classList.remove("launcher__settings--active"));
    item.classList.add("menu__item-active");
    if (launcherSettings[idx]) {
      launcherSettings[idx].classList.add("launcher__settings--active");
    }
  });
});

// Дополнительно: останавливаем закрытие при клике на любые опции внутри настроек
launcherContainer?.addEventListener("click", (e) => {
  e.stopPropagation();
});

// ===== ЗАКРЫТИЕ ПО КЛИКУ СНАРУЖИ =====
document.addEventListener("click", () => {
  closeAll();
  if (burgerOpen) {
    if (o) o.style.display = "none";
    if (o) o.classList.remove("oo");
    burgerOpen = false;
  }
});

// Останавливаем всплытие для всех основных контейнеров (защита)
[m1, m2, m3, o, launcherContainer, searchCont].forEach((el) => {
  if (el) {
    el.addEventListener("click", (e) => e.stopPropagation());
  }
});

// ===== ПОПАП ИГР =====
const gameData = {
  search__card1: {
    title: "VALORANT",
    cover: "https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-773ea2de7951435e977ba5f5f6934442?resize=1&w=720&h=480&quality=medium",
    badge: "Бесплатно",
    tags: ["Шутер", "Экшен", "Многопользовательская"],
    desc: "Тактический шутер 5 на 5 от Riot Games.",
    dev: "Riot Games",
    date: "03.06.2020",
    price: "Бесплатно",
    link: "../Page4/index2.html",
  },
  search__card__2: {
    title: "Minecraft",
    cover: "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Homepage_Discover-our-games_MC-Vanilla-KeyArt_864x864.jpg",
    badge: "Платная",
    tags: ["Песочница", "Выживание", "Крафт"],
    desc: "Исследуйте бесконечные миры и стройте что угодно.",
    dev: "Mojang Studios",
    date: "18.11.2011",
    price: "1 900 ₽",
    link: "../Page4/index6.html",
  },
  search__card__3: {
    title: "Dota 2",
    cover: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/570/header.jpg?t=1766010373",
    badge: "Бесплатно",
    tags: ["MOBA", "Стратегия", "Командная"],
    desc: "Самая глубокая многопользовательская стратегия в мире.",
    dev: "Valve",
    date: "09.07.2013",
    price: "Бесплатно",
    link: "../Page4/index5.html",
  },
  search__card__4: {
    title: "Counter-Strike 2",
    cover: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1749053861",
    badge: "Бесплатно",
    tags: ["Шутер", "Экшен", "Соревновательная"],
    desc: "Крупнейший технологический скачок в истории CS.",
    dev: "Valve",
    date: "27.09.2023",
    price: "Бесплатно",
    link: "../Page4/index4.html",
  },
  search__card__5: {
    title: "Terraria",
    cover: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg?t=1731252354",
    badge: "Платная",
    tags: ["Песочница", "Выживание", "Крафт"],
    desc: "Копайте, сражайтесь, исследуйте, стройте!",
    dev: "Re-Logic",
    date: "16.05.2011",
    price: "419 ₽",
    link: "../Page4/index3.html",
  },
};

const overlay = document.getElementById("gamePopupOverlay");
const popupClose = document.getElementById("gamePopupClose");

function openGamePopup(cls) {
  const d = gameData[cls];
  if (!d) return;
  document.getElementById("popupCover").src = d.cover;
  document.getElementById("popupTitle").textContent = d.title;
  document.getElementById("popupBadge").textContent = d.badge;
  document.getElementById("popupDesc").textContent = d.desc;
  document.getElementById("popupDev").textContent = d.dev;
  document.getElementById("popupDate").textContent = d.date;
  document.getElementById("popupPrice").textContent = d.price;
  
  const tagsCont = document.getElementById("popupTags");
  if (tagsCont) {
    tagsCont.innerHTML = d.tags.map((t) => `<span class="game-popup__tag">${t}</span>`).join("");
  }
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

Object.keys(gameData).forEach((cls) => {
  const card = document.querySelector("." + cls);
  if (!card) return;
  card.addEventListener("click", (e) => {
    e.stopPropagation();
    searchCont.style.display = "none";
    openGamePopup(cls);
  });
});

if (popupClose) {
  popupClose.addEventListener("click", () => {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });
}