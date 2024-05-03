import React, { useState, useRef } from 'react';

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

  // Using refs to focus the text fields dynamically
  const todoRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const addTodo = (dayIndex: number, afterTodoId?: number): void => {
    const newTodo: Todo = { id: Date.now(), text: '', completed: false };
    const updatedWeekTodos = weekTodos.map((dayItem, index) => {
      if (index === dayIndex) {
        const newTodos = [...dayItem.todos];
        if (afterTodoId !== undefined) {
          const todoIndex = dayItem.todos.findIndex(todo => todo.id === afterTodoId);
          newTodos.splice(todoIndex + 1, 0, newTodo);
        } else {
          newTodos.push(newTodo);
        }
        return { ...dayItem, todos: newTodos };
      }
      return dayItem;
    });
    setWeekTodos(updatedWeekTodos);
    setTimeout(() => {
      if (afterTodoId !== undefined) {
        todoRefs.current[newTodo.id]?.focus();
      }
    }, 0);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, dayIndex: number, todoId: number): void => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default Enter key action
      addTodo(dayIndex, todoId); // Add new todo right after the current one
    } else if ((e.key === 'Backspace' || e.key === 'Delete') && e.currentTarget.textContent === '') {
      e.preventDefault(); // Prevent the default delete action
      const updatedWeekTodos = weekTodos.map((item, index) => {
        if (index === dayIndex) {
          const pos = item.todos.findIndex(todo => todo.id === todoId);
          const filteredTodos = item.todos.filter(todo => todo.id !== todoId);
          setTimeout(() => {
            // Focus the previous todo item if it exists
            if (pos > 0 && todoRefs.current[item.todos[pos - 1].id]) {
              const previousTodoElement = todoRefs.current[item.todos[pos - 1].id];
              if (previousTodoElement) {
                previousTodoElement.focus();
                // Move cursor to end of text
                const range = document.createRange();
                const sel = window.getSelection();
                if (sel) { // Check if sel is not null
                  range.selectNodeContents(previousTodoElement);
                  range.collapse(false); // Collapse the range to the end point
                  sel.removeAllRanges(); // Remove all ranges from selection
                  sel.addRange(range); // Add the new range
                }
              }
            }
          }, 0);
          return { ...item, todos: filteredTodos };
        }
        return item;
      });
      setWeekTodos(updatedWeekTodos);
    }
  };

  const toggleTodo = (dayIndex: number, todoId: number): void => {
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
  };

  return (
    <div className="flex flex-wrap justify-center">
      {weekTodos.map((dayItem, index) => (
        <div key={dayItem.day} className="p-4 m-2 border rounded-lg shadow-lg bg-opacity-90 bg-gradient-to-br from-blue-900 to-gray-800 backdrop-blur-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4 min-w-[300px] max-w-[500px]" style={{ zIndex: 1000 }}>
          <h3 className="font-bold text-lg text-blue-200 mb-2">{dayItem.day}</h3>
          <div>
            {dayItem.todos.map((todo, todoIndex) => (
              <div key={todo.id} className="flex items-start my-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index, todo.id)}
                  className="mr-2 h-5 w-5 accent-blue-400 mt-1"
                />
                <div
                  ref={el => { todoRefs.current[todo.id] = el; }}  // Correctly setting ref without returning a value
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => updateTodo(index, todo.id, e.currentTarget.textContent || '')}
                  onKeyDown={(e) => handleKeyDown(e, index, todo.id)}
                  className="flex-1 min-h-[32px] outline-none bg-transparent text-blue-300"
                  style={{ marginLeft: '24px', overflow: 'auto', whiteSpace: 'pre-wrap', border: 'none' }}
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
