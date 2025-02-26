import React from 'react';
import { Button as MuiButton } from '@mui/material';

// button props 타입 정의
interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

// button 컴포넌트 정의
export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'contained',
  color = 'primary',
  disabled = false,
  fullWidth = false,
  size = 'medium'
}) => {
  return (
    <MuiButton
      onClick={onClick}
      variant={variant}
      color={color}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
    >
      {children}
    </MuiButton>
  );
};