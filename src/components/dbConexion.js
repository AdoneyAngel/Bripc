import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {//estas son las mismas variables pero estan seguras de ser accedidas por el usuario
  apiKey: "AIzaSyDmQ4WrvdTkbumgBW9S68FC9aMoQ2bgGTg",
  authDomain: "bripc-7b1b1.firebaseapp.com",
  databaseURL: "https://bripc-7b1b1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bripc-7b1b1",
  storageBucket: "bripc-7b1b1.appspot.com",
  messagingSenderId: "718963746222",
  appId: "1:718963746222:web:07cf319232aafb62dfd43f"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export default db