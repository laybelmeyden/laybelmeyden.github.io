import {
  deleteDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { auth, db, isFirebaseConfigured } from "./firebase.js";
import { unpackUrl } from "./urls.js";

const params = new URLSearchParams(location.search);
const uid = params.get("uid") || "";
const id = params.get("id") || "";

const statusEl = document.querySelector("#card-status");
const sheetEl = document.querySelector("#gift-sheet");
const frameEl = document.querySelector("#card-frame");
const titleEl = document.querySelector("#card-title");
const priceEl = document.querySelector("#card-price");
const linkEl = document.querySelector("#card-link");
const deleteBtn = document.querySelector("#card-delete");
const closeBtn = document.querySelector("#card-close");

function showStatus(message) {
  if (sheetEl) sheetEl.hidden = true;
  if (statusEl) {
    statusEl.hidden = false;
    statusEl.textContent = message;
  }
}

async function loadCard(user) {
  if (!uid || !id) {
    showStatus("В ссылке нет UID или id подарка.");
    return;
  }

  try {
    const snap = await getDoc(doc(db, "lists", uid, "items", id));
    if (!snap.exists()) {
      showStatus("Этот подарок не найден.");
      return;
    }

    const data = snap.data();
    const title = data.title || "Без названия";
    const imageUrl = unpackUrl(data, "imageUrl");
    const productUrl = unpackUrl(data, "productUrl");
    const price = data.price ? String(data.price) : "";

    document.title = `${title} — подарок`;
    titleEl.textContent = title;
    priceEl.textContent = price ? `Стоимость: ${price}` : "";
    priceEl.hidden = !price;

    frameEl.replaceChildren();
    if (imageUrl) {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = title;
      img.referrerPolicy = "no-referrer";
      img.addEventListener("error", () => {
        frameEl.classList.add("is-empty");
        img.remove();
      });
      frameEl.append(img);
      frameEl.classList.remove("is-empty");
    } else {
      frameEl.classList.add("is-empty");
    }

    if (productUrl) {
      linkEl.href = productUrl;
      linkEl.hidden = false;
    } else {
      linkEl.hidden = true;
    }

    deleteBtn.hidden = user.uid !== uid;
    statusEl.hidden = true;
    sheetEl.hidden = false;
  } catch (error) {
    if (error?.code === "permission-denied") {
      showStatus("Нет доступа к этому подарку.");
      return;
    }
    showStatus(error?.message || "Не получилось открыть подарок.");
  }
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    window.close();
    location.href = "./";
  });
}

if (deleteBtn) {
  deleteBtn.addEventListener("click", async () => {
    if (!auth.currentUser || auth.currentUser.uid !== uid) return;
    deleteBtn.disabled = true;
    try {
      await deleteDoc(doc(db, "lists", uid, "items", id));
      window.close();
      location.href = "./";
    } catch (error) {
      deleteBtn.disabled = false;
      showStatus(error?.message || "Не получилось удалить.");
    }
  });
}

if (!isFirebaseConfigured() || !auth || !db) {
  showStatus("Firebase не настроен.");
} else {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      showStatus("Сначала войдите на главной странице.");
      return;
    }
    loadCard(user);
  });
}
