import firebase from 'firebase/app'
import "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAtnjcdLAjltYTzU86m7_ymNObskTu00fY",
  authDomain: "weather-3517e.firebaseapp.com",
  projectId: "weather-3517e",
  storageBucket: "weather-3517e.appspot.com",
  messagingSenderId: "231377391865",
  appId: "1:231377391865:web:ef7ee3291d532aeff5d228",
  measurementId: "G-5404D0LR51"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase app is initiated");
}else {
  firebase.app(); // if already initialized, use that one
}

const firestore = firebase.firestore();
export async function getData(date) {
  const weatherRef = firestore.collection('thoitiet').doc(date);
  const snapshot = await weatherRef.get();
  const data = snapshot.data();
  return data;
}
