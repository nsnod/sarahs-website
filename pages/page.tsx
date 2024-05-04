// pages/page.tsx

import { fetchTodos, Todo } from '../firebase';

interface TodoPageProps {
  todos: Todo[];
}

export default function TodoPage({ todos }: TodoPageProps) {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text} - {todo.completed ? 'Completed' : 'Not Completed'}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const todos: Todo[] = await fetchTodos();
  return {
    props: {
      todos,
    },
  };
}
