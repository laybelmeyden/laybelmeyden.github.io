export const firebaseConfig = {
  apiKey: "AIzaSyB6ERlRsWeWgDX5sKo8_mTYlrViGU6GIWg",
  authDomain: "gifts-3b709.firebaseapp.com",
  projectId: "gifts-3b709",
  storageBucket: "gifts-3b709.firebasestorage.app",
  messagingSenderId: "379978245480",
  appId: "1:379978245480:web:ee45fb632846ca154f62dd",
  measurementId: "G-HLW9QQTTTS",
};

export function isFirebaseConfigured() {
  return (
    firebaseConfig.apiKey &&
    !firebaseConfig.apiKey.startsWith("PASTE_")
  );
}
