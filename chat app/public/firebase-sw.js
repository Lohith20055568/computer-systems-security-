importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBYccN8Rp-vptNrBVsUUC2i72NbvRV8ZF8",
  authDomain: "chat-3eb3a.firebaseapp.com",
  projectId: "chat-3eb3a",
  storageBucket: "chat-3eb3a.firebasestorage.app",
  messagingSenderId: "644153889817",
  appId: "1:644153889817:web:f2109bf0013a47ef348688",
  measurementId: "G-4YPCWYDLG3"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Background Message received: ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
