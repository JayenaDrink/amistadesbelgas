// firebase-messaging-sw.js
// Carga Firebase en el SW (importScripts es soportado en SW)
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAzb1g7DOGluAfcvyWushkkqcHawh2FHaM",
  authDomain: "amistades-belgas.firebaseapp.com",
  projectId: "amistades-belgas",
  storageBucket: "amistades-belgas.firebasestorage.app",
  messagingSenderId: "897458358699",
  appId: "1:897458358699:web:842a5f29287e230ab02aee"
});

// Inicializa Messaging en el SW
const messaging = firebase.messaging();

// (Opcional) Personaliza la notificación en segundo plano
messaging.onBackgroundMessage((payload) => {
  // payload.notification: { title, body, icon, ... }
  const title = (payload.notification && payload.notification.title) || 'Amistades Belgas';
  const options = {
    body: payload.notification && payload.notification.body,
    icon: '/amistadesbelgas/icon-192.png',   // opcional, pon un icono si lo tienes
    badge: '/amistadesbelgas/badge.png',     // opcional
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

// (Opcional) click en la notificación
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = '/amistadesbelgas/'; // abre el front
  event.waitUntil(clients.matchAll({type: 'window'}).then(list => {
    for (const client of list) {
      if (client.url.includes(url) && 'focus' in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow(url);
  }));
});
