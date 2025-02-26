import React from 'react';
import { TextField } from '@mui/material';

// 입력 필드 props 타입 정의
interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date';
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
}

// 입력 필드 컴포넌트 정의
export const Input: React.FC<InputProps> = ({ 
  value, 
  onChange, 
  type = 'text',
  placeholder,
  label,
  error,
  disabled = false,
  fullWidth = true,
  variant = 'outlined',
  size = 'medium'
}) => {
  return (
    <TextField
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      label={label}
      error={!!error}
      helperText={error}
      disabled={disabled}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
    />
  );
};