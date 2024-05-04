import firebase from 'firebase/app';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Initialize Firebase with your Firebase project config
const firebaseConfig = {
  apiKey: 'APIKEY',
  authDomain: 'AUTHDOMAIN',
  projectId: 'PROJECTID',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export async function fetchTodos(): Promise<Todo[]> {
  const todosSnapshot = await db.collection('todos').get();
  const todos: Todo[] = [];
  todosSnapshot.forEach((doc) => {
    todos.push({
      id: doc.id,
      ...doc.data() as Todo,
    });
  });
  return todos;
}
