import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
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

  const addTodo = (dayIndex: number): void => {
    const newTodo: Todo = { id: Date.now(), text: 'New Todo...', completed: false };
    const updatedWeekTodos = weekTodos.map((item, index) =>
      index === dayIndex ? { ...item, todos: [...item.todos, newTodo] } : item
    );
    setWeekTodos(updatedWeekTodos);
  };

  const updateTodo = (dayIndex: number, todoId: number, newText: string): void => {
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
  };

  const toggleTodo = (dayIndex: number, todoId: number): void => {
    const updatedWeekTodos = weekTodos.map((item, index) => {
      if (index === dayIndex) {
        const updatedTodos = item.todos.map(todo =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        );
        return { ...item, todos: updatedTodos };
      }
      return item;
    });
    setWeekTodos(updatedWeekTodos);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {weekTodos.map((dayItem, index) => (
        <div key={dayItem.day} 
            className="p-4 m-2 border rounded-lg shadow-lg bg-opacity-90 bg-gradient-to-br from-blue-900 to-gray-800 backdrop-blur-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4 min-w-[300px] max-w-[500px]"
            style={{ zIndex: 1000 }}>
          <h3 className="font-bold text-lg text-blue-200 mb-2">{dayItem.day}</h3>
          <div>
            {dayItem.todos.map(todo => (
              <div key={todo.id} className="flex items-center my-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index, todo.id)}
                  className="mr-2 h-5 w-5 accent-blue-400"
                />
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => updateTodo(index, todo.id, e.target.value)}
                  className="flex-1 p-1 border-b-2 border-gray-700 focus:outline-none focus:border-blue-400 text-blue-300 bg-transparent"
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => addTodo(index)}
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
