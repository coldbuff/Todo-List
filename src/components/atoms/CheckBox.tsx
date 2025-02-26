import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';

// checkbox props 타입 정의
interface CheckBoxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium';
}

// checkbox 컴포넌트 정의
export const CheckBox: React.FC<CheckBoxProps> = ({ 
  checked, 
  onChange, 
  label,
  disabled = false,
  color = 'primary',
  size = 'medium'
}) => {
  const checkbox = (
    <MuiCheckbox
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      color={color}
      size={size}
    />
  );

  return label ? (
    <FormControlLabel
      control={checkbox}
      label={label}
      disabled={disabled}
    />
  ) : checkbox;
};