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
isSupported().then((yes) => {
  if (yes) {
    getAnalytics(app);
  }
}).catch(() => {});

const db = getFirestore(app);
const COLLECTION_NAME = "cennet_responses";

/**
 * Sonuçları ve kahve teklifi durumunu hem Firebase Firestore'a
 * hem de yerel sunucu yedeğine (/api/responses) kaydeder.
 */
async function saveSessionData(sessionData) {
  if (!sessionData || !sessionData.sessionId) return;

  const payload = {
    ...sessionData,
    updatedAt: new Date().toISOString()
  };

  // 1. Yerel API yedeğine kaydet (her koşulda çalışması için)
  const localPromise = fetch("/api/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(() => {});

  // 2. Firebase Firestore'a kaydet
  const firebasePromise = setDoc(
    doc(db, COLLECTION_NAME, payload.sessionId),
    payload,
    { merge: true }
  ).catch((err) => {
    console.warn("Firebase Firestore kayıt uyarısı:", err.message);
  });

  await Promise.allSettled([localPromise, firebasePromise]);
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
      if (data && data.sessionId) {
        mergedMap.set(data.sessionId, { ...mergedMap.get(data.sessionId), ...data, syncedWithFirebase: true });
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
        // Firestore kuralları veya bağlantı hatası olursa yerel veriyi yükle
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
  fetchAllResponses,
  subscribeToResponses,
  deleteResponseRecord
};

