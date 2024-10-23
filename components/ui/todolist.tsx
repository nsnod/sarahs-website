import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../supabase'; 

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  day: string;
}

interface DayTodos {
  day: string;
  todos: Todo[];
}

const daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ToDoList: React.FC = () => {
  const [weekTodos, setWeekTodos] = useState<DayTodos[]>(() =>
    daysOfWeek.map(day => ({ day, todos: [] }))
  );

  const todoRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*');

      if (error) {
        console.error('Error fetching todos:', error);
      } else {
        const todosByDay = daysOfWeek.map(day => ({
          day,
          todos: data.filter((todo: Todo) => todo.day === day),
        }));
        setWeekTodos(todosByDay);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (dayIndex: number): Promise<void> => {
    try {
      const response = await fetch('/api/add-todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: '', day: daysOfWeek[dayIndex] }),
      });
  
      const insertedTodo = await response.json();
  
      if (response.ok) {
        const newTodo: Todo = { id: insertedTodo.id, text: '', completed: false, day: daysOfWeek[dayIndex] };
  
        const updatedWeekTodos = weekTodos.map((dayItem, index) => {
          if (index === dayIndex) {
            const newTodos = [...dayItem.todos, newTodo];
            return { ...dayItem, todos: newTodos };
          }
          return dayItem;
        });
        setWeekTodos(updatedWeekTodos);
  
        setTimeout(() => {
          todoRefs.current[newTodo.id]?.focus();
        }, 0);
      } else {
        console.error('Error inserting todo:', insertedTodo);
      }
    } catch (error) {
      console.error('Error inserting new todo:', error);
    }
  };

  const updateTodo = async (dayIndex: number, todoId: number, newText: string): Promise<void> => {
    const updatedWeekTodos = weekTodos.map((item, index) => {
      if (index === dayIndex) {
        const updatedTodos = item.todos.map(todo =>
          todo.id === todoId ? { ...todo, text: newText } : todo
        );
        return { ...item, todos: updatedTodos };
      }
      return item;
    });
    setWeekTodos(updatedWeekTodos);
  
    try {
      const response = await fetch('/api/update-todo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: todoId, text: newText }),
      });
  
      const updatedTodo = await response.json();
  
      if (!response.ok) {
        console.error('Error updating todo:', updatedTodo);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>, dayIndex: number, todoId: number): Promise<void> => {
    if ((e.key === 'Backspace' || e.key === 'Delete') && e.currentTarget.textContent === '') {
      e.preventDefault();
      const updatedWeekTodos = weekTodos.map((item, index) => {
        if (index === dayIndex) {
          const filteredTodos = item.todos.filter(todo => todo.id !== todoId);
          return { ...item, todos: filteredTodos };
        }
        return item;
      });
      setWeekTodos(updatedWeekTodos);
  
      try {
        const response = await fetch('/api/delete-todo', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: todoId }),
        });
  
        if (!response.ok) {
          const result = await response.json();
          console.error('Error deleting todo:', result.error);
        }
      } catch (error) {
        console.error('Delete request failed:', error);
      }
    }
  };

  const toggleTodo = async (dayIndex: number, todoId: number): Promise<void> => {
    const updatedWeekTodos = weekTodos.map((dayItem, index) => {
      if (index === dayIndex) {
        const updatedTodos = dayItem.todos.map(todo => {
          if (todo.id === todoId) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        });
        return { ...dayItem, todos: updatedTodos };
      }
      return dayItem;
    });
    setWeekTodos(updatedWeekTodos);
  
    const currentTodo = weekTodos[dayIndex].todos.find(todo => todo.id === todoId);
    if (!currentTodo) return;
  
    try {
      const response = await fetch('/api/update-todo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: todoId,
          completed: !currentTodo.completed,
        }),
      });
  
      const updatedTodo = await response.json();
  
      if (!response.ok) {
        console.error('Error toggling todo completion:', updatedTodo);
      }
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {weekTodos.map((dayItem, dayIndex) => (
        <div key={dayItem.day} className="p-4 m-6 border rounded-lg shadow-lg bg-opacity-90 bg-gradient-to-br from-blue-900 to-gray-800 backdrop-blur-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 min-w-[300px] max-w-[500px]" style={{ zIndex: 1000, minHeight: '150px' }}>
          <h3 className="font-bold text-lg text-blue-200 mb-2">{dayItem.day}</h3>
          <div>
            {dayItem.todos.map((todo, todoIndex) => (
              <div key={todo.id} className="flex items-center my-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(dayIndex, todo.id)}
                  className="mr-2 h-5 w-5 accent-blue-400 mt-1"
                />
                <div
                  ref={el => { todoRefs.current[todo.id] = el; }}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => updateTodo(dayIndex, todo.id, e.currentTarget.textContent || '')}
                  onKeyDown={(e) => handleKeyDown(e, dayIndex, todo.id)}
                  className="editable-div"
                >
                  {todo.text}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => addTodo(dayIndex)}
            className="mt-3 bg-blue-800 hover:bg-blue-700 text-blue-200 font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            style={{ zIndex: 1000 }}
          >
            Add New Todo
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToDoList;