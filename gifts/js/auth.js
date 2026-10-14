import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { auth, isFirebaseConfigured } from "./firebase.js";
import { setBoardUser } from "./board.js";

const setupEl = document.querySelector("#setup");
const appEl = document.querySelector("#app");
const boardEl = document.querySelector("#board");
const bottomEl = document.querySelector(".bottom");
const userBar = document.querySelector("#user-bar");
const form = document.querySelector("#auth-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorEl = document.querySelector("#error");
const signedOutEl = document.querySelector("#signed-out");
const submitBtn = document.querySelector("#submit");
const toggleBtn = document.querySelector("#toggle-mode");
const logoutBtn = document.querySelector("#logout");
const googleBtn = document.querySelector("#google");
const titleEl = document.querySelector("#form-title");
const dialogueEl = document.querySelector("#dialogue");
const dialogueBox = document.querySelector("#dialogue-box");

const giftLines = [
  "* Подарок — это милость, которую можно подержать в руках.",
  "* Даже маленький сюрприз может отогреть целый день.",
  "* Доброта почти ничего не весит. Её всё равно тяжело забыть.",
  "* Подарок говорит то, что голос стесняется.",
  "* Милость не просит сдачи. Она просто остаётся.",
  "* Самый тёплый бантик — тот, что завязан от сердца.",
  "* Не цена делает подарок. Делает взгляд, с которым его отдают.",
  "* Иногда коробка пустая, а внутри уже целый свет.",
  "* Дарить — значит оставлять кусочек тепла у другого.",
  "* Милость подарков тихая. Она не стучит. Она ждёт.",
];

let lastGiftIndex = 0;
let giftTimer = null;
let mode = "login";

function nextGiftLine() {
  if (!dialogueEl) return;
  let index = Math.floor(Math.random() * giftLines.length);
  if (index === lastGiftIndex) {
    index = (index + 1) % giftLines.length;
  }
  lastGiftIndex = index;
  dialogueEl.textContent = giftLines[index];
}

function startGiftTimer() {
  clearInterval(giftTimer);
  giftTimer = setInterval(nextGiftLine, 10000);
}

function showNextGiftLine() {
  nextGiftLine();
  startGiftTimer();
}

nextGiftLine();
startGiftTimer();

if (dialogueBox) {
  dialogueBox.addEventListener("click", showNextGiftLine);
  dialogueBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showNextGiftLine();
    }
  });
}

function setError(message) {
  if (!errorEl) return;
  errorEl.textContent = message || "";
  errorEl.hidden = !message;
}

function setMode(nextMode) {
  mode = nextMode;
  const isLogin = mode === "login";
  if (titleEl) titleEl.textContent = isLogin ? "Вход" : "Регистрация";
  if (submitBtn) submitBtn.textContent = isLogin ? "Войти" : "Создать";
  if (toggleBtn) {
    toggleBtn.textContent = isLogin
      ? "Нет аккаунта? Создать"
      : "Уже есть аккаунт? Войти";
  }
  setError("");
}

function humanizeAuthError(error) {
  const code = error?.code || "";
  const map = {
    "auth/email-already-in-use": "Этот email уже зарегистрирован.",
    "auth/invalid-email": "Некорректный email.",
    "auth/weak-password": "Пароль слишком короткий. Минимум 6 символов.",
    "auth/user-not-found": "Пользователь не найден.",
    "auth/wrong-password": "Неверный пароль.",
    "auth/invalid-credential": "Неверный email или пароль.",
    "auth/too-many-requests": "Слишком много попыток. Подождите минуту.",
    "auth/network-request-failed": "Нет сети или Firebase недоступен.",
    "auth/operation-not-allowed": "Этот способ входа ещё не включён в Firebase.",
    "auth/popup-closed-by-user": "Окно Google закрыто, вход не завершён.",
    "auth/cancelled-popup-request": "Повторный вход через Google отменён.",
    "auth/unauthorized-domain": "Добавьте домен сайта в Authorized domains.",
  };
  return map[code] || error.message || "Не получилось войти.";
}

function renderUser(user) {
  document.body.classList.add("auth-ready");
  const sharedUid = new URLSearchParams(location.search).get("uid")?.trim();

  if (user || sharedUid) {
    if (appEl) appEl.hidden = true;
    if (boardEl) boardEl.hidden = false;
    if (bottomEl) bottomEl.hidden = true;
    if (userBar) userBar.hidden = false;
    document.body.classList.add("in-app");
    document.title = "Gifts — список";
    setBoardUser(user);
  } else {
    if (appEl) appEl.hidden = false;
    if (boardEl) boardEl.hidden = true;
    if (bottomEl) bottomEl.hidden = false;
    if (userBar) userBar.hidden = true;
    if (signedOutEl) signedOutEl.hidden = false;
    document.body.classList.remove("in-app");
    document.title = "Gifts — вход";
    setBoardUser(null);
  }
}

if (!isFirebaseConfigured()) {
  setupEl.hidden = false;
  if (appEl) appEl.hidden = true;
  if (boardEl) boardEl.hidden = true;
  if (userBar) userBar.hidden = true;
} else {
  setupEl.hidden = true;
  if (appEl) appEl.hidden = true;
  if (boardEl) boardEl.hidden = true;
  if (bottomEl) bottomEl.hidden = true;
  if (userBar) userBar.hidden = true;

  onAuthStateChanged(auth, (user) => {
    renderUser(user);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setError("");
    submitBtn.disabled = true;

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try {
      if (mode === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      form.reset();
    } catch (error) {
      setError(humanizeAuthError(error));
    } finally {
      submitBtn.disabled = false;
    }
  });

  toggleBtn.addEventListener("click", () => {
    setMode(mode === "login" ? "register" : "login");
  });

  googleBtn.addEventListener("click", async () => {
    setError("");
    googleBtn.disabled = true;
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      setError(humanizeAuthError(error));
    } finally {
      googleBtn.disabled = false;
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      setError("");
      await signOut(auth);
    });
  }
}

setMode("login");
