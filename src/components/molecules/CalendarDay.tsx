import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

// calendar day props 타입 정의
interface CalendarDayProps {
  isFirstDayOfMonth?: boolean;
  isLastDayOfMonth?: boolean;
  isWeekend?: boolean;
  date: Date;
  tasks: Array<{
    id: string;
    text: string;
    completed: boolean;
  }>;
  isToday?: boolean;
  onClick?: () => void;
}

// calendar day 컴포넌트 정의
export const CalendarDay: React.FC<CalendarDayProps> = ({ 
  date, 
  tasks, 
  isToday = false,
  isFirstDayOfMonth = false,
  isLastDayOfMonth = false,
  isWeekend = false,
  onClick 
}) => {
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <Paper
      onClick={onClick}
      elevation={0}
      sx={{
        p: 1,
        cursor: 'pointer',
        bgcolor: isToday ? 'primary.light' : 'background.paper',
        border: 1,
        borderColor: isToday ? 'primary.main' : 'divider',
        '&:hover': {
          bgcolor: isToday ? 'primary.light' : 'action.hover'
        },
        height: '100%',
        minHeight: '80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        position: 'relative'
      }}
    >
      <Typography 
        variant="body2" 
        fontWeight={isFirstDayOfMonth || isLastDayOfMonth ? 'bold' : 'medium'}
        color={isWeekend ? 'error.main' : 'text.primary'}
        sx={{ textAlign: 'right' }}
      >
        {date.getDate()}
      </Typography>
      {tasks.length > 0 && (
        <Box sx={{ mt: 'auto' }}>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            {tasks.length > 0 && (
              <Box
                sx={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  bgcolor: completedTasks === tasks.length ? 'success.main' : 'warning.main'
                }}
              />
            )}
            {completedTasks}/{tasks.length}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
