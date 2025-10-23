'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'payment' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isLocked?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      isLocked,
      fullWidth,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2 rounded-xl font-medium 
      transition-all duration-200 focus:outline-none focus:ring-2 
      focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 
      disabled:cursor-not-allowed active:scale-95
    `;

    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg',
      secondary: 'bg-muted text-foreground hover:bg-muted/80',
      ghost: 'hover:bg-muted hover:text-foreground',
      outline: 'border-2 border-border hover:bg-muted',
      payment: 'bg-gradient-to-r from-primary via-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl',
      danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-13 px-8 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading || isLocked}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {isLocked && <Lock className="h-4 w-4" />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;