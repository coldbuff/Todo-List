import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Todo {
  id: string;
  text: string;
  date: string;
  priority: boolean;
  completed: boolean;
}

interface ChartProps {
  todos: Todo[];
}

export const Chart: React.FC<ChartProps> = ({ todos }) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const priorityActive = activeTodos.filter(todo => todo.priority).length;
  const normalActive = activeTodos.filter(todo => !todo.priority).length;
  const priorityCompleted = completedTodos.filter(todo => todo.priority).length;
  const normalCompleted = completedTodos.filter(todo => !todo.priority).length;

  const data = {
    labels: ['진행', '완료'],
    datasets: [
      {
        label: '중요 진행',
        data: [priorityActive, priorityCompleted],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '진행',
        data: [normalActive, normalCompleted],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '진행 중 통계',
        font: {
          size: 16
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
    },
  };

  return (
    <div className="chart-wrapper todo-chart">
      <Bar data={data} options={options} />
      <div className="chart-summary todo-summary">
        <div className="summary-item">
          <span className="label">전체:</span>
          <span className="value">{todos.length}</span>
        </div>
        <div className="summary-item">
          <span className="label">진행 중:</span>
          <span className="value">{activeTodos.length}</span>
        </div>
        <div className="summary-item">
          <span className="label">완료:</span>
          <span className="value">{completedTodos.length}</span>
        </div>
        <div className="summary-item">
          <span className="label">중요:</span>
          <span className="value">{priorityActive + priorityCompleted}</span>
        </div>
      </div>
    </div>
  );
};
