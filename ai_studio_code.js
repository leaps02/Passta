importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Must match the config in index.html
firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    projectId: "YOUR_PROJECT_ID",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
});

const messaging = firebase.messaging();

// Customize background notifications
messaging.onBackgroundMessage((payload) => {
  console.log('[sw.js] Background message received ', payload);
  
  const notificationTitle = payload.notification.title || "Your Gift is Expiring!";
  const notificationOptions = {
    body: payload.notification.body || "Don't forget to use your 50% discount code WELCOME50.",
    icon: 'https://cdn-icons-png.flaticon.com/512/1043/1043432.png', // Replace with your brand logo
    badge: 'https://cdn-icons-png.flaticon.com/512/1043/1043432.png',
    data: { url: 'https://www.thebrandwebsite.com' }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click (Open website)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
