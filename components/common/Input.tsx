
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        className="block w-full px-4 py-3 sm:py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm placeholder:text-gray-400 transition-all duration-200 ease-in-out hover:border-sic-green focus:outline-none focus:ring-2 focus:ring-sic-lime/70 focus:border-sic-green text-base sm:text-sm min-h-[44px] touch-manipulation"
        {...props}
      />
    </div>
  );
};