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

document.querySelector(".name").textContent = "Hello, Tina Park";

function closeAll() {
  m1.style.display = "none";
  m2.style.display = "none";
  m3.style.display = "none";
  launcherContainer.style.display = "none";
}

// БУРГЕР
burgerMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  burgerOpen = !burgerOpen;
  o.style.display = burgerOpen ? "flex" : "none";
  o.classList.toggle("oo", burgerOpen);
});

// ИКОНКИ
btnChat.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = m2.style.display === "flex";
  closeAll();
  m2.style.display = open ? "none" : "flex";
});
btnFriends.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = m1.style.display === "flex";
  closeAll();
  m1.style.display = open ? "none" : "flex";
});
btnNotif.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = m3.style.display === "flex";
  closeAll();
  if (!open) {
    m3.style.display = "flex";
    const b = document.querySelector(".img3__badge");
    if (b) b.style.display = "none";
    document
      .querySelectorAll(".m3__item--unread")
      .forEach((el) => el.classList.remove("m3__item--unread"));
    document
      .querySelectorAll(".m3__dot")
      .forEach((el) => (el.style.opacity = "0"));
  }
});

// ПОИСК
forSearch.addEventListener("focus", (e) => {
  e.stopPropagation();
  const r = forSearch.getBoundingClientRect();
  searchCont.style.top = r.bottom + 10 + "px";
  searchCont.style.left = r.left + r.width / 2 + "px";
  searchCont.style.transform = "translateX(-50%)";
  searchCont.style.display = "flex";
});
forSearch.addEventListener("blur", () => {
  setTimeout(() => {
    searchCont.style.display = "none";
  }, 200);
});
forSearch.addEventListener("click", (e) => e.stopPropagation());
searchCont.addEventListener("click", (e) => e.stopPropagation());
const cards = document.querySelectorAll(".search__card");
cards.forEach((c) => {
  c.dataset.text = c.querySelector("p").textContent.trim();
});
forSearch.addEventListener("input", function () {
  const v = this.value.trim().toLowerCase();
  cards.forEach((c) => {
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
      el.innerHTML =
        orig.slice(0, idx) +
        `<span class="highlight">${orig.slice(idx, idx + v.length)}</span>` +
        orig.slice(idx + v.length);
    }
  });
});

// ЗАКРЫТИЕ СНАРУЖИ
[m1, m2, m3, launcherContainer].forEach((p) =>
  p.addEventListener("click", (e) => e.stopPropagation()),
);
o.addEventListener("click", (e) => e.stopPropagation());
document.addEventListener("click", () => {
  closeAll();
  searchCont.style.display = "none";
  if (burgerOpen) {
    o.style.display = "none";
    o.classList.remove("oo");
    burgerOpen = false;
  }
});

// ПОПАП
const gameData = {
  search__card1: {
    title: "VALORANT",
    cover:
      "https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-773ea2de7951435e977ba5f5f6934442?resize=1&w=720&h=480&quality=medium",
    badge: "Бесплатно",
    tags: ["Шутер", "Экшен", "Мультиплеер"],
    desc: "Тактический шутер 5 на 5 от Riot Games.",
    dev: "Riot Games",
    date: "03.06.2020",
    price: "Бесплатно",
    link: "../Page4//index2.html",
  },
  search__card__2: {
    title: "Minecraft",
    cover:
      "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Homepage_Discover-our-games_MC-Vanilla-KeyArt_864x864.jpg",
    badge: "Платная",
    tags: ["Песочница", "Выживание", "Крафт"],
    desc: "Исследуйте бесконечные миры и стройте что угодно.",
    dev: "Mojang Studios",
    date: "18.11.2011",
    price: "1 900 ₽",
    link: "../Page4//index6.html",
  },
  search__card__3: {
    title: "Dota 2",
    cover:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/570/header.jpg?t=1766010373",
    badge: "Бесплатно",
    tags: ["MOBA", "Стратегия"],
    desc: "Самая глубокая многопользовательская стратегия.",
    dev: "Valve",
    date: "09.07.2013",
    price: "Бесплатно",
    link: "../Page4//index5.html",
  },
  search__card__4: {
    title: "Counter-Strike 2",
    cover:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1749053861",
    badge: "Бесплатно",
    tags: ["Шутер", "Соревновательная"],
    desc: "Крупнейший скачок в истории CS.",
    dev: "Valve",
    date: "27.09.2023",
    price: "Бесплатно",
    link: "../Page4//index4.html",
  },
  search__card__5: {
    title: "Terraria",
    cover:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg?t=1731252354",
    badge: "Платная",
    tags: ["Песочница", "Выживание", "Крафт"],
    desc: "Копайте, сражайтесь, стройте!",
    dev: "Re-Logic",
    date: "16.05.2011",
    price: "419 ₽",
    link: "../Page4//index3.html",
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
  document.getElementById("popupLink").href = d.link;
  document.getElementById("popupTags").innerHTML = d.tags
    .map((t) => `<span class="game-popup__tag">${t}</span>`)
    .join("");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeGamePopup() {
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}
Object.keys(gameData).forEach((cls) => {
  const c = document.querySelector("." + cls);
  if (!c) return;
  c.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    searchCont.style.display = "none";
    openGamePopup(cls);
  });
});
popupClose.addEventListener("click", closeGamePopup);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeGamePopup();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeGamePopup();
});

