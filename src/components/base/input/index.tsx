import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = 'Enter text',
  type = 'text',
  className = '',
  disabled = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  return (
    <div className="relative">
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          'w-full border-b-2 text-lg focus:outline-none focus:ring-0 pr-10', // Added pr-10 for padding right
          {
            'border-gray-300 focus:border-blue-500 bg-white': !disabled,
            'border-gray-200 bg-white !text-gray-700 cursor-not-allowed':
              disabled,
          },
          className
        )}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={handleToggleVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
        >
          {isPasswordVisible ? (
            <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <EyeIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
};
