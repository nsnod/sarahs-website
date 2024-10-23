// pages/page.tsx (or app/page.tsx if you're in the app directory)
import { supabase } from '../supabase'; // Make sure this file is where you initialized Supabase client

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default async function TodoPage() {
  // Fetch data directly in the component using async/await
  const { data: todos, error } = await supabase
    .from('todos') // Table name in Supabase
    .select('*');  // Fetch all columns

  if (error) {
    console.error('Error fetching todos:', error);
    return <div>Error loading todos</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            {todo.text} - {todo.completed ? 'Completed' : 'Not Completed'}
          </li>
        ))}
      </ul>
    </div>
  );
}