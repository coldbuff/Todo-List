import React, { useState, useEffect } from 'react';
import { TodoForm } from '../organisms/TodoForm';
import { TodoList } from '../organisms/TodoList';
import { Calendar } from '../organisms/Calendar';
import { Chart } from '../organisms/Chart';

interface Todo {
  id: string;
  text: string;
  date: string;
  priority: boolean;
  completed: boolean;
}

export const TodoTemplate: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [completedTodos, setCompletedTodos] = useState<Todo[]>(() => {
    const savedCompletedTodos = localStorage.getItem('completedTodos');
    return savedCompletedTodos ? JSON.parse(savedCompletedTodos) : [];
  });
  const [currentDate, setCurrentDate] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'calendar'>('dashboard');

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      weekday: 'long' 
    }));
    setSelectedDate(now.toISOString().split('T')[0]);
  }, []);

  // localStorage에 todos 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // localStorage에 completedTodos 저장
  useEffect(() => {
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [completedTodos]);

  const handleAddTodo = (text: string, date: string, priority: boolean) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      date,
      priority,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      setTodos(todos.filter(t => t.id !== id));
      setCompletedTodos([...completedTodos, { ...todo, completed: true }]);
    } else {
      const completedTodo = completedTodos.find(t => t.id === id);
      if (completedTodo) {
        setCompletedTodos(completedTodos.filter(t => t.id !== id));
        setTodos([...todos, { ...completedTodo, completed: false }]);
      }
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
    setCompletedTodos(completedTodos.filter(t => t.id !== id));
  };

  const handleTogglePriority = (id: string) => {
    const todoToUpdate = todos.find(t => t.id === id);
    if (todoToUpdate) {
      setTodos(todos.map(t => 
        t.id === id ? { ...t, priority: !t.priority } : t
      ));
    } else {
      setCompletedTodos(completedTodos.map(t =>
        t.id === id ? { ...t, priority: !t.priority } : t
      ));
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
          <h1>ToDo-List</h1>
          <div className="header-right">
            <span className="current-date">{currentDate}</span>
          </div>
        </div>
      </header>

      <div className="main-container">
        <aside className={`sidebar ${isSidebarOpen ? '' : 'closed'}`}>
          <nav className="nav-menu">
            <ul>
              <br />
              <li className={currentPage === 'dashboard' ? 'active' : ''}>
                <a href="#" onClick={() => setCurrentPage('dashboard')}>📋 대시보드</a>
              </li>
              <li className={currentPage === 'calendar' ? 'active' : ''}>
                <a href="#" onClick={() => setCurrentPage('calendar')}>🗓️ 캘린더</a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="main-content">
          {currentPage === 'dashboard' ? (
            <section id="dashboard-section" className="content-section">
              <br />
              <div className="container">
                <h2>📝 Creating-List 🗓️</h2>
                <TodoForm onAddTodo={handleAddTodo} />
              </div>

              <br />

              <div className="task-container">
                <div className="container2">
                  <h2>📝 Work-List</h2>
                  <TodoList 
                    todos={todos}
                    onToggleTodo={handleToggleTodo}
                    onDeleteTodo={handleDeleteTodo}
                    onTogglePriority={handleTogglePriority}
                    showCompleted={false}
                  />
                </div>

                <div className="container3">
                  <h2>🗓️ Completed-List</h2>
                  <TodoList 
                    todos={completedTodos}
                    onToggleTodo={handleToggleTodo}
                    onDeleteTodo={handleDeleteTodo}
                    onTogglePriority={handleTogglePriority}
                    showCompleted={true}
                  />
                </div>
              </div>

              <br />

              <div className="container4">
                <h2>📊 List-Statistics</h2>
                <Chart todos={[...todos, ...completedTodos]} />
              </div>
            </section>
          ) : (
            <section id="calendar-section" className="content-section">
              <Calendar 
                todos={[...todos, ...completedTodos]} 
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </section>
          )}
        </main>
      </div>
    </div>
  );
};