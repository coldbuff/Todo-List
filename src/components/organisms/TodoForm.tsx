import React, { useState, useEffect, useRef } from 'react';
import './TodoForm.css';

interface TodoFormProps {
  onAddTodo: (text: string, date: string, priority: boolean) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        formRef.current?.focus();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text, date, priority);
      setText('');
      setPriority(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && text.trim()) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      ref={formRef}
      className="input-area" 
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력하세요..."
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={priority}
          onChange={() => setPriority(!priority)}
        />
        {priority ? '⭐ 중요' : '중요'}
      </label>
      <button
        type="submit"
        disabled={!text.trim()}
      >
        추가
      </button>
    </form>
  );
};
