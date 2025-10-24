import React from 'react';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "btn btn-primary",
    destructive: "btn btn-destructive",
    outline: "btn btn-outline",
    secondary: "btn btn-secondary",
    ghost: "btn btn-ghost",
    link: "btn btn-link",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "btn-sm",
    lg: "btn-lg",
    icon: "btn-icon",
  };

  return (
    <button
      className={cn(
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };

