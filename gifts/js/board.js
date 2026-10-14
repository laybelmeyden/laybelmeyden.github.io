import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
import { db } from "./firebase.js";
import { httpUrl, unpackUrl, urlFields } from "./urls.js";

const boardEl = document.querySelector("#board");
const gridEl = document.querySelector("#gift-grid");
const emptyEl = document.querySelector("#gift-empty");
const emptyTextEl = document.querySelector("#gift-empty-text");
const errorEl = document.querySelector("#board-error");
const formErrorEl = document.querySelector("#gift-form-error");
const guestNote = document.querySelector("#guest-note");
const addTopBtn = document.querySelector("#add-gift-top");
const addEmptyBtn = document.querySelector("#add-gift-empty");
const addModal = document.querySelector("#add-modal");
const form = document.querySelector("#gift-form");
const saveBtn = document.querySelector("#gift-save");
const titleInput = document.querySelector("#gift-title");
const imageInput = document.querySelector("#gift-image");
const linkInput = document.querySelector("#gift-link");
const priceInput = document.querySelector("#gift-price");
const lookupForm = document.querySelector("#lookup-form");
const lookupInput = document.querySelector("#lookup-uid");
const myListBtn = document.querySelector("#my-list");
const openListBtn = document.querySelector("#open-list");
const shareListBtn = document.querySelector("#share-list");
const openModal = document.querySelector("#open-modal");
const toastEl = document.querySelector("#toast");
const userEmailEl = document.querySelector("#user-email");
const userUidEl = document.querySelector("#user-uid");
const listHeadingEl = document.querySelector("#list-heading");
const navEmailWrap = document.querySelector("#nav-email-wrap");
const logoutBtn = document.querySelector("#logout");
const goLogin = document.querySelector("#go-login");
const giftModal = document.querySelector("#gift-modal");
const giftViewStatus = document.querySelector("#gift-view-status");
const giftViewBody = document.querySelector("#gift-view-body");
const giftViewFrame = document.querySelector("#gift-view-frame");
const giftViewTitle = document.querySelector("#gift-view-title");
const giftViewPrice = document.querySelector("#gift-view-price");
const giftViewLink = document.querySelector("#gift-view-link");
const giftViewDelete = document.querySelector("#gift-view-delete");

let currentUser = null;
let viewedUid = "";
let stopListen = null;
let lastHasItems = false;
let lastItems = [];
let openedGiftId = "";

function setBoardError(message) {
  if (!errorEl) return;
  errorEl.textContent = message || "";
  errorEl.hidden = !message;
}

function setFormError(message) {
  if (!formErrorEl) return;
  formErrorEl.textContent = message || "";
  formErrorEl.hidden = !message;
}

function syncAddButtons(hasItems) {
  lastHasItems = hasItems;
  const mine = isOwner();
  if (addTopBtn) addTopBtn.hidden = !(mine && hasItems);
  if (addEmptyBtn) addEmptyBtn.hidden = !(mine && !hasItems);
}

function isOwner() {
  return Boolean(currentUser && viewedUid && currentUser.uid === viewedUid);
}

function itemsRef(uid) {
  return collection(db, "lists", uid, "items");
}

function humanizeFirestoreError(error) {
  const code = error?.code || "";
  if (code === "permission-denied") {
    return "Нет доступа. В Firebase включите Firestore и вставьте правила из gifts/firestore.rules.";
  }
  if (code === "failed-precondition" || code === "not-found") {
    return "Сначала создайте базу Firestore в Firebase Console.";
  }
  if (code === "invalid-argument") {
    return "Ссылка слишком длинная. Вставьте прямую ссылку на картинку.";
  }
  if (code === "unavailable") return "Firestore сейчас недоступен. Попробуйте ещё раз.";
  return error?.message || "Не получилось загрузить список.";
}

function setViewedUid(uid, pushUrl) {
  viewedUid = String(uid || "").trim();
  if (pushUrl) {
    const url = new URL(location.href);
    if (currentUser && viewedUid === currentUser.uid) url.searchParams.delete("uid");
    else url.searchParams.set("uid", viewedUid);
    history.replaceState({}, "", url);
  }
}

function renderChrome() {
  const mine = isOwner();
  const signedIn = Boolean(currentUser);
  if (userEmailEl) userEmailEl.textContent = currentUser?.email || "";
  if (userUidEl) userUidEl.textContent = currentUser?.uid || viewedUid || "—";
  if (navEmailWrap) navEmailWrap.hidden = !signedIn;
  if (logoutBtn) logoutBtn.hidden = !signedIn;
  if (goLogin) goLogin.hidden = signedIn;
  if (listHeadingEl) {
    listHeadingEl.textContent = mine ? "Ваш список подарков" : "Список подарков";
  }
  if (guestNote) guestNote.hidden = mine;
  if (myListBtn) myListBtn.hidden = !signedIn || mine;
  syncAddButtons(lastHasItems);
}

function tileTemplate(item) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "gift-tile";
  button.dataset.id = item.id;

  const frame = document.createElement("div");
  frame.className = "gift-tile-frame";

  if (item.imageUrl) {
    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.title || "Подарок";
    img.referrerPolicy = "no-referrer";
    img.addEventListener("error", () => {
      img.remove();
      frame.classList.add("is-empty");
    });
    frame.append(img);
  } else {
    frame.classList.add("is-empty");
  }

  const name = document.createElement("strong");
  name.textContent = item.title || "Без названия";

  const price = document.createElement("span");
  price.className = "gift-tile-price";
  price.textContent = item.price ? String(item.price) : "";

  button.append(frame, name);
  if (item.price) button.append(price);
  return button;
}

function renderGrid(items) {
  lastItems = items;
  if (!gridEl || !emptyEl) return;
  gridEl.replaceChildren();
  const hasItems = items.length > 0;
  emptyEl.hidden = hasItems;
  if (emptyTextEl) {
    emptyTextEl.textContent = isOwner()
      ? "Пока пусто. Добавьте первый подарок."
      : "У этого человека пока нет подарков.";
  }
  syncAddButtons(hasItems);
  if (!hasItems) return;
  for (const item of items) {
    gridEl.append(tileTemplate(item));
  }
}

function listen() {
  if (stopListen) {
    stopListen();
    stopListen = null;
  }
  if (!db || !viewedUid) return;

  stopListen = onSnapshot(
    itemsRef(viewedUid),
    (snap) => {
      setBoardError("");
      const items = snap.docs.map((entry) => {
        const data = entry.data();
        return {
          id: entry.id,
          title: data.title || "",
          imageUrl: unpackUrl(data, "imageUrl"),
          productUrl: unpackUrl(data, "productUrl"),
          price: data.price || "",
          createdAt: data.createdAt?.toMillis?.() || 0,
        };
      });
      items.sort((a, b) => b.createdAt - a.createdAt);
      renderGrid(items);
    },
    (error) => {
      const message = humanizeFirestoreError(error);
      renderGrid([]);
      setBoardError(message);
      showToast(message);
    }
  );
}

function fillGiftFrame(imageUrl, title) {
  if (!giftViewFrame) return;
  giftViewFrame.replaceChildren();
  if (!imageUrl) {
    giftViewFrame.classList.add("is-empty");
    return;
  }
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = title;
  img.referrerPolicy = "no-referrer";
  img.addEventListener("error", () => {
    img.remove();
    giftViewFrame.classList.add("is-empty");
  });
  giftViewFrame.append(img);
  giftViewFrame.classList.remove("is-empty");
}

function showGiftView(item) {
  if (!giftModal || !item) return;
  openedGiftId = item.id;
  if (giftViewStatus) giftViewStatus.hidden = true;
  if (giftViewBody) giftViewBody.hidden = false;
  const title = item.title || "Без названия";
  if (giftViewTitle) giftViewTitle.textContent = title;
  if (giftViewPrice) {
    giftViewPrice.textContent = item.price ? `Стоимость: ${item.price}` : "";
    giftViewPrice.hidden = !item.price;
  }
  fillGiftFrame(item.imageUrl, title);
  if (giftViewLink) {
    if (item.productUrl) {
      giftViewLink.href = item.productUrl;
      giftViewLink.hidden = false;
    } else {
      giftViewLink.hidden = true;
    }
  }
  if (giftViewDelete) giftViewDelete.hidden = !isOwner();
  giftModal.hidden = false;
}

async function openCard(id) {
  if (!id || !giftModal) return;
  openedGiftId = id;
  if (giftViewStatus) {
    giftViewStatus.hidden = false;
    giftViewStatus.textContent = "Открываем подарок…";
  }
  if (giftViewBody) giftViewBody.hidden = true;
  giftModal.hidden = false;

  let item = lastItems.find((entry) => entry.id === id);
  if (!item) {
    try {
      const snap = await getDoc(doc(db, "lists", viewedUid, "items", id));
      if (!snap.exists()) {
        if (giftViewStatus) giftViewStatus.textContent = "Этот подарок не найден.";
        return;
      }
      const data = snap.data();
      item = {
        id: snap.id,
        title: data.title || "",
        imageUrl: unpackUrl(data, "imageUrl"),
        productUrl: unpackUrl(data, "productUrl"),
        price: data.price || "",
      };
    } catch (error) {
      if (giftViewStatus) giftViewStatus.textContent = humanizeFirestoreError(error);
      return;
    }
  }
  showGiftView(item);
}

