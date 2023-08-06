import { type ReactNode } from 'react';
import { Button as ButtonComponent, type SxProps, type Theme } from '@mui/material';

interface ButtonProps {
  size?: 'small' | 'large' | 'medium';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  sx?: SxProps<Theme>;
  backgroundColor?: string;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  onClick,
  children,
  sx,
  backgroundColor = 'var(--blue)',
  type = 'button'
}) => {
  return (
    <ButtonComponent
      variant="contained"
      disableElevation
      sx={{ textTransform: 'none', borderRadius: '8px', backgroundColor, ...sx }}
      onClick={onClick}
      size={size}
      type={type}
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;
