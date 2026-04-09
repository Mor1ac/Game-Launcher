// ===== ПРОВЕРКА ИМЕНИ ПОЛЬЗОВАТЕЛЯ =====
document.addEventListener("DOMContentLoaded", () => {
  const nameDisplay = document.querySelector(".name");
  // Пытаемся взять имя из localStorage (как в вашем скрипте входа)
  const savedName = localStorage.getItem("gg_current_user") || "Tina Park";
  if (nameDisplay) {
    nameDisplay.textContent = `Hello, ${savedName}`;
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
const settingsBtn = document.getElementById("settingsBtn");
let burgerOpen = false;

// Универсальная функция закрытия всех панелей
function closeAll() {
  [m1, m2, m3, launcherContainer].forEach(panel => {
    if (panel) panel.style.display = "none";
  });
}

// ===== БУРГЕР =====
if (burgerMenu && o) {
  burgerMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    burgerOpen = !burgerOpen;
    o.style.display = burgerOpen ? "flex" : "none";
    o.classList.toggle("oo", burgerOpen);
  });
}

// ===== ИКОНКИ ПАНЕЛЕЙ =====
const setupToggle = (btn, panel) => {
  if (!btn || !panel) return;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = panel.style.display === "flex";
    closeAll();
    panel.style.display = isOpen ? "none" : "flex";
    
    // Специфическая логика для уведомлений (очистка бейджа)
    if (btn === btnNotif && !isOpen) {
      const badge = document.querySelector(".img3__badge");
      if (badge) badge.style.display = "none";
      document.querySelectorAll(".m3__item--unread").forEach(el => el.classList.remove("m3__item--unread"));
      document.querySelectorAll(".m3__dot").forEach(el => el.style.opacity = "0");
    }
  });
};

setupToggle(btnChat, m2);
setupToggle(btnFriends, m1);
setupToggle(btnNotif, m3);

// ===== ПОИСК =====
if (forSearch && searchCont) {
  forSearch.addEventListener("focus", (e) => {
    e.stopPropagation();
    const r = forSearch.getBoundingClientRect();
    searchCont.style.top = `${r.bottom + 10}px`;
    searchCont.style.left = `${r.left + r.width / 2}px`;
    searchCont.style.transform = "translateX(-50%)";
    searchCont.style.display = "flex";
  });

  forSearch.addEventListener("blur", () => {
    setTimeout(() => { searchCont.style.display = "none"; }, 200);
  });

  const cards = document.querySelectorAll(".search__card");
  cards.forEach(c => {
    const p = c.querySelector("p");
    if (p) c.dataset.text = p.textContent.trim();
  });

  forSearch.addEventListener("input", function() {
    const v = this.value.trim().toLowerCase();
    cards.forEach(c => {
      const el = c.querySelector("p");
      const orig = c.dataset.text;
      if (!v) {
        c.classList.remove("hide");
        el.innerHTML = orig;
        return;
      }
      const idx = orig.toLowerCase().indexOf(v);
      if (idx === -1) {
        c.classList.add("hide");
      } else {
        c.classList.remove("hide");
        el.innerHTML = `${orig.slice(0, idx)}<span class="highlight">${orig.slice(idx, idx + v.length)}</span>${orig.slice(idx + v.length)}`;
      }
    });
  });
}

// ===== ЗАКРЫТИЕ ПРИ КЛИКЕ ВНЕ ПАНЕЛЕЙ =====
document.addEventListener("click", () => {
  closeAll();
  if (searchCont) searchCont.style.display = "none";
  if (burgerOpen && o) {
    o.style.display = "none";
    o.classList.remove("oo");
    burgerOpen = false;
  }
});

