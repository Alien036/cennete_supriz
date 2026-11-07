// Firebase SDK Modülleri (ES Module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Kullanıcının Firebase Yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyCsQwYo0jeDSwrvX5N4YS2cGKorp9ofb10",
  authDomain: "cennete-supriz.firebaseapp.com",
  projectId: "cennete-supriz",
  storageBucket: "cennete-supriz.firebasestorage.app",
  messagingSenderId: "213940271448",
  appId: "1:213940271448:web:be36b84a7d099a336f8d2d",
  measurementId: "G-ZVR41ZDLFE"
};

// Firebase Başlatma
const app = initializeApp(firebaseConfig);

// Analytics (tarayıcı destekliyorsa başlat)
isSupported()
  .then((yes) => {
    if (yes) {
      getAnalytics(app);
    }
  })
  .catch(() => {});

const db = getFirestore(app);
const COLLECTION_NAME = "cennet_responses";

/**
 * Firestore'un reddettiği `undefined` alanları temizler
 */
function sanitizeForFirestore(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Tüm oturum verisini ve cevapları hem Firebase Firestore'a
 * hem de yerel sunucu yedeğine (/api/responses) kaydeder.
 */
async function saveSessionData(sessionData) {
  if (!sessionData || !sessionData.sessionId) return;

  const nowIso = new Date().toISOString();
  const payload = sanitizeForFirestore({
    ...sessionData,
    updatedAt: nowIso
  });

  const docRef = doc(db, COLLECTION_NAME, payload.sessionId);

  // 1. Firebase Firestore'a kesin olarak kaydet (merge: true)
  const firebasePromise = setDoc(docRef, payload, { merge: true }).catch((err) => {
    console.error("Firebase Firestore saveSessionData hatası:", err);
  });

  // 2. Yerel API yedeğine kaydet
  const localPromise = fetch("/api/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(() => {});

  await Promise.allSettled([firebasePromise, localPromise]);
}

/**
 * Kahve daveti Evet / Hayır seçimini mevcut sessionId dökümanının üzerine kesin olarak yazar
 */
async function updateCoffeeChoice(sessionId, { coffeeInviteStatus, coffeeInviteLabel, coffeeRespondedAt, finalNote, answers }) {
  if (!sessionId) return;

  const nowIso = new Date().toISOString();
  const updateData = sanitizeForFirestore({
    sessionId,
    coffeeInviteStatus,
    coffeeInviteLabel,
    coffeeRespondedAt: coffeeRespondedAt || nowIso,
    updatedAt: nowIso,
    ...(finalNote !== undefined ? { finalNote } : {}),
    ...(Array.isArray(answers) ? { answers } : {})
  });

  const docRef = doc(db, COLLECTION_NAME, sessionId);

  const firebasePromise = setDoc(docRef, updateData, { merge: true }).catch((err) => {
    console.error("Firebase Firestore updateCoffeeChoice hatası:", err);
  });

  const localPromise = fetch("/api/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData)
  }).catch(() => {});

  await Promise.allSettled([firebasePromise, localPromise]);
}

/**
 * Son not (finalNote) alanını mevcut sessionId dökümanında günceller
 */
async function updateFinalNote(sessionId, finalNote) {
  if (!sessionId) return;

  const nowIso = new Date().toISOString();
  const updateData = sanitizeForFirestore({
    sessionId,
    finalNote: String(finalNote || "").trim(),
    updatedAt: nowIso
  });

  const docRef = doc(db, COLLECTION_NAME, sessionId);

  const firebasePromise = setDoc(docRef, updateData, { merge: true }).catch((err) => {
    console.error("Firebase Firestore updateFinalNote hatası:", err);
  });

  const localPromise = fetch("/api/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData)
  }).catch(() => {});

  await Promise.allSettled([firebasePromise, localPromise]);
}

/**
 * Tüm kayıtları hem Firebase'den hem yerel sunucudan getirip birleştirir
 */
async function fetchAllResponses() {
  const mergedMap = new Map();

  // Yerel sunucudan oku
  try {
    const res = await fetch("/api/responses");
    if (res.ok) {
      const localList = await res.json();
      if (Array.isArray(localList)) {
        localList.forEach((item) => {
          if (item && item.sessionId) {
            mergedMap.set(item.sessionId, item);
          }
        });
      }
    }
  } catch (e) {}

  // Firebase Firestore'dan oku
  try {
    const snap = await getDocs(collection(db, COLLECTION_NAME));
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      const sid = (data && data.sessionId) || docSnap.id;
      if (sid) {
        mergedMap.set(sid, {
          ...mergedMap.get(sid),
          ...data,
          sessionId: sid,
          syncedWithFirebase: true
        });
      }
    });
  } catch (err) {
    console.warn("Firebase okuma uyarısı:", err.message);
  }

  return Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0)
  );
}

/**
 * Firebase gerçek zamanlı dinleyici (Admin sayfası için)
 */
function subscribeToResponses(onUpdate) {
  try {
    return onSnapshot(
      collection(db, COLLECTION_NAME),
      () => {
        fetchAllResponses().then(onUpdate);
      },
      () => {
        fetchAllResponses().then(onUpdate);
      }
    );
  } catch (e) {
    fetchAllResponses().then(onUpdate);
    return () => {};
  }
}

/**
 * Belirli bir kaydı sil (Test kayıtlarını temizlemek için)
 */
async function deleteResponseRecord(sessionId) {
  if (!sessionId) return;
  const localDel = fetch(`/api/responses/${encodeURIComponent(sessionId)}`, {
    method: "DELETE"
  }).catch(() => {});

  const fbDel = deleteDoc(doc(db, COLLECTION_NAME, sessionId)).catch(() => {});
  await Promise.allSettled([localDel, fbDel]);
}

// Global erişim için window nesnesine bağla
window.FirebaseService = {
  saveSessionData,
  updateCoffeeChoice,
  updateFinalNote,
  fetchAllResponses,
  subscribeToResponses,
  deleteResponseRecord
};