// БЕЙДЖ
const uc = document.querySelectorAll(".m3__item--unread").length;
if (uc > 0) {
  const b = document.createElement("div");
  b.className = "img3__badge";
  b.textContent = uc;
  btnNotif.appendChild(b);
}
document.querySelector(".m3__clear").addEventListener("click", (e) => {
  e.stopPropagation();
  document.querySelector(".m3__list").innerHTML =
    `<div style="padding:30px 16px;text-align:center;color:rgba(255,255,255,0.3);font-size:13px;">Нет уведомлений</div>`;
});

// ЧАТ
const chatList = document.getElementById("chatList"),
  chatOpen = document.getElementById("chatOpen");
const chatName = document.getElementById("chatName"),
  chatAvatar = document.getElementById("chatAvatar");
const chatMessages = document.getElementById("chatMessages"),
  chatInput = document.getElementById("chatInput"),
  chatSend = document.getElementById("chatSend");
document.querySelectorAll(".m2__chat-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    chatName.textContent = item.dataset.friend;
    chatAvatar.className = "m2__av " + item.dataset.avatarClass;
    chatAvatar.innerHTML =
      item.dataset.avatarLetter +
      '<span class="m2__av-status m2__av-status--on"></span>';
    const b = item.querySelector(".m2__unread-badge");
    if (b) b.remove();
    item.classList.remove("m2__chat-item--unread");
    chatList.style.display = "none";
    chatOpen.style.display = "flex";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
});
document.querySelector(".m2__back").addEventListener("click", (e) => {
  e.stopPropagation();
  chatOpen.style.display = "none";
  chatList.style.display = "flex";
});
function sendMessage() {
  const t = chatInput.value.trim();
  if (!t) return;
  const time = new Date().toTimeString().slice(0, 5);
  const msg = document.createElement("div");
  msg.className = "m2__msg m2__msg--out";
  msg.innerHTML = `<p>${t}</p><span>${time}</span>`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  chatInput.value = "";
  setTimeout(() => {
    const r = ["👍", "ок", "gg", "лол", "😂"];
    const re = document.createElement("div");
    re.className = "m2__msg m2__msg--in";
    re.innerHTML = `<p>${r[Math.floor(Math.random() * r.length)]}</p><span>${time}</span>`;
    chatMessages.appendChild(re);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1200);
}
chatSend.addEventListener("click", (e) => {
  e.stopPropagation();
  sendMessage();
});
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.stopPropagation();
    sendMessage();
  }
});

// ЛАУНЧЕР
settingsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (launcherContainer.style.display === "block") {
    launcherContainer.style.display = "none";
    return;
  }
  const rect = settingsBtn.getBoundingClientRect();
  launcherContainer.style.display = "block";
  const h = launcherContainer.offsetHeight;
  let top = rect.top;
  if (top + h > window.innerHeight - 20) top = window.innerHeight - h - 20;
  launcherContainer.style.top = top + "px";
  launcherContainer.style.left = rect.right + 12 + "px";
});
const menuItems = document.querySelectorAll(".menu__item");
const launcherSettings = document.querySelectorAll(".launcher__settings");
menuItems.forEach((item, idx) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    menuItems.forEach((i) => i.classList.remove("menu__item-active"));
    launcherSettings.forEach((s) =>
      s.classList.remove("launcher__settings--active"),
    );
    item.classList.add("menu__item-active");
    launcherSettings[idx].classList.add("launcher__settings--active");
  });
});
menuItems[0].classList.add("menu__item-active");
launcherSettings[0].classList.add("launcher__settings--active");
document
  .querySelector(".action__button--save")
  .addEventListener("click", (e) => {
    e.stopPropagation();
    launcherContainer.style.display = "none";
  });
document
  .querySelector(".action__button--reset")
  .addEventListener("click", (e) => e.stopPropagation());
