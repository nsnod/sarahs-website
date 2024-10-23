// pages/page.tsx
import { GetServerSideProps } from 'next';
import { supabase } from '../supabase'; // Ensure your Supabase client is correctly imported

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoPageProps {
  todos: Todo[];
}

export default function TodoPage({ todos }: TodoPageProps) {
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

// Server-side function to fetch todos from Supabase
export const getServerSideProps: GetServerSideProps = async () => {
  const { data: todos, error } = await supabase
    .from('todos') // Table name in Supabase
    .select('*');  // Fetch all columns

  if (error) {
    console.error('Error fetching todos:', error);
    return { props: { todos: [] } }; // In case of error, return an empty array
  }

  return {
    props: {
      todos, // Pass the fetched todos to the component
    },
  };
};