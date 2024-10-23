import { GetServerSideProps } from 'next';
import { supabase } from '../supabase'; 

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
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text} - {todo.completed ? 'Completed' : 'Not Completed'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: todos, error } = await supabase
    .from('todos')
    .select('*');

  if (error) {
    console.error('Error fetching todos:', error);
    return { props: { todos: [] } }; 
  }

  return {
    props: {
      todos, 
    },
  };
};