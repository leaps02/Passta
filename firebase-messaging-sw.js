// Force the Service Worker to wake up immediately
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// --- PASTE THE EXACT SAME KEYS HERE AGAIN ---
firebase.initializeApp({
    apiKey: "AIzaSyCdmxqyvuz2RNYe_HWRceg3JiJkH0c03TY",
    authDomain: "passta-85c7a.firebaseapp.com",
    projectId: "passta-85c7a",
    storageBucket: "passta-85c7a.firebasestorage.app",
    messagingSenderId: "690886140069",
    appId: "1:690886140069:web:13048793908361ad19ad4c",
    measurementId: "G-TPRQP5CKTM"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/1043/1043432.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
