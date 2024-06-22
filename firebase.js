import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Initialize Firebase with your Firebase project config
const firebaseConfig = {
  apiKey: 'APIKEY',
  authDomain: 'AUTHDOMAIN',
  projectId: 'PROJECTID',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function fetchTodos() {
  const todosSnapshot = await getDocs(collection(db, 'todos'));
  const todos = [];
  todosSnapshot.forEach((doc) => {
    todos.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return todos;
}
