import React from 'react';
import './TodoList.css';

interface Todo {
  id: string;
  text: string;
  date: string;
  priority: boolean;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onTogglePriority: (id: string) => void;
  showCompleted: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggleTodo, 
  onDeleteTodo,
  onTogglePriority,
  showCompleted
}) => {
  return (
    <table className="todo-table">
      <thead>
        <tr>
          <th>할 일</th>
          <th>기한</th>
          <th>중요</th>
          {!showCompleted && <th>완료</th>}
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id} className={todo.completed ? 'completed' : ''}>
            <td className="todo-text">{todo.text}</td>
            <td className="todo-date">{todo.date}</td>
            <td className="todo-priority">
              <button 
                className={`priority-btn ${todo.priority ? 'active' : ''}`}
                onClick={() => onTogglePriority(todo.id)}
              >
                {todo.priority ? '⭐' : '-'}
              </button>
            </td>
            {!showCompleted && (
              <td className="todo-complete">
                <button 
                  className="complete-btn"
                  onClick={() => onToggleTodo(todo.id)}
                >
                  ✔
                </button>
              </td>
            )}
            <td className="todo-delete">
              <button 
                className="delete-btn"
                onClick={() => onDeleteTodo(todo.id)}
              >
                ✖
              </button>
            </td>
          </tr>
        ))}
        {todos.length === 0 && (
          <tr>
            <td 
              colSpan={showCompleted ? 4 : 5} 
              className="empty-message"
            >
              할 일이 없습니다.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
