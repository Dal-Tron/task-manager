import clsx from 'clsx';

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
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={clsx(
        'w-full border-b-2 text-lg focus:outline-none focus:ring-0',
        {
          'border-gray-300 focus:border-blue-500 bg-white': !disabled,
          'border-gray-200 bg-white !text-gray-700 cursor-not-allowed':
            disabled,
        },
        className
      )}
    />
  );
};
