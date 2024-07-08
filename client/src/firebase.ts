// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlHxd8e5-5ycuthMNSKjfbTrGa_pxlsfM",
  authDomain: "ecommercewebsite-1d890.firebaseapp.com",
  projectId: "ecommercewebsite-1d890",
  storageBucket: "ecommercewebsite-1d890.appspot.com",
  messagingSenderId: "238104821576",
  appId: "1:238104821576:web:3b16b417673fa179eefd7d",
  measurementId: "G-ZKEEPR7YE7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);

export default storage;
