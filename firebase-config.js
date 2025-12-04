
const firebaseConfig = {
    apiKey: "AIzaSyCBet8G3HOy8_kOSA_KPT9hUZrICsvCpUQ",
    authDomain: "tupniverse-login-2ab22.firebaseapp.com",
    projectId: "tupniverse-login-2ab22",
    storageBucket: "tupniverse-login-2ab22.firebasestorage.app",
    messagingSenderId: "223789253678",
    appId: "1:223789253678:web:80c828a9c2d695a720cbbf"
};

// Initialize Firebase
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const currentPage = window.location.pathname.split('/').pop();

const protectedPages = ['index.html', 'campus.html', 'calendar.html', 'services.html', 'contact.html'];

auth.onAuthStateChanged((user) => {
    if (!user && protectedPages.includes(currentPage)) {
        window.location.replace('login.html');
    }
});