
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, id, ...props }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className="h-5 w-5 rounded border-gray-300 text-sic-green focus:ring-sic-green transition duration-150"
        {...props}
      />
      <label htmlFor={id} className="ml-3 text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};