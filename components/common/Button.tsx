import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'subtle';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const baseClasses = "px-4 sm:px-6 py-3 sm:py-2.5 rounded-lg font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 min-h-[44px] touch-manipulation";
  
  const variantClasses = {
    primary: "bg-sic-green text-white shadow-md hover:bg-sic-dark-green hover:shadow-lg hover:-translate-y-px focus:ring-sic-green",
    secondary: "bg-sic-lime text-sic-dark-green font-bold shadow-md hover:brightness-95 hover:shadow-lg hover:-translate-y-px focus:ring-sic-lime",
    ghost: "bg-transparent text-sic-green hover:bg-sic-green/10 focus:ring-sic-green",
    subtle: "bg-sic-lime/20 text-sic-green hover:bg-sic-lime/30 focus:ring-sic-green",
  };
  
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};