// ===== ПОПАП ИГРЫ =====
const gameData = {
  search__card1: { title: "VALORANT", cover: "https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-773ea2de7951435e977ba5f5f6934442?resize=1&w=720&h=480&quality=medium", badge: "Бесплатно", tags: ["Шутер", "Экшен"], desc: "Тактический шутер 5 на 5.", dev: "Riot Games", date: "03.06.2020", price: "Бесплатно", link: "../Page4/index2.html" },
  search__card__2: { title: "Minecraft", cover: "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Homepage_Discover-our-games_MC-Vanilla-KeyArt_864x864.jpg", badge: "Платная", tags: ["Песочница", "Выживание"], desc: "Мир из блоков.", dev: "Mojang", date: "18.11.2011", price: "1 900 ₽", link: "../Page4/index6.html" },
  search__card__3: { title: "Dota 2", cover: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/570/header.jpg?t=1766010373", badge: "Бесплатно", tags: ["MOBA", "Стратегия"], desc: "Битва Древних.", dev: "Valve", date: "09.07.2013", price: "Бесплатно", link: "../Page4/index5.html" },
  search__card__4: { title: "Counter-Strike 2", cover: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1749053861", badge: "Бесплатно", tags: ["Шутер"], desc: "Легендарный тактический шутер.", dev: "Valve", date: "27.09.2023", price: "Бесплатно", link: "../Page4/index4.html" },
  search__card__5: { title: "Terraria", cover: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg?t=1731252354", badge: "Платная", tags: ["Экшен", "RPG"], desc: "Приключения в 2D мире.", dev: "Re-Logic", date: "16.05.2011", price: "419 ₽", link: "../Page4/index3.html" }
};

const overlay = document.getElementById("gamePopupOverlay");
const popupClose = document.getElementById("gamePopupClose");

function openGamePopup(cls) {
  const d = gameData[cls];
  if (!d || !overlay) return;
  document.getElementById("popupCover").src = d.cover;
  document.getElementById("popupTitle").textContent = d.title;
  document.getElementById("popupBadge").textContent = d.badge;
  document.getElementById("popupDesc").textContent = d.desc;
  document.getElementById("popupDev").textContent = d.dev;
  document.getElementById("popupDate").textContent = d.date;
  document.getElementById("popupPrice").textContent = d.price;
  document.getElementById("popupLink").href = d.link;
  document.getElementById("popupTags").innerHTML = d.tags.map(t => `<span class="game-popup__tag">${t}</span>`).join("");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

Object.keys(gameData).forEach(cls => {
  const el = document.querySelector(`.${cls}`);
  if (el) el.onclick = (e) => { e.stopPropagation(); openGamePopup(cls); };
});

if (popupClose) popupClose.onclick = () => { overlay.classList.remove("active"); document.body.style.overflow = ""; };

// ===== ЧАТ =====
const chatList = document.getElementById("chatList"), chatOpen = document.getElementById("chatOpen");
const chatInput = document.getElementById("chatInput"), chatMessages = document.getElementById("chatMessages");

function sendMessage() {
  const t = chatInput.value.trim();
  if (!t) return;
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const msg = document.createElement("div");
  msg.className = "m2__msg m2__msg--out";
  msg.innerHTML = `<p>${t}</p><span>${time}</span>`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  chatInput.value = "";
  
  setTimeout(() => {
    const r = ["GG!", "Лол", "Ок", "👍"];
    const re = document.createElement("div");
    re.className = "m2__msg m2__msg--in";
    re.innerHTML = `<p>${r[Math.floor(Math.random()*r.length)]}</p><span>${time}</span>`;
    chatMessages.appendChild(re);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);
}

if (document.getElementById("chatSend")) {
  document.getElementById("chatSend").onclick = (e) => { e.stopPropagation(); sendMessage(); };
}

// ===== ЛАУНЧЕР (SETTINGS) =====
if (settingsBtn && launcherContainer) {
  settingsBtn.onclick = (e) => {
    e.stopPropagation();
    const isVisible = launcherContainer.style.display === "block";
    closeAll();
    if (!isVisible) {
      launcherContainer.style.display = "block";
      const r = settingsBtn.getBoundingClientRect();
      launcherContainer.style.top = `${Math.min(r.top, window.innerHeight - launcherContainer.offsetHeight - 20)}px`;
      launcherContainer.style.left = `${r.right + 12}px`;
    }
  };
}