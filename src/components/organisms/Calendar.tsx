import React, { useState } from 'react';
import './Calendar.css';

interface Todo {
  id: string;
  text: string;
  date: string;
  priority: boolean;
  completed: boolean;
}

interface CalendarProps {
  todos: Todo[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ todos, selectedDate, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const days = [];

    // 빈 날짜 채우기
    for (let i = 0; i < startingDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="day empty" />
      );
    }

    // 날짜 채우기
    for (let day = 1; day <= totalDays; day++) {
      const currentDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // 진행 중인 일 유무 확인
      const hasTodo = activeTodos.some(todo => todo.date === currentDateStr);

      // 중요한 일 유무 확인 (진행 중 + 완료)
      const hasPriority = activeTodos.some(todo => todo.date === currentDateStr && todo.priority) || 
                         completedTodos.some(todo => todo.date === currentDateStr && todo.priority);

      // 완료된 일 유무 확인
      const hasFinished = completedTodos.some(todo => todo.date === currentDateStr);

      const isSelected = currentDateStr === selectedDate;

      const dayClasses = [
        'day',
        hasTodo ? 'has-todo' : '',
        hasPriority ? 'has-priority' : '',
        hasFinished ? 'has-finished' : '',
        isSelected ? 'selected' : ''
      ].filter(Boolean).join(' ');

      days.push(
        <div
          key={day}
          className={dayClasses}
          onClick={() => onSelectDate(currentDateStr)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const renderTodoDetails = () => {
    if (!selectedDate) return null;

    const activeTodosForDate = activeTodos.filter(todo => todo.date === selectedDate);
    const finishedTodosForDate = completedTodos.filter(todo => todo.date === selectedDate);

    return (
      <div className="todo-details">
        <h3>{selectedDate} 할 일</h3>
        
        {activeTodosForDate.length > 0 && (
          <>
            <h4>진행 중</h4>
            <ul>
              {activeTodosForDate.map(todo => (
                <li key={todo.id}>
                  {todo.text}{todo.priority ? ' ⭐' : ''}
                </li>
              ))}
            </ul>
          </>
        )}

        {finishedTodosForDate.length > 0 && (
          <>
            <h4>완료됨</h4>
            <ul>
              {finishedTodosForDate.map(todo => (
                <li key={todo.id}>
                  {todo.text}{todo.priority ? ' ⭐' : ''}
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTodosForDate.length === 0 && finishedTodosForDate.length === 0 && (
          <p>이 날짜에는 할 일이 없습니다.</p>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="weekdays">
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="days">
        {renderCalendar()}
      </div>
      {renderTodoDetails()}
    </div>
  );
};