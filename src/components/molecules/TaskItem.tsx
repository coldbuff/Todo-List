import React from 'react';
import { 
  TableRow, 
  TableCell, 
  IconButton, 
  Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// task item props 타입 정의
interface TaskItemProps {
  id: string;
  text: string;
  date: string;
  priority: boolean;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// task item 컴포넌트 정의
export const TaskItem: React.FC<TaskItemProps> = ({ 
  id, 
  text, 
  date,
  priority,
  completed, 
  onToggle, 
  onDelete 
}) => {
  return (
    <TableRow sx={{
      '& > td': {
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
        py: 1
      }
    }}>
      <TableCell
        sx={{
          textDecoration: completed ? 'line-through' : 'none',
          color: completed ? 'text.disabled' : 'text.primary'
        }}
      >
        {text}
      </TableCell>
      <TableCell>{date}</TableCell>
      <TableCell align="center">
        {priority && '⭐'}
      </TableCell>
      <TableCell align="center" padding="checkbox">
        <Checkbox
          checked={completed}
          onChange={() => onToggle(id)}
          size="small"
        />
      </TableCell>
      <TableCell align="center" padding="none">
        <IconButton
          onClick={() => onDelete(id)}
          color="error"
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};