export function setBoardUser(user) {
  currentUser = user || null;
  const sharedUid = new URLSearchParams(location.search).get("uid")?.trim() || "";
  if (!currentUser && !sharedUid) {
    if (stopListen) stopListen();
    stopListen = null;
    viewedUid = "";
    return;
  }
  if (!boardEl) return;

  setViewedUid(sharedUid || currentUser.uid, false);
  renderChrome();
  renderGrid([]);
  listen();
}

if (gridEl) {
  gridEl.addEventListener("click", (event) => {
    const tile = event.target.closest(".gift-tile");
    if (!tile) return;
    openCard(tile.dataset.id);
  });
}

function closeModal(el) {
  if (el) el.hidden = true;
}

function openAddModal() {
  if (!isOwner() || !addModal) return;
  setFormError("");
  addModal.hidden = false;
  titleInput?.focus();
}

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toastEl.hidden = true;
  }, 2200);
}

function listShareUrl() {
  const url = new URL(location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("uid", viewedUid || currentUser?.uid || "");
  return url.href;
}

if (openListBtn) {
  openListBtn.addEventListener("click", () => {
    if (!openModal) return;
    openModal.hidden = false;
    lookupInput?.focus();
  });
}

if (openModal) {
  openModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) closeModal(openModal);
  });
}

if (addModal) {
  addModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) closeModal(addModal);
  });
}

if (giftModal) {
  giftModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) closeModal(giftModal);
  });
}

if (giftViewDelete) {
  giftViewDelete.addEventListener("click", async () => {
    if (!isOwner() || !openedGiftId) return;
    giftViewDelete.disabled = true;
    try {
      await deleteDoc(doc(db, "lists", viewedUid, "items", openedGiftId));
      closeModal(giftModal);
      showToast("Подарок удалён");
    } catch (error) {
      showToast(humanizeFirestoreError(error));
    } finally {
      giftViewDelete.disabled = false;
    }
  });
}

if (addTopBtn) addTopBtn.addEventListener("click", openAddModal);
if (addEmptyBtn) addEmptyBtn.addEventListener("click", openAddModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal(openModal);
    closeModal(addModal);
    closeModal(giftModal);
  }
});

if (shareListBtn) {
  shareListBtn.addEventListener("click", async () => {
    const link = listShareUrl();
    try {
      await navigator.clipboard.writeText(link);
      showToast("Ссылка скопирована");
    } catch {
      showToast("Не удалось скопировать ссылку");
    }
  });
}

if (lookupForm) {
  lookupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const uid = lookupInput.value.trim();
    if (!uid) return;
    setViewedUid(uid, true);
    renderChrome();
    listen();
    closeModal(openModal);
  });
}

if (myListBtn) {
  myListBtn.addEventListener("click", () => {
    if (!currentUser) return;
    lookupInput.value = "";
    setViewedUid(currentUser.uid, true);
    renderChrome();
    listen();
    closeModal(openModal);
  });
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setFormError("");
    if (!isOwner()) {
      setFormError("Добавлять подарки можно только в свой лист.");
      return;
    }

    const title = titleInput.value.trim();
    if (!title) return;

    const imageUrl = httpUrl(imageInput.value);
    const productUrl = httpUrl(linkInput.value);
    if (imageInput.value.trim() && !imageUrl) {
      setFormError("Картинка: нужен адрес http или https.");
      return;
    }
    if (linkInput.value.trim() && !productUrl) {
      setFormError("Ссылка на товар: нужен адрес http или https.");
      return;
    }

    saveBtn.disabled = true;
    try {
      await setDoc(
        doc(db, "lists", currentUser.uid),
        {
          email: currentUser.email || "",
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      await addDoc(itemsRef(currentUser.uid), {
        title,
        price: priceInput.value.trim(),
        createdAt: serverTimestamp(),
        ...urlFields("imageUrl", imageUrl),
        ...urlFields("productUrl", productUrl),
      });
      form.reset();
      closeModal(addModal);
      showToast("Подарок сохранён");
    } catch (error) {
      const message = humanizeFirestoreError(error);
      setFormError(message);
      showToast(message);
    } finally {
      saveBtn.disabled = false;
    }
  });
}
