import Home from "./component/Home";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_API_KEY,
  authDomain: "chatter-ebb5e.firebaseapp.com",
  projectId: "chatter-ebb5e",
  storageBucket: "chatter-ebb5e.appspot.com",
  messagingSenderId: "111195601360",
  appId: import.meta.env.VITE_PUBLIC_APP_ID,
  measurementId: "G-YD4XZ2H1L4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const Storage = getStorage(app);
export const provider = new GoogleAuthProvider();

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
